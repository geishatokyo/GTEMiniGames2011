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
    velocity:null,
    elapsedTime:null,
    defaultPosition:null,
    status:null,
    hit:0,
    dir:0,
	init: function(no) {
        Fish.superclass.init.call(this);
        var sts = constant.fishStatusDatas(no);
        
        var img = cocos.nodes.MenuItemImage.create({normalImage: "/resources/fishs/"+sts.file+".png",
                                                    selectedImage:"/resources/fishs/"+sts.file+".png",
                                                   callback: util.callback(this, 'clickCallback')});
        
                                               
        var menu = cocos.nodes.Menu.create({items: [img]});
        menu.set('position', ccp(0, 0));
        this.addChild({child: menu, z: 0});
        this.set('contentSize',img.get('contentSize'));
        
        this.set('elapsedTime',0);

        var initData = constant.waveInitDatas(1);
        var action, actionBack, seq;
        img.set('rotation',initData.startAngle);
        action = actions.RotateBy.create({duration: 5, angle: initData.diffAngle});
        actionBack = action.reverse();
        seq = actions.Sequence.create({actions: [action, actionBack]});
        img.runAction(actions.RepeatForever.create(seq));
        
        var rand = Math.random();
        this.set('dir',(rand>0.5)?1:-1);
        this.set('velocity',{x:Math.random()*90+10,y:0})
        
        sts.length = (Math.random()+0.5)*sts.length;
        var scale = sts.length/100;
        if(scale<0.5) scale = 0.5;
        this.set('scaleX',scale);
        this.set('scaleY',scale);
        
        this.addCallback(util.callback(this,'hitCallback'));
        
        this.scheduleUpdate();
        
        this.set('status',sts);
	},
	update: function(dt) {
        var pos = util.copy(this.get('position')),
            v = util.copy(this.get('velocity')),
            z = util.copy(this.get('zOrder')),
            et  = util.copy(this.get('elapsedTime'));
            
        et+=dt;
        v.y = 100*Math.cos(et)*this.get('dir');
        pos.x += v.x*dt;
        pos.y += v.y*dt;
        
        
        var s = cocos.Director.get('sharedDirector').get('winSize');
        if(pos.x>s.width+200){
                pos.x = 2*(s.width+200)-pos.x;
                v.x = -v.x;
            }
        else if(pos.x<-0){
                pos.x = -pos.x;
                v.x = -v.x;
            }
 
        this.set('position', pos);
        this.set('velocity',v);
        this.set('elapsedTime',et);
    },
    setPosition: function(pos){
        var size = this.get('contentSize');
    	var Pos = new geom.Point(pos.x+size.width/2,pos.y+size.height/2);
    	this.set('position',Pos);
    },
    clickCallback: function(){
        var list = util.copy(this.get('funclist'));
        for(var i=0;i<list.length;i++){
            list[i](this);
        }
    },
    addCallback: function(func){
        var list = util.copy(this.get('funclist'));
        list.push(func);
        this.set('funclist',list);
    },
    hitCallback: function(){
        var hit = util.copy(this.get('hit'));
        var sts = util.copy(this.get('status'));
        hit++;
        if(sts.attack>3);
        this.set('hit',hit);
    }
});

exports.Fish = Fish;