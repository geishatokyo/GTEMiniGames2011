var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Wave = cocos.nodes.Node.extend({
	elapsedTime:null,
	defaultPosition:null,
	init: function(no) {
        Wave.superclass.init.call(this);
        var initData = constant.waveInitDatas(no);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/bigwave.png',
                        rect: new geom.Rect(0, 0, 200, 200)
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
        pos.x = 10*Math.cos(2*Math.PI*et/5)+dPos.x;
        pos.y = 10*Math.sin(4*Math.PI*et/5)+dPos.y;
 
        this.set('position', pos);
        this.set('elapsedTime',et);
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+100,pos.y+100);
    	this.set('position',Pos);
    	this.set('defaultPosition',Pos);
    }
});

exports.Wave = Wave;