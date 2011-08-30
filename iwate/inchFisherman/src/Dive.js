var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Dive = cocos.nodes.Node.extend({
	elapsedTime:0,
	init: function() {
        Dive.superclass.init.call(this);
        var sprite = cocos.nodes.Sprite.create({
                        file: '/resources/dive.png',
                        rect: new geom.Rect(0, 0, 100, 45)
                    });
        sprite.set('anchorPoint', new geom.Point(0.5, 0.5));
        this.addChild({child: sprite});
        this.set('contentSize',sprite.get('contentSize'));
        this.scheduleUpdate();
	},
	update: function(dt) {
        var et  = util.copy(this.get('elapsedTime'));
        
        et += dt;
		this.set('elapsedTime',et);
		
		if(et>0.5){
			var parent = this.get('parent');
			parent.removeChild({child:this,cleanup:true});
		}
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+22.5);
    	this.set('position',Pos);
    }
});

exports.Dive = Dive;