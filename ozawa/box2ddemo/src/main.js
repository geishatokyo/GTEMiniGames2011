// Import the cocos2d module
var cocos = require('cocos2d'),
// Import the geometry module
    geo = require('geometry'),
// Import the geometry module
	util = require('util'),
// Import box2d Physics Engine
	box2d = require('box2d'),
// Import Barrel
	Barrel = require('Barrel').Barrel,
// Import Bullet
	Bullet = require('Bullet').Bullet;
	
// Create a new layer
var Box2ddemo = cocos.nodes.Layer.extend({    
	Barrel: null,
	Bullet: null,
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
        barrel.set('position', new geo.Point(5*420/14+15,6.5*420/14));
        this.addChild({child: barrel,z:20});
        this.set('barrel', barrel);
        
        //Add bullet
        var bullet = Bullet.create();
        bullet.set('position',new geo.Point(5*420/14+15,6.5*420/14));
        this.addChild({child: bullet,z:20});
        this.set('bullet', bullet);
        
        // Add Menu
        var up = cocos.nodes.MenuItemImage.create({normalImage: "/resources/up.png",
                                                    selectedImage:"/resources/sprites.png",
                                                    callback: util.callback(this, 'moveUp')});
        var down = cocos.nodes.MenuItemImage.create({normalImage: "/resources/down.png",
                                                    selectedImage:"/resources/sprites.png",
                                                    callback: util.callback(this, 'moveDown')});
        var right = cocos.nodes.MenuItemImage.create({normalImage: "/resources/right.png",
                                                    selectedImage:"/resources/sprites.png",
                                                    callback: util.callback(this, 'turnRight')});
        var left = cocos.nodes.MenuItemImage.create({normalImage: "/resources/left.png",
                                                    selectedImage:"/resources/sprites.png",
                                                    callback: util.callback(this, 'turnLeft')});
        var shot = cocos.nodes.MenuItemImage.create({normalImage: "/resources/bnx150x64_02.png",
                                                    selectedImage:"/resources/bnx150x64_02.png",
                                                    callback: util.callback(this, 'shotBall')});
        up.set('position',new geo.Point( 32,32)); 
        down.set('position',new geo.Point( 32, 370));
        right.set('position',new geo.Point( 32, 64+32));
        left.set('position',new geo.Point( 32, 370-64));
        shot.set('position',new geo.Point( 32, 64+64+75))
        var menu = cocos.nodes.Menu.create({items: [up,down,right,left,shot]});
        menu.set('position',new geo.Point(0,0));
        this.addChild({child: menu, z: 9});  
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
    createShot: function(point, scale,velocity,angle){
    	console.log(velocity);
    	scale = scale || 1;
    	var sprite = cocos.nodes.Sprite.create({file:'/resources/ball.png'});
    	sprite.set('position',point);
    	sprite.set('scale',scale);
    	sprite.set('velocity',velocity);
    	sprite.set('angle',angle);
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
    testHoleCollisio: function(){
    	var world = this.get('world');
    	var holePosX,
    		holePosY;
    },
    
    demo: function() {
    	var world = new box2d.b2World(new box2d.b2Vec2(0,0),true);
    	this.set('world',world);
    	
    	var fixDef = new box2d.b2FixtureDef;
    	fixDef.density = 10.0;
    	fixDef.friction = 1.0;
    	fixDef.restitution = 0.8;
    	var bodyDef = new box2d.b2BodyDef;
    	
    	//create ground
    	bodyDef.type = box2d.b2Body.b2_staticBody;
        fixDef.shape = new box2d.b2PolygonShape;
        
        fixDef.shape.SetAsBox(20, 2);
        bodyDef.position.Set(10, 400 / 30 + 2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(10, -2);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        fixDef.shape.SetAsBox(4, 14);
        bodyDef.position.Set(1, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(22, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    	
    	//create some objects
        bodyDef.type = box2d.b2Body.b2_dynamicBody;
        
        /*create shot ball
        bodyDef.position.x = 5;
        bodyDef.position.y = 6.5;
        var scale = 0.5,
            width = scale * 30;
        fixDef.shape = new box2d.b2CircleShape(width/30);
        sprite = this.createBall(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);

        var bullet = world.CreateBody(bodyDef);
        bullet.sprite = sprite;
        this.get('bodies').push(bullet);
        bullet.CreateFixture(fixDef);
        */
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
            bodyDef.linearDamping = 0.3;
            bodyDef.angularDamping = 0.5;
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
   moveUp: function(){
   		var barrel = this.get('barrel'),
        	pos = util.copy(barrel.get('position')),
        	bullet = this.get('bullet'),
        	posi = util.copy(bullet.get('position'));   
        if(pos.y>(6.5*400/14+10)-10*11){
        	pos.y -= 10;
        	posi.y -= 10;	
        }
        barrel.set('position',pos);
        bullet.set('position',posi);
        
   },
   moveDown: function(){
   		var barrel = this.get('barrel'),
        	pos = util.copy(barrel.get('position')),
        	bullet = this.get('bullet'),
        	posi = util.copy(bullet.get('position'));   
       if(pos.y<(6.5*400/14+10)+10*12){
        	pos.y += 10;
        	posi.y += 10;	
        }
        barrel.set('position',pos);
        bullet.set('position',posi); 
   },
   turnRight: function(){
   		var barrel = this.get('barrel'),
   			rotation = util.copy(barrel.get('rotation'));
   		rotation -= 5;
   		barrel.set('rotation',rotation); 	
   },
   turnLeft: function(){
   		var barrel = this.get('barrel'),
   			rotation = util.copy(barrel.get('rotation'));
   		rotation += 5;
   		barrel.set('rotation',rotation);
   },
   shotBall: function(){
   		var world = this.get('world');
    	var barrel = this.get('barrel'),
    		position = util.copy(barrel.get('position')), 
    		rotation = util.copy(barrel.get('rotation'));
    	
    	var fixDef = new box2d.b2FixtureDef;
    	fixDef.density = 100.0;
    	fixDef.friction = 1.0;
    	fixDef.restitution = 1.0;
    	var bodyDef = new box2d.b2BodyDef;
    	
   		bodyDef.type = box2d.b2Body.b2_dynamicBody;
   		bodyDef.position.x = 5;
        bodyDef.position.y = (position.y)*14/420;
        bodyDef.linearVelocity.x = 10*Math.cos(Math.PI*rotation/180);
        bodyDef.linearVelocity.y = 10*Math.sin(Math.PI*rotation/180);
        bodyDef.linearDamping = 0.1;
        bodyDef.angularDamping = 0.5;
        var scale = 0.5,
            width = scale * 30;
        fixDef.shape = new box2d.b2CircleShape(width/30);
        sprite = this.createShot(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale,
        							bodyDef.velocity,bodyDef.angle);

        var bullet = world.CreateBody(bodyDef);
        bullet.sprite = sprite;
        this.get('bodies').push(bullet);
        bullet.CreateFixture(fixDef);
        
        

   }
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
