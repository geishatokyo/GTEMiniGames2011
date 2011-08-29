// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry');
var Wave = require('Wave').Wave;
var util = require('util');
var Fish = require('Fish').Fish;
var Dive = require('Dive').Dive;
var Player = require('Player').Player;

var p = [[1,3,5],[2,4],[1,3,5]];

// Create a new layer
var Breakout = cocos.nodes.Layer.extend({
    label:null,
    wave: null,
    hit:null,
    player:null,
    hpBar:null,
    boatBar:null,
    init: function() {
        // You must always call the super class version of init
        Breakout.superclass.init.call(this);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        for(var i=0;i<3;i++){
            for(var j=0;j<3;j++){
                var wave = Wave.create((j+i)%2);
                wave.setPosition( new geo.Point(s.width/6*p[i][j], s.height/4*(i+1)));
                this.addChild({child: wave,z:2*(i+1)});
            }
        }

        var fish = Fish.create();
        fish.addCallback(util.callback(this,'hitCallback'));
		fish.setPosition( new geo.Point(s.width/4, s.height/4));
		this.addChild({child: fish});
		
        var player = Player.create();
        player.setPosition(new geo.Point(s.width/2, s.height-70));
        this.addChild({child: player,z:8});
        this.set('player',player);
        
        
        var left = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveLeft')});
        var right = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveRight')});
        left.set('position',new geo.Point(0, s.height-50)); 
        right.set('position',new geo.Point(s.width/2, s.height-50));                                       
        var menu = cocos.nodes.Menu.create({items: [left,right]});
        menu.set('position', new geo.Point(s.width/4,0));
        this.addChild({child: menu, z: 9});
        
        
        var sprite = cocos.nodes.Sprite.create({ file: '/resources/bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:10});
        sprite = cocos.nodes.Sprite.create({ file: '/resources/bar_back.png'});
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:8});
        var l = cocos.nodes.Label.create({string: '10',
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(32, 161));
        this.addChild({child: l, z: 11});
        
        
        sprite = cocos.nodes.Sprite.create({ file: '/resources/hp_bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,1));
        sprite.set('position',new geo.Point(0,60));
        this.addChild({child: sprite,z:9});
        this.set('hpBar',sprite);
        
        sprite = cocos.nodes.Sprite.create({ file: '/resources/boat_bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,1));
        sprite.set('position',new geo.Point(0,107));
        this.addChild({child: sprite,z:9});
        this.set('boatBar',sprite);
        
        this.scheduleUpdate();
//		this.set('isMouseEnabled',true);	
    },
    update: function(){
        var p = this.get('player');
        var sts = p.get('status');
        var b = this.get('hpBar');
        b.set('scaleY',sts.hp / sts.HP); 
    },
    moveLeft: function(){
        var player = this.get('player');
        var pos = util.copy(player.get('defaultPosition'));
        if(pos.x>100)
        player.set('defaultPosition',new geo.Point(pos.x - 50, pos.y));
    },
    moveRight: function(){
        var player = this.get('player');
        var pos = util.copy(player.get('defaultPosition'));
        if(pos.x<430)
        player.set('defaultPosition',new geo.Point(pos.x + 50, pos.y));
    },
	mouseUp: function (event) {
        
        if(event.button == 0){
            var location = cocos.Director.get('sharedDirector').convertEventToCanvas(event);
            var wave = Wave.create(1);
            wave.setPosition(location);
            this.addChild({child:wave});
        }
        
        var s = cocos.Director.get('sharedDirector').get('winSize');
        this.removeChild(this.get('label'));
        var l = cocos.nodes.Label.create({string: event.button.toString (10),
                                        fontName: "Thonburi",
                                        fontSize: 64,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2, s.height - 80));
        this.addChild({child: l, z: 1});
        this.set('label',l);
		
        
        return true;
    },
    hitCallback: function(pos){
        var s = cocos.Director.get('sharedDirector').get('winSize');
        try{
            this.removeChild({child:this.get('hit'),cleanup:true});
        }catch(e){}
        var l = cocos.nodes.Label.create({string: 'HIT!',
                                        fontName: "Thonburi",
                                        fontSize: 64,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 4*3, s.height /4));
        this.set('hit',l);
        this.addChild({child: l, z: 8});
        window.setTimeout(
            util.callback(this, 'removeHitLabel'),500
        );
		var dive = Dive.create();
		this.addChild({child:dive,z:8});
		dive.setPosition(new geo.Point(s.width / 4*3, s.height /2));
    },
    removeHitLabel: function(){
        this.removeChild({child:this.get('hit'),cleanup:true});
    }
});

exports.main = function() {
    // Initialise application

    // Get director
    var director = cocos.Director.get('sharedDirector');

    // Attach director to our <div> element
    director.attachInView(document.getElementById('inch_fisherman_app'));
	director.set("backgroundColor","00ffff")
    // Create a scene
    var scene = cocos.nodes.Scene.create();
 //   director.set('displayFPS',true);

    // Add our layer to the scene
    scene.addChild({child: Breakout.create()});

    // Run the scene
    director.runWithScene(scene);
};
