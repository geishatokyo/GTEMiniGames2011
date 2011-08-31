var cocos = require('cocos2d');
var geom = require('geometry');
var actions = cocos.actions;
var util = require('util');


var ScrollView = cocos.nodes.Node.extend({
    cells:null,
    mouse:null,
    datas:null,
    init: function(datas){
        ScrollView.superclass.init.call(this);
        var cells = [];
        for(i=0;i<5&&i<datas.length;i++){
            cells[i] = Cell.create({ index:index,
                                      file:datas[index].file,
                                      name:datas[index].name,
                                    recode:datas[index].recode});
            this.addChild({child:cell});
        }
        this.set('datas',datas);
    },
    mouseDown: function(evt){
        this.set('mouse',evt.locationInCanvas);
    },
    mouseDrug: function(evt){
        var size = this.get('contentSize');        

        var cells = this.get('cells');
        var preMouse = this.get('mouse');
        
        var dy = preMouse.y-evt.locationInCanvas.y;
        
        for(i=0;i<cells.length;i++){
            var pos = util.copy(cells[i].get('position'));
            pos.y += dy;
            if(pos.y<-50){
                    var datas = this.get('datas');
                    var index = util.copy(cells[i].get('index'))-cells[i].length;
                    this.removeChild({child:cells[i],cleanup:true})
                    if(index<datas.length);
                        cells[i] = Cell.create({ index:index,
                                                  file:datas[index].file,
                                                  name:datas[index].name,
                                                recode:datas[index].recode});
                        this.addChild({child:cells[i]});
                }
            else if(pos.y>=size.y+50){
                    var datas = this.get('datas');
                    var index = util.copy(cells[i].get('index'));
                    this.removeChild({child:cells[i],cleanup:true})
                    if(index-cells[i].length>=0)
                        cells[i] = Cell.create({ index:index,
                                                  file:datas[index].file,
                                                  name:datas[index].name,
                                                recode:datas[index].recode});
                    this.addChild({child:cells[i]});
                }
            cells[i].set('position',pos);
        }
    }
});

var Cell = cocos.nodes.Node.extend({
    index:null,
    init: function(content) {
        Cell.superclass.init.call(this);
        var img = cocos.nodes.Sprite.create({ file: content.file });
        var name = cocos.nodes.Label.create({ string: content.name' : ',
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        var recode = cocos.nodes.Label.create({ string: content.recode,
                                            fontName: "Thonburi",
                                            fontSize: 12,
                                           fontColor: '#502d16'});
        this.addChild({child:img});
        this.addChild({child:name});
        this.addChild({child:recode});
        this.set('contentSize', {wight:400,height:100});
        img.set('position',new geom.Point(50,50));
        name.set('anchorPoint',new geom.Point(0,0));
        name.set('position',new geom.Point(100,0));
        recode.set('anchorPoint',new geom.Point(0,0));
        recode.set('position',new geom.Point(250,0));
        this.set('index',context.index);
	},    
});

exports.Cell = Cell;
exports.ScrollView = ScrollView;