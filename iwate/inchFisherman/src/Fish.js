var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var ccp = geom.ccp;
var util = require('util');
var constant = require('Constant').Constant;


var Fish = cocos.nodes.Node.extend({
    label:null,
    funclist:[],
    status:null,
    velocity:{x:20,y:20},
    //HP:null,length:null,weight:null,size:null,atack:null,defence:null,
    hit:0,
	init: function() {
        Fish.superclass.init.call(this);
        var initData = constant.waveInitDatas(1);
        var img = cocos.nodes.MenuItemImage.create({normalImage: "/resources/fish.png",
                                                    selectedImage:"/resources/fish.png",
                                                   callback: util.callback(this, 'clickCallback')});
        //img.set('rotation',initData.startAngle);
                                               
        var menu = cocos.nodes.Menu.create({items: [img]});
        menu.set('position', ccp(0, 0));
        this.addChild({child: menu, z: 11});
        this.set('contentSize',img.get('contentSize'));

/*        var action, actionBack, seq;
        action = actions.RotateBy.create({duration: 1.25, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        img.runAction(actions.RepeatForever.create(seq));
        */
        this.addCallback(util.callback(this,'hitCallback'));
        
        this.scheduleUpdate();
	},
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            v = util.copy(this.get('velocity')),
            z = util.copy(this.get('zOrder'));
        
        v.y += 9.8*dt;
        pos.x += v.x*dt*5;
        pos.y += v.y*dt*5;
        
        
        var s = cocos.Director.get('sharedDirector').get('winSize');
        if(pos.x>s.width+200){
                pos.x = 2*(s.width+200)-pos.x;
                v.x = -v.x;
            }
        else if(pos.x<-0){
                pos.x = -pos.x;
                v.x = -v.x;
            }
        else if(pos.y>s.height){
                pos.y = s.height;
                v.y = -v.y;
            }
 
        this.set('position', pos);
        this.set('velocity',v);
    },
    setPosition: function(pos){
    	var Pos = new geom.Point(pos.x+50,pos.y+50);
    	this.set('position',Pos);
    },
    clickCallback: function(){
        var list = util.copy(this.get('funclist'));
        for(var i=0;i<list.length;i++){
            list[i]();
        }
    },
    addCallback: function(func){
        var list = util.copy(this.get('funclist'));
        list.push(func);
        this.set('funclist',list);
    },
    hitCallback: function(){
        var hit = util.copy(this.get('hit'));
        hit++;
        this.set('hit',hit);
    }
});

exports.Fish = Fish;