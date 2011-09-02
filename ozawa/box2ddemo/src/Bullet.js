// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry'),
// Import the geometry module
	util = require('util');

var Bullet = cocos.nodes.Node.extend({
    velocity: null,
    init: function() {
       Bullet.superclass.init.call(this);
       var sprite = cocos.nodes.Sprite.create({
           file: '/resources/ball.png',
           rect: new geo.Rect(0, 0, 64, 64)
           });
       sprite.set('anchorPointInPixels', new geo.Point(0, 0));
       this.set('scale',0.5);
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});

exports.Bullet = Bullet;