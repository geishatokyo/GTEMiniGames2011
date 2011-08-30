// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry'),
// Import the geometry module
	util = require('util');

var Barrel = cocos.nodes.Node.extend({
    velocity: null,
    init: function() {
       Barrel.superclass.init.call(this);
       var sprite = cocos.nodes.Sprite.create({
           file: '/resources/sprites.png',
           rect: new geo.Rect(0, 0, 64, 16)
           });
       sprite.set('anchorPointInPixels', new geo.Point(50, 0));
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});

exports.Barrel = Barrel;