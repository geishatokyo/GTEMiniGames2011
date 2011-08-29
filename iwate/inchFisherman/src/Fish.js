var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Fish = cocos.nodes.Node.extend({
	elapsedTime:null,
	defaultPosition:null,
    label:null,
    funclist:[],
    status:null,
    velocity:{x:10,y:20},
    //HP:null,length:null,weight:null,size:null,atack:null,defence:null,
    hit:0,
	init: function() {
        Fish.superclass.init.call(this);
        var initData = constant.waveInitDatas(1);
        var img = cocos.nodes.MenuItemImage.create({normalImage: "/resources/fish.png",
                                                    selectedImage:"/resources/fish.png",
                                                   callback: util.callback(this, 'clickCallback')});
        img.set('rotation',initData.startAngle);
                                               
        var menu = cocos.nodes.Menu.create({items: [img]});
        menu.set('position', ccp(0, 0));
        this.addChild({child: menu, z: -1});
        this.set('contentSize',img.get('contentSize'));

        var action, actionBack, seq;
        action = actions.RotateBy.create({duration: 1.25, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        img.runAction(actions.RepeatForever.create(seq));
        
        this.addCallback(util.callback(this,'hitCallback'));
        
        this.scheduleUpdate();
        this.set('elapsedTime',initData.position*5);
	},
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            et  = util.copy(this.get('elapsedTime')),
        	dPos = util.copy(this.get('defaultPosition')),
            v = util.copy(this.get('velocity'));
        
        v.y -= 9.8*dt;
        pos.x += v.x
        pos.y += v.y;
        
        var s = cocos.Director.get('sharedDirector').get('winSize');
        if(pos.x>s.width){
                pos.x = 2*s.width-pos.x;
                v.x = -v.x;
            }
        else if(pos.x<0){
                pos.x = -pos.x;
                v.x = -v.x;
            }
        else if(pos.y<0){
                pos.x = -pos.x;
                v.x = -v.x;
            }
        
        wave.setPosition( new geo.Point(s.width/6*p[i][j], s.height/4*(i+1)));
 
        this.set('position', pos);
        this.set('velocity',v);
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+50);
    	this.set('position',Pos);
    	this.set('defaultPosition',Pos);
    },
    clickCallback: function(){
        var list = util.copy(this.get('funclist'));
        for(var i=0;i<list.length;i++){
            list[i]();
        }
    },
    addCallback: function(func){
        var list = util.copy(this.get('funclist'));
        list.push(func);
        this.set('funclist',list);
    },
    hitCallback: function(){
        var hit = util.copy(this.get('hit'));
        hit++;
        this.set('hit',hit);
    }
});

exports.Fish = Fish;