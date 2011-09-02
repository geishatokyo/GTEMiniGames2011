var cocos = require('cocos2d');
var geom = require('geometry');
var util = require('util');
var ccp = geom.ccp;


var ScrollView = cocos.nodes.Layer.extend({
    cells:null,
    mouse:null,
    datas:null,
    scrollUp:true,
    scrollDown:true,
    init: function(datas){
        ScrollView.superclass.init.call(this);
        var cells = [];
        for(i=0;i<4&&i<datas.length;i++){
            cells[i] = Cell.create({ index:i,
                                      file:datas[i].file,
                                      name:datas[i].name,
                                    recode:datas[i].recode});
            cells[i].setPosition(ccp(0,i*100+10));
            cells[i].set('anchorPoint',ccp(0,0));
            this.addChild({child:cells[i]});
        }
 
        this.set('datas',datas);
        this.set('cells',cells);
        this.set('isMouseEnabled',true);
    },
    mouseDown: function(evt){
        this.set('mouse',evt.locationInCanvas);
        
    },
    mouseDragged: function(evt){
        var size = this.get('contentSize');        

        var cells = this.get('cells');
        var preMouse = util.copy(this.get('mouse'));
        
        var dy = evt.locationInCanvas.y-preMouse.y;
        var up = this.get('scrollUp');
        var down = this.get('scrollDown');
        var vpos;
        var pos;
        var cs;
        var i,max;
        
        if(dy>30||dy<-30){
            this.set('preMouse',evt.locationInCanvas);
            for(i=0,max=cells.length;i<max;i++){
                vpos = util.copy(this.get('position'));
                vs = util.copy(cells[i].get('contentSize'));
                pos = util.copy(cells[i].get('position'));
                cs = util.copy(cells[i].get('contentSize'));
                pos.y += (Math.floor(dy/50)>10)? 10:Math.floor(dy/20);
                //console.log(i+':'+pos.y+':'+dy+':'+vpos.y);
                if(pos.y<-90){
                        var datas = this.get('datas');
                        var index = util.copy(cells[i].get('index'))+max;
                        if(index<datas.length){
                            this.removeChild({child:cells[i],cleanup:true})
                            cells[i] = Cell.create({ index:index,
                                                      file:datas[index].file,
                                                      name:datas[index].name,
                                                    recode:datas[index].recode});
                            this.addChild({child:cells[i]});
                            cells[i].set('anchorPoint',ccp(0,0));
                            pos.y = cells[(i+max-1)%max].get('position').y+100;
                            console.log(pos.y);
                            up = true;
                            down = true;
                        }else{
                            up = false;
                            down = true;
                        }
                    
                        this.set('scrollUp',up);
                        this.set('scrollDown',down);
                        
                    }
                else if(pos.y>310){
                        var datas = this.get('datas');
                        var index = util.copy(cells[i].get('index'))-max;
                        if(index>=0){
                            this.removeChild({child:cells[i],cleanup:true})
                            cells[i] = Cell.create({ index:index,
                                                      file:datas[index].file,
                                                      name:datas[index].name,
                                                    recode:datas[index].recode});
                            this.addChild({child:cells[i]});
                            cells[i].set('anchorPoint',ccp(0,0));
                            
                            pos.y = cells[(i+1)%max].get('position').y-100;
                            down = true;
                            up = true;
                        }else{
                            up = true;
                            down = false;
                        }
                    
                        
                        this.set('scrollDown',down);
                        this.set('scrollUp',up);
                    }
                if(dy>0&&down){
                        cells[i].setPosition(pos);
                        up = true;
                        this.set('scrollUp',up);
                    }
                else if(dy<0&&up){
                    cells[i].setPosition(pos);
                    down = true;
                    this.set('scrollDown',down);
                }
            }
            
        }
  
    }
});

var Cell = cocos.nodes.Node.extend({
    content:null,
    index:null,
    init: function(content) {
        Cell.superclass.init.call(this);
        var img = cocos.nodes.Sprite.create({ file: content.file });
        var name = cocos.nodes.Label.create({ string: content.name+' : ',
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        var recode = cocos.nodes.Label.create({ string: content.recode + '      cm',
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        this.addChild({child:img});
        this.addChild({child:name});
        this.addChild({child:recode});
        this.set('contentSize', {wight:400,height:100});
        name.set('anchorPoint',ccp(0,0));
        recode.set('anchorPoint',ccp(0,0));
        this.set('index',content.index);
        this.set('content',{image:img,name:name,recode:recode,detail:null});
        this.set('isMouseEnabled',true);
	},
    setPosition: function(pos){
        var content = this.get('content');
        var image = this.get('image');
        var name = this.get('name');
        var recode = this.get('recode');
        this.set('position',pos);
        content.image.set('position',ccp(pos.x+50,pos.y+50));
        content.name.set('position',ccp(pos.x+150,pos.y));
        content.recode.set('position',ccp(pos.x+300,pos.y));
        this.set('content',{image:content.image,name:content.name,recode:content.recode,detail:null});
    }
});

exports.Cell = Cell;
exports.ScrollView = ScrollView;