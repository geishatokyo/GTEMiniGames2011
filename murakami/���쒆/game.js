enchant();

window.onload = function() {
	var game = new Game(640, 520);
	game.preload('chara0.gif');
	game.onload = function() {

		var home = new Scene();
		var dungeon = new Scene();
		var shop = new Scene();
		var oganization = new Scene();

		game.replaceScene(home);		

 		var player = new Player("taro",1,1);
		var enemy = new Enemy("ziro",1,1,"001",100);
		
		var arr = [];
		arr.push(player);
		arr.push(enemy);
		arr.push(player);
		arr.splice(arr.indexOf(enemy),1 )
//		alert(arr.indexOf(enemy));
//		alert(arr.pop().name);
//		alert(arr.pop().name);




		var enemy_table = new Label();
		enemy_table._element.setAttribute('class','button');
		home.addChild(enemy_table);
		enemy_table.width = game.width/2;
		enemy_table.x = 0;
		enemy_table.y = game.height-500;
		enemy_table.text = '<table style="border:solid 1px black;"><tr><td style="border:solid 1px black;">これは</td><td>テストです。</td></tr></table>';
		enemy_table.backgroundColor = 'red';
		enemy_table.font = '4em"Ariar"';
		enemy_table.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
				surface.draw(game.assets['chara0.gif'],e.x,e.y);
				this.removeEventListener('touchend',arguments.callee);
		});
		enemy_table.addEventListener('enterframe', function() {
		});
      //window.enemy_table = enemy_table
//		$(enemy_table.element()).fadeOut(2000);


		var sprite = new Sprite(game.width, game.height);
		var surface = new Surface(game.width, game.height);
		sprite.image = surface;
		var x = 100;
		var y = 100;
		var r = 10;
		var b = 0;
		home.addChild(sprite);
		sprite.addEventListener('enterframe', function() {
			surface.context.beginPath();
			surface.context.arc(x,y,r,0,Math.PI*2,true); //円描画
			surface.context.closePath();
			surface.context.fillStyle = "rgb(0,0,200)"; //青色
			surface.context.fill(); //描画完了
			surface.context.beginPath();
			surface.context.strokeRect(0,0,game.width, game.height);
			surface.context.closePath();
//			x++;
		});

		var buttonShop = new Label();
		buttonShop._element.setAttribute('class','button');
		home.addChild(buttonShop);
		buttonShop.width = game.width/2;
		buttonShop.x = 0;
		buttonShop.y = game.height-80;
		buttonShop.text = 'ショップ';
		buttonShop.backgroundColor = 'red';
		buttonShop.font = '4em"Ariar"';
		buttonShop.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
				surface.draw(game.assets['chara0.gif'],e.x,e.y);
				this.removeEventListener('touchend',arguments.callee);
		});
		buttonShop.addEventListener('enterframe', function() {
		});

		var buttonTreasure = new Label();
		buttonTreasure._element.setAttribute('class','button');
		home.addChild(buttonTreasure);
		buttonTreasure.width = game.width/2;
		buttonTreasure.x = game.width/2;
		buttonTreasure.y = game.height-80;
		buttonTreasure.text = 'たからもの';
		buttonTreasure.backgroundColor = 'red';
		buttonTreasure.font = '4em"Ariar"';
		buttonTreasure.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
				surface.draw(game.assets['chara0.gif'],e.x,e.y);
				this.removeEventListener('touchend',arguments.callee);
		});

		var buttonoOga = new Label();
		buttonoOga._element.setAttribute('class','button');
		home.addChild(buttonoOga);
		buttonoOga.width = game.width/2;
		buttonoOga.x = 0;
		buttonoOga.y = game.height-160;
		buttonoOga.text = 'ダンジョン編成';
		buttonoOga.backgroundColor = 'red';
		buttonoOga.font = '4em"Ariar"';
		buttonoOga.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
				surface.draw(game.assets['chara0.gif'],e.x,e.y);
				this.removeEventListener('touchend',arguments.callee);
		});

		var buttonGo = new Label();
		buttonGo._element.setAttribute('class','css3button');
		home.addChild(buttonGo);
		buttonGo.width = game.width/2;
		buttonGo.x = game.width/2;
		buttonGo.y = game.height-160;
		buttonGo.text = 'ダンジョンへ';
		buttonGo.backgroundColor = 'red';
		buttonGo.font = '4em"Ariar"';
		buttonGo.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
//				this.removeEventListener('touchend',arguments.callee);
				game.replaceScene(dungeon);
//				document.location = "dungeon.html"; 
		});


		var healthInfo = new Label();
		home.addChild(healthInfo);
		healthInfo.x = 10;
		healthInfo.y = 0;
		healthInfo.font = '2em"Ariar"';
		healthInfo.text = player.health+"/"+player.healthmax;

		var levelInfo = new Label();
		home.addChild(levelInfo);
		levelInfo.x = 10;
		levelInfo.y = 20;
		levelInfo.font = '2em"Ariar"';
		levelInfo.text = "Lv:"+player.level;

		/************************************************************/

		var buttonFoward = new Label();
		buttonFoward._element.setAttribute('class','button');
		dungeon.addChild(buttonFoward);
		buttonFoward.width = game.width/2;
		buttonFoward.x = 0;
		buttonFoward.y = game.height-80;
		buttonFoward.text = '進む';
		buttonFoward.backgroundColor = 'red';
		buttonFoward.font = '4em"Ariar"';
		buttonFoward.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
				surface.draw(game.assets['chara0.gif'],e.x,e.y);
				this.removeEventListener('touchend',arguments.callee);
		});
		buttonFoward.addEventListener('enterframe', function() {

		});

		var buttonRetire = new Label();
		buttonRetire._element.setAttribute('class','button');
		dungeon.addChild(buttonRetire);
		buttonRetire.width = game.width/2;
		buttonRetire.x = buttonFoward.width;
		buttonRetire.y = game.height-80;
		buttonRetire.text = 'リタイア';
		buttonRetire.backgroundColor = 'red';
		buttonRetire.font = '4em"Ariar"';
		buttonRetire.addEventListener('touchend',function(e){
				//タッチ時に処理させたいコード記入部分
//				this.removeEventListener('touchend',arguments.callee);
				game.replaceScene(home);
		});

		var mesbox1 = new Label();
		mesbox1._element.setAttribute('class','messagebox');
		dungeon.addChild(mesbox1);
		mesbox1.width = game.width;
		mesbox1.height = 115;
		mesbox1.x = 0;
		mesbox1.y = game.height-200;
		mesbox1.text = enemy.name+" "+enemy.offence+" "+enemy.defence+" "+enemy.health+" "+enemy.id+"あああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああああ";
		mesbox1.backgroundColor = 'blue';
		mesbox1.font = '2em"Ariar"';

		var healthInfo = new Label();
		dungeon.addChild(healthInfo);
		healthInfo.x = 10;
		healthInfo.y = 0;
		healthInfo.font = '2em"Ariar"';
		healthInfo.text = player.health+"/"+player.healthmax;

		var levelInfo = new Label();
		dungeon.addChild(levelInfo);
		levelInfo.x = 10;
		levelInfo.y = 20;
		levelInfo.font = '2em"Ariar"';
		levelInfo.text = "Lv:"+player.level;

		/************************************************************/


	}
	game.start();

}

function Character(name,offence,defence)
{
	this.name = name;
	this.offence = offence;
	this.defence = defence;
}

function Player(name,offence,defence)
{
   var c = new Character(name,offence,defence);
	c.money = 0;
	c.health = c.healthmax = 15;
	c.exp = 0;
	c.level = 1;
	c.func = function(){
		alert(this.name+" "+this.offence+" "+this.defence+" "+this.health+" "+this.healthmax);
	}
	return c;
}

function Enemy(name,offence,defence, id, weight)
{
	var c = new Character(name,offence,defence);
	c.id = id;
	c.weight = weight;
	c.func = function(){
		alert(this.name+" "+this.offence+" "+this.defence+" "+this.health+" "+this.id);
	}
	return c;
}

function myDungeon()
{
	this.list = [];
	this.size;
}


function opDungeon()
{
	this.distance;
	
}

function Treasure()
{
	this.name;
	this.id;
}

