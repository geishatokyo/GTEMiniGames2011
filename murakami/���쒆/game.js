enchant();

window.onload = function() {
	var game = new Game(640, 520);
	game.preload('chara0.gif');
	game.onload = function() {



		var home = new Scene();
		var dungeon = new Scene();
		var shop = new Scene();
		var oganization = new Scene();
		var myDungeon = new Scene();

		game.replaceScene(home);		

 		var player = new Player("taro",1,1);
		var enemy = new Enemy("ziro",1,1,"001",100);
		
		/*
		var arr = [];
		arr.push(player);
		arr.push(enemy);
		arr.push(player);
		arr.splice(arr.indexOf(enemy),1 )
		*/
//		alert(arr.indexOf(enemy));
//		alert(arr.pop().name);
//		alert(arr.pop().name);

		var majorList = [];
		majorList.push(Enemy("major1",1,2,"001",1));
		majorList.push(Enemy("major2",2,5,"002",2));
		majorList.push(Enemy("major3",5,7,"003",3));
		majorList.push(Enemy("major4",13,5,"004",4));
		majorList.push(Enemy("major5",21,9,"005",5));
		majorList.push(Enemy("major6",11,11,"006",4));
		majorList.push(Enemy("major7",8,28,"007",5));
		majorList.push(Enemy("major8",18,19,"008",6));
		majorList.push(Enemy("major9",33,15,"009",7));
		majorList.push(Enemy("major10",29,11,"010",6));
//		alert(majorList[0].name)
//		alert(majorList.pop().name)

		var minorList = [];
		minorList.push(Enemy("minor1",5,2,"001",3));
		minorList.push(Enemy("minor2",2,1,"002",1));
		minorList.push(Enemy("minor3",11,13,"003",4));
		minorList.push(Enemy("minor4",13,22,"004",5));
		minorList.push(Enemy("minor5",13,11,"005",4));
		minorList.push(Enemy("minor6",15,13,"006",5));
		minorList.push(Enemy("minor7",2,3,"007",1));
		minorList.push(Enemy("minor8",3,3,"008",2));
		minorList.push(Enemy("minor9",33,4,"009",4));
		minorList.push(Enemy("minor10",3,7,"010",3));

		game.replaceScene(myDungeon); // ダンジョン編成用のシーンに移動
	
		var majorEnemy = new Label(); // ダンジョンを守るモンスターの編隊のラベル（ラベル化することでxy座標を自由に変えられる）
		majorEnemy._element.setAttribute('class','button');
		majorEnemy.x = 0
		majorEnemy.text = makeFlickableList("major",majorList) // ラベルのテキスト要素にモンスターリストを作成する
		myDungeon.addChild(majorEnemy);

		var minorEnemy = new Label(); // モンスターの予備編隊のラベル
		minorEnemy._element.setAttribute('class','button');
		minorEnemy.x = 330
		minorEnemy.text = makeFlickableList("minor",minorList) // ラベルのテキスト要素にモンスターリストを作成する
		myDungeon.addChild(minorEnemy);

		$('#major').flickable(); // リストのフリックスクロールを可能にする
		$('#minor').flickable();

		/*
		$('.block').each(function(index){ // ダブルクリックしたリストの項目番号を取得する
			$(this).dblclick(function(){
		//		$(this).toggleClass("notice")
				target = index	
			});
		});
		*/

		var majorIdx
		var minorIdx
		var pre1 = $("#major.block")
		var pre2 = $("#minor.block")
	
		$('#major').find(".block").each(function(index){
			$(this).dblclick(function(){
				pre1.removeClass("notice")
				$(this).addClass("notice")
				majorIdx = index
				pre1 = $(this)
//				alert(majorIdx)
			});
		});


		$('#minor').find(".block").each(function(index){
			$(this).dblclick(function(){
				pre2.removeClass("notice")
				$(this).addClass("notice")
				minorIdx = index
				pre2 = $(this)
//				alert(minorIdx)
			});
		});

		var buttonChange = new Label();
		buttonChange._element.setAttribute('class','css3button');
		myDungeon.addChild(buttonChange);
		buttonChange.width = 100;
		buttonChange.x = game.width/2;
		buttonChange.y = game.height-160;
		buttonChange.text = 'チェンジ';
//		buttonChange.backgroundColor = 'red';
		buttonChange.font = '2em"Ariar"';
		buttonChange.addEventListener('touchend',function(e){ // 1軍と2軍で選んだ項目を入れ替え
			var content1
			var content2
			$('#major').find(".block").each(function(index){
				if(index == majorIdx){ // 1軍の選択したインデックス番号のとき
					content1 = $(this).text() // 1軍の要素のテキストを保持
					$('#minor').find(".block").each(function(index){ // 2軍の選択したインデックス番号のとき
						if(index == minorIdx){
							content2 = $(this).text() // 2軍要素のテキストを保持
							$(this).text(content1) // 2軍要素のテキストを1軍要素のテキストに入れ替え
						}
					});
					$(this).text(content2) // 1軍要素のテキストを2軍用要素のテキストに入れ替え
				}
			});
		});




/*
$('ul').append('<li><div  class="block">Content 1!!</div></li>')
$('ul').append('<li><div  class="block">Content 2!!</div></li>')
$('ul').append('<li><div  class="block">Content 3!!</div></li>')
*/

		/*
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
			x++;
		});
		*/

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
			game.replaceScene(myDungeon)
			$('#major').flickable(); // リストのフリックスクロールを可能にする
			$('.block').each(function(index){ // ダブルクリックしたリストの項目番号を取得する
				$(this).dblclick(function(){
					$(this).toggleClass("notice")
					target = this
					alert(this)
					target = index	
				});
			});
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
//				game.replaceScene(dungeon);
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


// フリックするためのリストを囲んだdiv要素を返す
function makeFlickableList(id, list)
{
	var tag = '<div id="'+id+'" class="flickable"><ul>'
	for(i = 0 ; i<10 ; i++){
		tag += '<li><div class="block">'+ getPermeate(list[i]) +'</div></li>' // リストを1項目ずつ作成
	}
	tag += '</ul><div style="clear:both;"></div></div>'


	return tag
}

function getPermeate(character)
{
	return '<div>'+ character.name +'<br>攻撃力：'+ character.offence +'<br>守備力：'+ character.defence +'</div>'
}


/*
function startTable(id)
{
	return '<div id="'+ id + '"><ul>'
}

function newItem(title)
{
	return '<li><div class="block">'+ title +'</div></li>'
}

function endTable()
{
	return '</ul><div style="clear:both;"></div></div>'
}
*/