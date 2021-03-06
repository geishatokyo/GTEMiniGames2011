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
	BarrelBase = require('Barrel').BarrelBase,
// Import Bullet
	Bullet = require('Bullet').Bullet,
// Import Background
	Background = require('Background').Background;
	Background2 = require('Background').Background2;
	
// Create a new layer
var Box2ddemo = cocos.nodes.Layer.extend({    
	Barrel: null,
	Bullet: null,
	Background: null,
	Background2: null,
	world: null,
    bodies: null,
    holes: null,
    contact: null,
    ballSetPattern: null,
    selectedBody: null,
    mouseJoint: null,
    init: function() {
        // You must always call the super class version of init
        Box2ddemo.superclass.init.call(this);
        
        this.set('isMouseEnabled', true);
        this.set('bodies', []);
        this.set('holes', []);
        this.set('ballSetPattern',0);

        // Get size of canvas
        var s = cocos.Director.get('sharedDirector').get('winSize');
        
        this.demo();
        this.scheduleUpdate();
        
        // Add Barrel
        var barrel = Barrel.create();
        barrel.set('position', new geo.Point(5*420/14+15,6.5*420/14));
        this.addChild({child: barrel,z:20});
        this.set('barrel', barrel);
        var barrelBase = BarrelBase.create();
        barrelBase.set('position', new geo.Point(5*420/14+15,6.5*420/14));
        this.addChild({child: barrelBase,z:19});
        this.set('barrelBase', barrelBase);
        //Add Bullet
        var bullet = Bullet.create();
        bullet.set('position',new geo.Point(5*420/14+15,6.5*420/14));
        this.addChild({child: bullet,z:20});
        this.set('bullet', bullet);
        //Add Background
        var background = Background.create(),
        	background2 = Background2.create();
        background.set('position',new geo.Point(360,200));
        background2.set('position',new geo.Point(360,200));
        this.addChild({child: background,z:-2});
        this.set('background', background);
        this.addChild({child: background2,z:-1});
        this.set('background2', background2);
        
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
    createShot: function(point, scale){
    	scale = scale || 1;
    	var sprite = cocos.nodes.Sprite.create({file:'/resources/bullet.png'});
    	sprite.set('position',point);
    	sprite.set('scale',scale);
    	this.addChild(sprite);
    	return sprite;
    },
    createHole: function(point,scale){
    	scale = scale || 1;
    	var sprite = cocos.nodes.Sprite.create({file:'/resources/hole.png'});
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
    	
    	var bodies = this.get('bodies'),
    		holes = this.get('holes');
   		for(var len = bodies.length-1, i = len; i >= 0; i--){
   			var body = bodies[i],
   				pos = body.GetPosition(),
    			angle = geo.radiansToDegrees(body.GetAngle());
   			body.sprite.set('position', new geo.Point(pos.x * 30, pos.y * 30));
   			body.sprite.set('rotation',angle);
   			for(var j = 0, hlen = holes.length; j < hlen; j++){
   				//console.log(bodies.length,i,body);
   				var hole = holes[j],
   					hpos = hole.GetPosition();
    			if(Math.sqrt(Math.pow(pos.x-hpos.x,2)+Math.pow(pos.y-hpos.y,2))<=0.75){
   					this.removeChild({child:body.sprite,cleanup:true});
   					world.DestroyBody(body);
   					bodies.splice(i,1)
   				}
   			}
   		}   		
   	
    	this.testHoleCollision();
    },
    testHoleCollision: function(){
    	var world = this.get('world'),
    		contact = this.get('contact'),
    		bodies = this.get('bodies'),
    		holes = this.get('holes');
    	//console.log(contact.IsTouching());
    	//console.log(holes);
    	//console.log(bodies);
    	//world.DestroyBody(hole);
    	
    },
    
    demo: function() {
    	var world = new box2d.b2World(new box2d.b2Vec2(0,0),true);
    	this.set('world',world);
    	var contact = new box2d.b2Contact;
    	this.set('contact',contact);
    	
    	var fixDef = new box2d.b2FixtureDef;
    	fixDef.density = 1.0;
    	fixDef.friction = 1.0;
    	fixDef.restitution = 1.0;
    	var bodyDef = new box2d.b2BodyDef;
    	
    	//create ground
    	bodyDef.type = box2d.b2Body.b2_staticBody;
        fixDef.shape = new box2d.b2PolygonShape;
        
        fixDef.shape.SetAsBox(20, 2);
        bodyDef.position.Set(10, (400 / 30 + 2)-1);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(10, -1);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        
        fixDef.shape.SetAsBox(4, 14);
        bodyDef.position.Set(0.8, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(22.95, 13);
        world.CreateBody(bodyDef).CreateFixture(fixDef);
    	
    	//create Hole
    	fixDef.shape = new box2d.b2CircleShape(0.5);
    	fixDef.isSensor = true;
    	for(var i = 0; i < 3; i++){
    		bodyDef.position.x = 17.9;
    		bodyDef.position.y = 13/3*i+14/6;
    		sprite = this.createHole(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
    		var hole = world.CreateBody(bodyDef);
            hole.sprite = sprite;
        	this.get('holes').push(hole);
        	hole.CreateFixture(fixDef);	
    	}
    	
        fixDef.isSensor = false;
    	
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
		fixDef.isSensor = true;
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
            mouseJoint = this.get('mouseJoint'),
            barrel = this.get('barrel'),
            bullet = this.get('bullet'),
            barrelBase = this.get('barrelBase');
			
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
        
        if(!barrel.mouseConect){
        	var pos = util.copy(barrelBase.get('position')),
        		rot = util.copy(barrel.get('rotaiton')),
        		slope = Math.tan(Math.PI*rot/180),
        		intercept = 16/Math.cos(Math.PI*rot/180);
        	if(point.x>=pos.x-96 && point.x<=pos.x-16){
        		if(point.y<=pos.y+36 && point.y>=pos.y-36){
        			barrel.mouseConect=true;	
        		}
        	}
        }
        if(!bullet.mouseConect){
     		var pos = util.copy(bullet.get('position'));  
     		if(Math.sqrt(Math.pow(pos.x-point.x,2)+Math.pow(pos.y-point.y,2))<=16){
     			bullet.mouseConect=true;
     		}
        	
        }
        //console.log(barrel.mouseConect,bullet.mouseConect);
    }, 
    mouseDragged: function(evt) {
        var point = evt.locationInCanvas,
            world = this.get('world'),
            mouseJoint = this.get('mouseJoint'),
            barrel = this.get('barrel'),
            bullet = this.get('bullet'),
            barrelBase = this.get('barrelBase');
		//console.log(point,mouseJoint);
        if (mouseJoint) {
            mouseJoint.SetTarget(new box2d.b2Vec2(point.x /30, point.y /30));
        }
        if(barrel.mouseConect){
        	var pos = util.copy(barrel.get('position'));
        	pos.y = point.y;
        	barrel.set('position',pos);
        	bullet.set('position',pos);
        	barrelBase.set('position',pos);
        }
        if(bullet.mouseConect){
        	var pos = util.copy(barrel.get('position')),
        		rot = util.copy(barrel.get('rotation'));
        	pos.x = -pos.x+point.x;
        	pos.y = -pos.y+point.y;
        	rot = Math.atan2(pos.y,pos.x);
        	barrel.set('rotation',rot*180/Math.PI); 
        	//console.log(pos.x,pos.y,rot*180/Math.PI);
        }
    }, 
	mouseUp: function(evt) {
        var mouseJoint = this.get('mouseJoint'),
            world = this.get('world'),
            barrel = this.get('barrel'),
            bullet = this.get('bullet');

        if (mouseJoint) {
            world.DestroyJoint(mouseJoint);
            this.set('mouseJoint', null);
        }
        if(barrel.mouseConect){
        	barrel.mouseConect=false;
        }
        if(bullet.mouseConect){
        	bullet.mouseConect=false;
        	this.shotBall(evt);
        }
        //console.log(barrel.mouseConect,bullet.mouseConect);
   },

   moveUp: function(){
   		
   		var barrel = this.get('barrel'),
        	pos = util.copy(barrel.get('position')),
        	bullet = this.get('bullet');  
        if(pos.y>(6.5*400/14+10)-10*11){
        	pos.y -= 10;	
        }
        barrel.set('position',pos);
        bullet.set('position',pos);
     
   },
   moveDown: function(){
   		var barrel = this.get('barrel'),
        	pos = util.copy(barrel.get('position')),
        	bullet = this.get('bullet');   
       if(pos.y<(6.5*400/14+10)+10*12){
        	pos.y += 10;	
        }
        barrel.set('position',pos);
        bullet.set('position',pos); 
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
   shotBall: function(evt){
   		var point = evt.locationInCanvas,
   			world = this.get('world'),
    		barrel = this.get('barrel'),
    		position = util.copy(barrel.get('position')), 
    		rotation = util.copy(barrel.get('rotation'));
    	
    	var fixDef = new box2d.b2FixtureDef;
    	fixDef.density = 8.0;
    	fixDef.friction = 1.0;
    	fixDef.restitution = 1.0;
    	var bodyDef = new box2d.b2BodyDef;
    	var velocity = Math.sqrt(Math.pow(position.x-point.x,2)+Math.pow(position.y-point.y,2))/15;
    	console.log(velocity); 
   		bodyDef.type = box2d.b2Body.b2_dynamicBody;
   		bodyDef.position.x = 5;
        bodyDef.position.y = (position.y)*14/420;
        bodyDef.linearVelocity.x = velocity*Math.cos(Math.PI*rotation/180);
        bodyDef.linearVelocity.y = velocity*Math.sin(Math.PI*rotation/180);
        bodyDef.linearDamping = 0.3;
        bodyDef.angularDamping = 0.5;
        var scale = 0.5,
            width = scale * 30;
        fixDef.shape = new box2d.b2CircleShape(width/30);
        sprite = this.createShot(new geo.Point(bodyDef.position.x * 30, bodyDef.position.y * 30), scale);
        var blt = world.CreateBody(bodyDef);
        blt.sprite = sprite;
        this.get('bodies').push(blt);
        blt.CreateFixture(fixDef);
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
