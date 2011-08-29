var Constant = function(){
    var waveArray = [{startAngle:-15,diffAngle:30,position:-0.25},{startAngle:15,diffAngle:-30,position:0.25}];
    var fishArray = [
                     {name:"イワシ",length:20,weight:120,hp:1,attack:1,defence:0,size:1},
                     {name:"キス",length:30,weight:120,hp:1,attack:1,defence:0,size:1},
                     {name:"アジ",length:30,weight:150,hp:1,attack:1,defence:0,size:1},
                     {name:"サバ",length:35,weight:350,hp:1,attack:1,defence:0,size:1},
                     {name:"サンマ",length:40,weight:150,hp:1,attack:1,defence:0,size:1},
                     {name:"サワラ",length:80,weight:1500,hp:1,attack:1,defence:0,size:1},
                     {name:"スズキ",length:80,weight:3000,hp:1,attack:1,defence:0,size:1},
                     {name:"サケ",length:80,weight:2000,hp:1,attack:1,defence:0,size:1},
                     {name:"カツオ",length:60,weight:4000,hp:1,attack:1,defence:0,size:1},
                     {name:"ヒラメ",length:80,weight:6000,hp:1,attack:1,defence:0,size:1},
                     {name:"タイ",length:40,weight:1200,hp:1,attack:1,defence:0,size:1},
                     {name:"マグロ",length:3000,weight:400000,hp:1,attack:1,defence:0,size:1},
                     {name:"ダイオウイカ",length:20000,weight:5000000,hp:1,attack:1,defence:0,size:1}
                    ];
    return {
        waveInitDatas: function(index){
            return waveArray[index];
        }
    };
}();

exports.Constant = Constant;