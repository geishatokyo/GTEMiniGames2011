// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry'),
// Import the geometry module
	util = require('util');

var Background = cocos.nodes.Node.extend({
    init: function() {
       Background.superclass.init.call(this);
       var sprite = cocos.nodes.Sprite.create({
           file: '/resources/background.jpg',
           rect: new geo.Rect(0, 0, 488, 400)
           });
       sprite.set('anchorPointInPixels', new geo.Point(0, 0));
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});

var Background2 = cocos.nodes.Node.extend({
    init: function() {
       Background2.superclass.init.call(this);
       var sprite = cocos.nodes.Sprite.create({
           file: '/resources/background2.png',
           rect: new geo.Rect(0, 0, 425, 335)
           });
       sprite.set('anchorPointInPixels', new geo.Point(0, 0));
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});

exports.Background = Background;
exports.Background2 = Background2;