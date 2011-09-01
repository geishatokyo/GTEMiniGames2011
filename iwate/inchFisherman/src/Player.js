var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Player = cocos.nodes.Node.extend({
	elapsedTime:null,
	defaultPosition:null,
    status:null,
    items:{boat:null,harpoon:null,chum:null},
    dict:{},
	init: function() {
        this.setup();
        this.set('status',{hp:100,HP:100,level:1,attack:1,defence:1});
	},
    setup: function(){
        Player.superclass.init.call(this);
        var initData = constant.waveInitDatas(0);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/boat.png',
                        rect: new geom.Rect(0, 0, 100, 100)
                    });
        sprite.set('anchorPoint', new geom.Point(0.5, 0.25));
        sprite.set('rotation',initData.startAngle);
        this.addChild({child: sprite});
        this.set('contentSize',sprite.get('contentSize'));

        var action, actionBack, seq;
        action = actions.RotateBy.create({duration: 2.5, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        sprite.runAction(actions.RepeatForever.create(seq));
        
        this.scheduleUpdate();
        this.set('elapsedTime',initData.position*5);
    },
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            et  = util.copy(this.get('elapsedTime')),
        	dPos = util.copy(this.get('defaultPosition'));
        
        et += dt;
        pos.x = 5*Math.cos(2*Math.PI*et/5)+dPos.x;
        pos.y = 5*Math.sin(4*Math.PI*et/5)+dPos.y;
 
        this.set('position', pos);
        this.set('elapsedTime',et);        
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+50);
    	this.set('position',Pos);
    	this.set('defaultPosition',Pos);
    }
});

exports.Player = Player;