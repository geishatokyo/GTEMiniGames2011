var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');

var Ball = cocos.nodes.Node.extend({
    velocity: null,

    init: function() {
        Ball.superclass.init.call(this);
        var sprite = cocos.nodes.Sprite.create({
            file: '/resourrse/sprites.png',
            rect: new geom.Rect(64, 0, 16, 16)
            });
        sprite.set('anchorPoint', new geom.Point(0, 0));
        this.addChild({child: sprite});
        this.set('contentSize', sprite.get('contentSize'));

        //Velocity determination
        this.set('velocity', new geom.Point(60, 120));
        //Timer Start
        this.scheduleUpdate();
    },

    update: function(dt){
        var pos = util.copy(this.get('position')),
            vel = util.copy(this.get('velocity'));

        pos.x += dt * vel.x;
        pos.y += dt * vel.y;

        this.set('position', pos);
        this.testBatCollision();
        this.testEdgeCollision();
    },

    testBatCollision: function(){
        var vel = util.copy(this.get('velocity')),
            ballBox = this.get('boundingBox'),

             // The parent of the ball is the Breakout Layer, which has a 'bat'
             // property pointing to the player's bat.
             batBox = this.get('parent').get('bat').get('boundingBox'); 
        if (vel.y > 0) {
           if (geom.rectOverlapsRect(ballBox, batBox)) {
              // Flip Y velocity
              vel.y *= -1;
              }
           }
        // Update position and velocity on the ball
        this.set('velocity', vel);
    },

    testEdgeCollision: function(){
        var vel = util.copy(this.get('velocity')),
            ballBox = this.get('boundingBox'),
            // Get size of canvas
            winSize = cocos.Director.get('sharedDirector').get('winSize');

        // Moving left and hit left edge
        if(vel.x < 0 && geom.rectGetMinX(ballBox) < 0){
             // Flip X velocity
             vel.x *= -1;
            }
        // Moving right and hit right edge
        if(vel.x > 0 && geom.rectGetMaxX(ballBox) > winSize.width){
            vel.x *= -1;
            }
        // Moving up and hit top edge
        if(vel.y < 0 && geom.rectGetMinY(ballBox) < 0){
            vel.y *= -1;
            }

        if(vel.y > 0 && geom.rectGetMinY(ballBox) > winSize.width){
            vel.y *= -1;
            }
        this.set('velocity', vel);
    }
});

exports.Ball = Ball;