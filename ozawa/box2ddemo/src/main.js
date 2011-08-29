// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry'),
// Import box2d Physics Engine
	box2d = require('box2d');

var Barrel = cocos.nodes.Node.extend({
    init: function() {
       Barrel.superclass.init.call(this);
       var sprite = cocos.nodes.Sprite.create({
           file: '/resources/sprites.png',
           rect: new geo.Rect(0, 0, 64, 16)
           });
       sprite.set('anchorPointInPixels', new geo.Point(64, 8));
       this.addChild({child: sprite});
       this.set('contentSize', sprite.get('contentSize'));
    }
});
// Create a new layer
var Box2ddemo = cocos.nodes.Layer.extend({    
	Barrel: null,
	world: null,
    bodies: null,
    selectedBody: null,
    mouseJoint: null,
    init: function() {
        // You must always call the super class version of init
        Box2ddemo.superclass.init.call(this);
        
        this.set('isMouseEnabled', true);
        this.set('bodies', []);

        // Get size of canvas
        var s = cocos.Director.get('sharedDirector').get('winSize');
        
        this.demo();
        this.scheduleUpdate();
        // Add Barrel
        var barrel = Barrel.create();
        barrel.set('position', new geo.Point(4.75*400/14,7*400/14));
        this.addChild({child: barrel,z:20});
        this.set('barrel', barrel);
    },
    
    createCrate: function(point, scale){
    	scale = scale || 1;
    	var sprite = cocos.nodes.Sprite.create({file:'/resources/crate.jpg'});
    	sprite.set('position',point);
    	sprite.set('scale',scale/2);
    	this.addChild(sprite);
    	return sprite;	
    },
    
    createBall: function(point, scale){
    	scale = scale || 1;
    	var sprite = cocos.nodes.Sprite.create({file:'/resources/ball.png'});
    	sprite.set('position',point);
    	sprite.set('scale',scale);
    	this.addChild(sprite);
    	return sprite;
    },
    
    update: function(dt){
    	var world = this.get('world'),
    		mouseJoint = this.get('mouseJoint');
    	
    	world.Step(dt, 10, 10);
    	world.ClearForces();
    	
    	var bodies = this.get('bodies');
    	for(var i = 0, len = bodies.length; i < len; i++){
    		var body = bodies[i],
    			pos = body.GetPosition(),
    			angle = geo.radiansToDegrees(body.GetAngle());
    		body.sprite.set('position', new geo.Point(pos.x * 30, pos.y * 30));
    		body.sprite.set('rotation',angle);    		
    	}
    },
    
    demo: function() {
    	var world = new box2d.b2World(new box2d.b2Vec2(0,0),true);
    	this.set('world',world);
    	
    	var fixDef = new box2d.b2FixtureDef;
    	fixDef.density = 10.0;
    	fixDef.friction = 1.0;
    	fixDef.restitution = 1.13;
    	var bodyDef = new box2d.b2BodyDef;
    	
    	//create ground
    	bodyDef.type = box2d.b2Body.b2_staticBody;
        fixDef.shape = new box2d.b2PolygonShape;
        
        fixDef.shape.SetAsBox(20, 2);
        bodyDef.position.Set(10, 400 / 30 + 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(10, -2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        fixDef.shape.SetAsBox(2.5, 14);
        bodyDef.position.Set(1, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(22, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    	
    	//create some objects
        bodyDef.type = box2d.b2Body.b2_dynamicBody;
        
        //create shot ball
        bodyDef.position.x = 4;
        bodyDef.position.y = 6.5;
        var scale = 0.5,
            width = scale * 30;
        fixDef.shape = new box2d.b2CircleShape(width/30);
        sprite = this.createBall(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);

        var bdy = world.CreateBody(bodyDef);
        bdy.sprite = sprite;
        this.get('bodies').push(bdy);
        bdy.CreateFixture(fixDef);
        
        //create some ball        
        for (var i = 0; i < 9*3; ++i) {
            var sprite;
            //bodyDef.position.x = Math.random() * 15;
            //bodyDef.position.y = Math.random() * 15;
            //var scale = (Math.random() + 0.5),
            //    width = scale * 32;
            //if (Math.random() > 0.5) {
            //    fixDef.shape = new box2d.b2PolygonShape;
            //    fixDef.shape.SetAsBox(width/30, width/30);
            //    sprite = this.createCrate(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
            //} else {
            //    fixDef.shape = new box2d.b2CircleShape(width/30);
            //    sprite = this.createBall(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
            //}
            if(i<9){
            	bodyDef.position.x = 14;
            	bodyDef.position.y = 2.5+(i*1);
            }else if(i<9*2){
            	bodyDef.position.x = 13;
            	bodyDef.position.y = 2.5+((i-9)*1);
            }else{
            	bodyDef.position.x = 12;
            	bodyDef.position.y = 2.5+((i-18)*1);
            }
            
            var scale = 0.5,
                width = scale * 30;
            fixDef.shape = new box2d.b2CircleShape(width/30);
            sprite = this.createBall(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
            
            var bdy = world.CreateBody(bodyDef);
            bdy.sprite = sprite;
            this.get('bodies').push(bdy);
            bdy.CreateFixture(fixDef);
		}
    },
    
    getBodyAtPoint: function(point){
    	point = new geo.Point(point.x /30, point.y /30);
        var world = this.get('world');
        var mousePVec = new box2d.b2Vec2(point.x, point.y);
        var aabb = new box2d.b2AABB();
        aabb.lowerBound.Set(point.x - 0.001, point.y - 0.001);
        aabb.upperBound.Set(point.x + 0.001, point.y + 0.001);

        var self = this;
        function getBodyCB(fixture) {
            if(fixture.GetBody().GetType() != box2d.b2Body.b2_staticBody) {
                if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
                    self.set('selectedBody', fixture.GetBody());
                    return false;
                }
            }
            return true;
        }

        // Query the world for overlapping shapes.
        this.set('selectedBody', null);
        world.QueryAABB(getBodyCB, aabb);
        return this.get('selectedBody');
    },
    
    mouseDown: function(evt) {
        var point = evt.locationInCanvas,
            world = this.get('world'),
            mouseJoint = this.get('mouseJoint');

        if (!mouseJoint) {
            var body = this.getBodyAtPoint(point);
            if(body) {
                var md = new box2d.b2MouseJointDef();
                md.bodyA = world.GetGroundBody();
                md.bodyB = body;
                md.target.Set(point.x /30, point.y /30);
                md.collideConnected = true;
                md.maxForce = 300.0 * body.GetMass();
                mouseJoint = world.CreateJoint(md);
                body.SetAwake(true);
                this.set('mouseJoint', mouseJoint);
            }
        }
    },
    
    mouseDragged: function(evt) {
        var point = evt.locationInCanvas,
            world = this.get('world'),
            mouseJoint = this.get('mouseJoint');

        if (mouseJoint) {
            mouseJoint.SetTarget(new box2d.b2Vec2(point.x /30, point.y /30));
        }
    },
    
	mouseUp: function(evt) {
        var mouseJoint = this.get('mouseJoint'),
            world = this.get('world');

        if (mouseJoint) {
            world.DestroyJoint(mouseJoint);
            this.set('mouseJoint', null);
        }
   },
});



exports.main = function() {
    // Initialise application

    // Get director
    var director = cocos.Director.get('sharedDirector');

    // Attach director to our <div> element
    director.attachInView(document.getElementById('box2ddemo_app'));

    director.set('displayFPS', true);
    
    // Create a scene
    var scene = cocos.nodes.Scene.create();

    // Add our layer to the scene
    scene.addChild({child: Box2ddemo.create()});

    // Run the scene
    director.runWithScene(scene);
};
