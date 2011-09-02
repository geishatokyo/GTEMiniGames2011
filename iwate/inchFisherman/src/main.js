// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry');
var Wave = require('Wave').Wave;
var util = require('util');
var Fish = require('Fish').Fish;
var Dive = require('Dive').Dive;
var Player = require('Player').Player;
var constant = require('Constant').Constant;
var ScrollView = require('ScrollView');

var p = [[1,3,5],[2,4],[1,3,5]];

// Create a new layer
var Breakout = cocos.nodes.Layer.extend({
    label:null,
    wave: null,
    hit:null,
    player:null,
    hpBar:null,
    boatBar:null,
    boatSize:0,
    harpoon:null,
    harpoonAmount:null,
    charBoard:null,
    popup:null,
    init: function(player) {
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

        
		
        player.setPosition(new geo.Point(s.width/2, s.height-70));
        this.addChild({child: player,z:8});
        this.set('player',player);
        
        
        var left = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveLeft')});
        var right = cocos.nodes.MenuItemImage.create({normalImage: "/resources/button.png",
                                                    selectedImage:"/resources/button.png",
                                                    callback: util.callback(this, 'moveRight')});
        left.set('position',new geo.Point(50, s.height-50)); 
        right.set('position',new geo.Point(s.width/2, s.height-50));                                       
        var menu = cocos.nodes.Menu.create({items: [left,right]});
        menu.set('position', new geo.Point(s.width/4,0));
        this.addChild({child: menu, z: 8});
        
        
        var sprite = cocos.nodes.Sprite.create({ file: '/resources/bar.png' });
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:10});
        sprite = cocos.nodes.Sprite.create({ file: '/resources/bar_back.png'});
        sprite.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: sprite,z:8});
        var l = cocos.nodes.Label.create({string: player.get('items').harpoon.amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(32, 161));
        this.addChild({child: l, z: 11});
        var l = cocos.nodes.Label.create({string: player.get('items').harpoon.amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(20, 148));
        this.addChild({child: l, z: 11});
        this.set('harpoon',l);
        this.set('harpoonAmount',player.get('items').harpoon.amount);
        
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
		this.set('isMouseEnabled',true);
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        button.set('anchorPoint',new geo.Point(0,1));
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(0,s.height-10));
        this.addChild({child: menu, z: 9});
        
        var cb = [];
        var sprite = cocos.nodes.Sprite.create({ file: '/resources/char_back.png' });
        sprite.set('position', new geo.Point(s.width/2+25,s.height/2+80));
        sprite.set('scaleX',1.5);sprite.set('scaleY',1.5);
        this.addChild({child: sprite,z:20});
        cb.push(sprite);
        var size = sprite.get('contentSize');
        var l = cocos.nodes.Label.create({string: player.get('items').chum.name + 'をまいた...',
                                        fontName: "Thonburi",
                                        fontSize: 12,
                                       fontColor: '#502d16'});
        l.set('position', new geo.Point(size.width/2,size.height/2));
        sprite.addChild({child: l, z: 0});
        this.set('charBoard',cb);
        window.setTimeout(
            util.callback(this, 'removeCharBoard'),1500
        );
        window.setTimeout(
            util.callback(this, 'createFishs'),3000
        );
    },
    createFishs: function(){
        var power = this.get('player').get('items').chum.power;
        for(var i=0;i<2+power;i++){
            this.createFish(i);
        }
    },
    createFish: function(i){
        var attribute = this.get('player').get('items').chum.attribute;
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var type = Math.floor( Math.random() * 12 );
        switch(attribute){
            case 0:
                if(type>5) type = Math.floor( Math.random() * 5 );;
                break;
            case 1:
                if(type<5) type = 5+Math.floor( Math.random() * 7 );;
                break;
            default:
                break;
        }
        var fish = Fish.create(type);
        fish.addCallback(util.callback(this,'hitCallback'));
        fish.setPosition( new geo.Point(s.width*Math.floor(Math.random()*100), s.height/4*((i%3)+1)));
        this.addChild({child: fish,z:2*i+1});
    },
    update: function(){
        var p = this.get('player');
        var sts = p.get('status');
        var b = this.get('hpBar');
        b.set('scaleY',sts.hp / sts.HP);
        var s = this.get('boatSize');
        var S = p.get('items').boat.size;
        var b = this.get('boatBar');
        b.set('scaleY',s / S);
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
            var h = this.get('harpoonAmount');
            h--;
            if(h<0)h=0
            else{
                this.removeChild({child:this.get('harpoon'),cleanup:true});
                var l = cocos.nodes.Label.create({string: h.toString(),
                                                fontName: "Thonburi",
                                                fontSize: 12,
                                               fontColor: '#502d16'});
                l.set('position', new geo.Point(20, 148));
                this.addChild({child: l, z: 11});
                this.set('harpoon',l);
                this.set('harpoonAmount',h);
                var s = cocos.Director.get('sharedDirector').get('winSize');
                try{
                    this.removeChild({child:this.get('hit'),cleanup:true});
                }catch(e){}
                var l = cocos.nodes.Label.create({string: 'MISS!',
                                                fontName: "Thonburi",
                                                fontSize: 64,
                                               fontColor: '#FF0000'});
                l.set('position', new geo.Point(s.width-80, s.height-50));
                this.set('hit',l);
                this.addChild({child: l, z: 8});
                window.setTimeout(
                    util.callback(this, 'removeHitLabel'),500
                );
            }
        }
                
        return true;
    },
    hitCallback: function(fish){
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var h = this.get('harpoonAmount');
        var sts = this.get('player').get('status');
        h--;
        if(h<0) {
            h=0
        }else{
            var fsts = util.copy(fish.get('status'));
            console.log('name:'+fsts.name+' HP:'+fsts.hp +' Length:'+fsts.length);
            fsts.hp -= sts.attack+this.get('player').get('items').harpoon.attack;
            fish.set('status',fsts);
            if(fsts.hp<=0){
                var cb = [];
                try{
                    var cb = this.get('charBoard');
                    for(i=0;i<cb.length;i++){
                        this.removeChild({child:cb[i],cleanup:true});
                    }
                }catch(e){}
                var sprite = cocos.nodes.Sprite.create({ file: '/resources/char_back.png' });
                sprite.set('position', new geo.Point(s.width/2+25,s.height/2+80));
                sprite.set('scaleX',1.5);sprite.set('scaleY',1.5);
                this.addChild({child: sprite,z:20});
                cb.push(sprite);
                var size = sprite.get('contentSize');
                var bs = this.get('boatSize');
                bs += fsts.size;
                var time = 1000;
                if(bs>this.get('player').get('items').boat.size){
                    bs-=fsts.size;
                    var l = cocos.nodes.Label.create({string: '船がいっぱいです！',
                                                    fontName: "Thonburi",
                                                    fontSize: 12,
                                                   fontColor: '#502d16'});
                    l.set('position', new geo.Point(size.width/2,size.height/2));
                    sprite.addChild({child: l, z: 0});
                }else{
                    var l = cocos.nodes.Label.create({string: fsts.name + '、獲ったど～！',
                                                    fontName: "Thonburi",
                                                    fontSize: 12,
                                                   fontColor: '#502d16'});
                    l.set('position', new geo.Point(size.width/2,size.height/2));
                    sprite.addChild({child: l, z: 0});
                    var dict = this.get('player').dict;
                    if(dict[fsts.name] == undefined||dict[fsts.name].length<fsts.length){
                        l.set('position', new geo.Point(size.width/2,size.height/2-10));
                        var l = cocos.nodes.Label.create({string: fsts.name+' : '+ Math.round(fsts.length*10)/10 + '、最高記録です',
                                                        fontName: "Thonburi",
                                                        fontSize: 12,
                                                       fontColor: '#502d16'});
                        l.set('position', new geo.Point(size.width/2,size.height/2+10));
                        sprite.addChild({child: l, z: 0});
                        dict[fsts.name] = {id:fsts.id,length:fsts.length};
                        time = 1500;
                    }
                
                }
                sts.exp += fsts.exp;
                if(sts.exp >= sts.EXP){
                    sts.exp -= sts.EXP;
                    sts.EXP += Math.floor(sts.EXP/10);
                    sts.level++;
                    var dAttack = Math.floor(Math.random()*sts.level)+1;
                    var dDefence = Math.floor(Math.random()*sts.level)+1;
                    sts.attack += dAttack;
                    sts.defence += dDefence;
                    
                    var popupLevelup = [];
                    var l = cocos.nodes.Label.create({string: 'LEVEL UP!',
                                                    fontName: "Thonburi",
                                                    fontSize: 64,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,50));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    var l = cocos.nodes.Label.create({string: 'ATTACK +'+dAttack,
                                                    fontName: "Thonburi",
                                                    fontSize: 32,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,130));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    var l = cocos.nodes.Label.create({string: 'ATTACK +'+dDefence,
                                                    fontName: "Thonburi",
                                                    fontSize: 32,
                                                   fontColor: '#FF0000'});
                    l.set('position', new geo.Point(s.width/2+50,170));
                    this.addChild({child: l, z: 20});
                    popupLevelup.push(l);
                    this.set('popup',popupLevelup);
                    window.setTimeout(
                        util.callback(this, 'removePopUp'),2000
                    );
                }
            
                this.set('charBoard',cb);
                window.setTimeout(
                    util.callback(this, 'removeCharBoard'),time
                );
                var hit = fish.get('hit');
                h += hit;
                this.createFish((fish.get('zOrder')-1)/2);
                this.removeChild({child:fish,cleanup:true});
                this.set('boatSize',bs);
            }
            this.removeChild({child:this.get('harpoon'),cleanup:true});
            var l = cocos.nodes.Label.create({string: h.toString(),
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
            l.set('position', new geo.Point(20, 148));
            this.addChild({child: l, z: 11});
            this.set('harpoon',l);
            this.set('harpoonAmount',h);
            
            try{
                this.removeChild({child:this.get('hit'),cleanup:true});
            }catch(e){}
            var l = cocos.nodes.Label.create({string: 'HIT!',
                                            fontName: "Thonburi",
                                            fontSize: 64,
                                           fontColor: '#FF0000'});
            l.set('position', new geo.Point(s.width-80, s.height-50));
            this.set('hit',l);
            this.addChild({child: l, z: 8});
            window.setTimeout(
                util.callback(this, 'removeHitLabel'),500
            );
            /*var dive = Dive.create();
            this.addChild({child:dive,z:8});
            dive.setPosition(new geo.Point(s.width / 4*3, s.height /2));*/
        }
    },
    removePopUp: function(){
        var pop = this.get('popup');
        for(i=0;i<pop.length;i++){
            this.removeChild({child:pop[i],cleanup:true});
        }
    },
    removeHitLabel: function(){
        this.removeChild({child:this.get('hit'),cleanup:true});
    },
    removeCharBoard: function(){
        var cb = this.get('charBoard');
        for(i=0;i<cb.length;i++){
            this.removeChild({child:cb[i],cleanup:true});
        }
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');

        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Harbor.create(this.get('player'))});

        director.replaceScene(scene);
    }
});
var Harbor = cocos.nodes.Layer.extend({
    player:null,
    itemBox:null,
    boatSize:null,
    harpoonAttack:null,
    chumAttribute:null,
    chumPower:null,
    boat:null,
    harpoon:null,
    chum:null,
    itemName:null,
    itemInfo:null,
    HP:null,
    elapsedTime:0,
    init: function(player){
        Harbor.superclass.init.call(this);
        this.set('player',player);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var l = cocos.nodes.Label.create({string: '港',
                                        fontName: "Thonburi",
                                        fontSize: 64,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 + 50, 30));
        this.addChild({child: l, z: 1});
        
        var l = cocos.nodes.Label.create({string: '船',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 - 70, 84));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: '銛',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2+50, 84));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'コマセ',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(s.width / 2 + 170, 84));
        this.addChild({child: l, z: 1});
        
        var boat = constant.boatDatas(0);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+boat.file,
                                                    selectedImage:'/resources/'+boat.file,
                                                    callback: util.callback(this, 'boatCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('boat',menu);
        var harpoon = constant.harpoonDatas(0);
        var item = cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+harpoon.file,
                                                    selectedImage:'/resources/'+harpoon.file,
                                                    callback: util.callback(this, 'harpoonCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+50,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('harpoon',menu);
        var chum = constant.chumDatas(0);
        var item = cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+chum.file,
                                                    selectedImage:'/resources/'+chum.file,
                                                    callback: util.callback(this, 'chumCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+170,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('chum',menu);
        
        
        
        var items = player.get('items');
        items.boat = boat;
        items.harpoon = harpoon;
        items.chum = chum;
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(50,s.height-50));
        this.addChild({child: menu, z: 0});
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'dictButtonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(s.width-50,s.height-50));
        this.addChild({child: menu, z: 0});

        var sts = player.get('status');
        var l = cocos.nodes.Label.create({string: 'Player',
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 20));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'LEVEL:'+sts.level.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 60));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'HP:'+sts.hp.toString()+'/'+sts.HP.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 80));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('HP',l);
        var l = cocos.nodes.Label.create({string: 'ATTACK:'+sts.attack.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 100));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        var l = cocos.nodes.Label.create({string: 'DEFENCE:'+sts.defence.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 120));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        
        
         var l = cocos.nodes.Label.create({string: boat.name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var l = cocos.nodes.Label.create({string: 'SIZE:'+boat.size.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        
        var itemInfos = [l];
        this.set('itemInfo',itemInfos);
        
        this.boatCallback();
        this.scheduleUpdate();
    },
    boatCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var boats = constant.boatArray();
        var items = [];
        for(i=0;i<boats.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+boats[i].file,
                                                    selectedImage:'/resources/'+boats[i].file,
                                                    callback: util.callback(this, 'bItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
        
    },
    harpoonCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var harpoons = constant.harpoonArray();
        var items = [];
        for(i=0;i<harpoons.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+harpoons[i].file,
                                                    selectedImage:'/resources/'+harpoons[i].file,
                                                    callback: util.callback(this, 'hItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
    },
    chumCallback: function(){
        try{
            this.removeChild(this.get('itemBox'));
        }catch(e){}
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var chums = constant.chumArray();
        var items = [];
        for(i=0;i<chums.length;i++){
            var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+chums[i].file,
                                                    selectedImage:'/resources/'+chums[i].file,
                                                    callback: util.callback(this, 'cItemCallback')})
            item.set('position',new geo.Point(i*100,0));
            item.set('scaleX',0.5);
            item.set('scaleY',0.5);
            items.push(item);
        }
        var menu = cocos.nodes.Menu.create({items: items});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2+80));
        menu.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: menu, z: 9});
        this.set('itemBox',menu);
    },
    bItemCallback: function(own){
        var boat = this.get('boat');
        var s = cocos.Director.get('sharedDirector').get('winSize');
        try{
            this.removeChild(boat);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.boatDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'SIZE:'+constant.boatDatas(i).size.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.boat = constant.boatDatas(i);
        
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.boat.file,
                                                    selectedImage:'/resources/'+items.boat.file,
                                                    callback: util.callback(this, 'boatCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2-70,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('boat',menu);
        
    },
    hItemCallback: function(own){
        var harpoon = this.get('harpoon');
        var s = cocos.Director.get('sharedDirector').get('winSize');
                
        try{
            this.removeChild(harpoon);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.harpoonDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'ATTACK:'+constant.harpoonDatas(i).attack.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        var l = cocos.nodes.Label.create({string: 'AMOUNT:'+constant.harpoonDatas(i).amount.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 220));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.harpoon = constant.harpoonDatas(i);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.harpoon.file,
                                                    selectedImage:'/resources/'+items.harpoon.file,
                                                    callback: util.callback(this, 'harpoonCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+50,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('harpoon',menu);
    },
    cItemCallback: function(own){
        var chum = this.get('chum');
        var s = cocos.Director.get('sharedDirector').get('winSize');
        try{
            this.removeChild(chum);
            this.removeChild(this.get('itemName'));
            var itemInfo = this.get('itemInfo');
            for(i=0;i<itemInfo.length;i++)
            this.removeChild(itemInfo[i]);
        }catch(e){}
        var items = (this.get('itemBox')).get('children');
        for(i=0;i<items.length;i++){
            if(items[i]==own) break;
        }
        var l = cocos.nodes.Label.create({string: constant.chumDatas(i).name,
                                        fontName: "Thonburi",
                                        fontSize: 32,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 160));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        this.set('itemName',l);
        var itemInfos = [];
        var l = cocos.nodes.Label.create({string: 'POWER:'+constant.chumDatas(i).power.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 200));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        var l = cocos.nodes.Label.create({string: 'ATTRIBUTE:'+constant.chumDatas(i).attribute.toString(),
                                        fontName: "Thonburi",
                                        fontSize: 16,
                                       fontColor: '#000000'});
        l.set('position', new geo.Point(10, 220));
        l.set('anchorPoint', new geo.Point(0,0));
        this.addChild({child: l, z: 1});
        itemInfos.push(l);
        this.set('itemInfo',itemInfos);
        var items = this.get('player').get('items');
        items.chum = constant.chumDatas(i);
        var item= cocos.nodes.MenuItemImage.create({normalImage: '/resources/'+items.chum.file,
                                                    selectedImage:'/resources/'+items.chum.file,
                                                    callback: util.callback(this, 'chumCallback')})
        var menu = cocos.nodes.Menu.create({items: [item]});
        menu.set('position', new geo.Point(s.width/2+170,s.height/2));
        this.addChild({child: menu, z: 0});
        this.set('chum',menu);
    },
    update: function(dt){
        var t = this.get('elapsedTime');
        t += dt;
        
        if(t>5*60){
            t=0;
            var sts = this.get('player').get('status');
            sts.hp++;
            if(sts.hp>sts.HP) sts.hp = sts.HP;
            else{
                this.removeChild(this.get('HP'));
                var l = cocos.nodes.Label.create({string: 'HP:'+sts.hp.toString()+'/'+sts.HP.toString(),
                                                fontName: "Thonburi",
                                                fontSize: 16,
                                               fontColor: '#000000'});
                l.set('position', new geo.Point(10, 80));
                l.set('anchorPoint', new geo.Point(0,0));
                this.addChild({child: l, z: 1});
                this.set('HP',l);
            }
        }
        this.set('elapsedTime',t);
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');
        var p = this.get('player');
        var sts = p.get('status');
        if(sts.hp>10){
            sts.hp-=10;
            p.setup();
            var scene = cocos.nodes.Scene.create();
            scene.addChild({child: Breakout.create(p)});
            director.replaceScene(scene);
        }
    },
    dictButtonCallback: function(){
        var director = cocos.Director.get('sharedDirector');
        var p = this.get('player');
        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Dict.create(p)});
        director.replaceScene(scene);
    }
    
});

var Dict = cocos.nodes.Layer.extend({
    player:null,
    init: function(player){
        Dict.superclass.init.call(this);
        this.set('player',player);
        var s = cocos.Director.get('sharedDirector').get('winSize');
        var dict = player.get('dict');
        var datas = [];
        var fish;
        for(var i in dict){
            fish = constant.fishStatusDatas(dict[i].id);
            datas.push({file:"/resources/fishs/"+fish.file+".png",name:fish.name,recode:Math.floor(dict[i].length*10)/10});
        }
        
        var view = ScrollView.ScrollView.create(datas);
        view.set('contentSize',{width:400,height:300});
        view.set('position',new geo.Point(s.width/2,s.height/2));
        view.set('anchorPoint',new geo.Point(0.5,0.5));
        view.set('isRelativeAnchorPoint', true);
        this.addChild(view);
        
        var button = cocos.nodes.MenuItemImage.create({normalImage: '/resources/next.png',
                                                    selectedImage:'/resources/next.png',
                                                    callback: util.callback(this, 'buttonCallback')});
        button.set('scaleX',0.5);button.set('scaleY',0.5);
        var menu = cocos.nodes.Menu.create({items: [button]});
        menu.set('position', new geo.Point(s.width-50,s.height-50));
        this.addChild({child: menu, z: 0});
    },
    buttonCallback: function(){
        var director = cocos.Director.get('sharedDirector');

        var scene = cocos.nodes.Scene.create();
        scene.addChild({child: Harbor.create(this.get('player'))});

        director.replaceScene(scene);
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
    var player = Player.create();
    var scene = cocos.nodes.Scene.create();
 //   director.set('displayFPS',true);

    // Add our layer to the scene
    //scene.addChild({child: Breakout.create()});
    scene.addChild({child: Harbor.create(player)});
    //scene.addChild({child: Dict.create(player)});

    // Run the scene
    director.runWithScene(scene);
};
