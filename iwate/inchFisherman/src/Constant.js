var Constant = function(){
    var waveArray = [{startAngle:-15,diffAngle:30,position:-0.25},{startAngle:15,diffAngle:-30,position:0.25}];
    var fishArray = [
                     {name:"イワシ",length:20,weight:120,hp:1,attack:1,defence:0,size:1,file:'iwashi'},
                     {name:"キス",length:30,weight:120,hp:1,attack:1,defence:0,size:1,file:'kiss'},
                     {name:"アジ",length:30,weight:150,hp:2,attack:1,defence:0,size:1,file:'aji'},
                     {name:"サバ",length:35,weight:350,hp:2,attack:1,defence:0,size:3,file:'saba'},
                     {name:"サンマ",length:40,weight:150,hp:2,attack:1,defence:0,size:2,file:'sanma'},
                     {name:"サワラ",length:80,weight:1500,hp:4,attack:1,defence:0,size:4,file:'sawara'},
                     {name:"スズキ",length:80,weight:3000,hp:4,attack:1,defence:0,size:4,file:'suzuki'},
                     {name:"サケ",length:80,weight:2000,hp:4,attack:1,defence:0,size:4,file:'sake'},
                     {name:"カツオ",length:80,weight:4000,hp:4,attack:1,defence:0,size:5,file:'katsuo'},
                     {name:"ヒラメ",length:100,weight:6000,hp:5,attack:1,defence:0,size:5,file:'hirame'},
                     {name:"タイ",length:60,weight:1200,hp:5,attack:1,defence:0,size:4,file:'tai'},
                     {name:"マグロ",length:300,weight:400000,hp:10,attack:1,defence:0,size:10,file:'maguro'},
                     {name:"ダイオウイカ",length:20000,weight:5000000,hp:1000,attack:1,defence:0,size:1000,file:'ika'}
                    ];
    var boatArray = [{name:'おわん',size:10,file:'owan.png'}];
    var harpoonArray = [{name:'はり',attack:1,amount:10,file:'hari.png'}];
    var chumArray = [{name:'オキアミ',attribute:0,power:1,file:'komase.png'}];
    return {
        waveInitDatas: function(index){
            return waveArray[index];
        },
        fishStatusDatas: function(index){
            return fishArray[index];
        },
        boatDatas: function(index){
            return boatArray[index];
        },
        harpoonDatas: function(index){
            return harpoonArray[index];
        },
        chumDatas: function(index){
            return chumArray[index];
        },
        boatArray:function(){
            return boatArray;
        },
        harpoonArray: function(){
            return harpoonArray;
        },
        chumArray: function(){
            return chumArray;
        }
    };
}();

exports.Constant = Constant;