var Constant = function(){
    var waveArray = [{startAngle:-15,diffAngle:30,position:-0.25},{startAngle:15,diffAngle:-30,position:0.25}];
    var fishArray = [
                     {id:0,name:"イワシ",exp:1,length:20,weight:120,hp:2,attack:1,defence:0,size:1,file:'iwashi'},
                     {id:1,name:"キス",exp:1,length:30,weight:120,hp:2,attack:1,defence:0,size:1,file:'kiss'},
                     {id:2,name:"アジ",exp:1,length:30,weight:150,hp:4,attack:1,defence:0,size:1,file:'aji'},
                     {id:3,name:"サバ",exp:1,length:35,weight:350,hp:4,attack:1,defence:0,size:3,file:'saba'},
                     {id:4,name:"サンマ",exp:1,length:40,weight:150,hp:4,attack:1,defence:0,size:2,file:'sanma'},
                     {id:5,name:"サワラ",exp:2,length:80,weight:1500,hp:8,attack:1,defence:0,size:4,file:'sawara'},
                     {id:6,name:"スズキ",exp:3,length:80,weight:3000,hp:8,attack:1,defence:0,size:4,file:'suzuki'},
                     {id:7,name:"サケ",exp:2,length:80,weight:2000,hp:8,attack:1,defence:0,size:4,file:'sake'},
                     {id:8,name:"カツオ",exp:2,length:80,weight:4000,hp:8,attack:1,defence:0,size:5,file:'katsuo'},
                     {id:9,name:"ヒラメ",exp:3,length:100,weight:6000,hp:10,attack:1,defence:0,size:5,file:'hirame'},
                     {id:10,name:"タイ",exp:2,length:60,weight:1200,hp:10,attack:1,defence:0,size:4,file:'tai'},
                     {id:11,name:"マグロ",exp:4,length:300,weight:400000,hp:15,attack:1,defence:0,size:10,file:'maguro'},
                     {id:12,name:"ダイオウイカ",length:20000,weight:5000000,hp:1000,attack:1,defence:0,size:1000,file:'ika'}
                    ];
    var boatArray = [{name:'おわん',size:10,file:'owan.png'},{name:'どんぶり',size:20,file:'donburi.png'},{name:'土鍋',size:30,file:'donabe.png'}];
    var harpoonArray = [{name:'はり',attack:1,amount:10,file:'hari.png'},{name:'フォーク',attack:2,amount:8,file:'fork.png'},{name:'ナイフ',attack:3,amount:6,file:'knife.png'}];
    var chumArray = [{name:'オキアミ',attribute:0,power:1,file:'komase.png'},{name:'イワシ',attribute:1,power:1,file:'iwashi.png'},{name:'アジ',attribute:1,power:2,file:'aji.png'}];
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