enchant();

window.onload = function() {
	var game = new Game(640, 520);
	game.preload('chara0.gif','mainview.png','background.png','door.png');
	game.onload = function() {


		var home = new Scene();
		var dungeon = new Scene();
		var formation = new Scene();
//		var shop = new Scene();

		// ゲームはホーム画面からはじめる
		game.replaceScene(home);		

		// プレイヤーを作成
 		var player = new Player("player",randomRange(5,10),randomRange(5,10),randomRange(10,30));

		// モンスターの1軍を作る
		var majorList = [];
		for(i=0 ; i<10 ; i++){
			majorList.push(new Enemy("メジャー"+i, randomRange(1,20), randomRange(1,20),("00" + randomRange(1,10)).slice(-3),1)); // 4つ目のパラメタはモンスターのIDを3桁の文字列で取得
		}

		// モンスターの2軍を作る
		var minorList = [];
		for(i=0 ; i<10 ; i++){
			minorList.push(new Enemy("マイナー"+i, randomRange(1,20), randomRange(1,20),("00" + randomRange(1,10)).slice(-3),1)); // 4つ目のパラメタはモンスターのIDを3桁の文字列で取得
		}

//		game.replaceScene(formation); // ダンジョン編成用のシーンに移動
//		game.replaceScene(dungeon); // ダンジョン進行の


		var majorEnemy = new Label(); // ダンジョンを守るモンスターの編隊のラベル（ラベル化することでxy座標を自由に変えられる）
		majorEnemy._element.setAttribute('class','button');
		majorEnemy.x = 0
		majorEnemy.text = makeFlickableList("major",majorList) // ラベルのテキスト要素にモンスターリストを作成する
		formation.addChild(majorEnemy);

		var minorEnemy = new Label(); // モンスターの予備編隊のラベル
		minorEnemy._element.setAttribute('class','button');
		minorEnemy.x = 330
		minorEnemy.text = makeFlickableList("minor",minorList) // ラベルのテキスト要素にモンスターリストを作成する
		formation.addChild(minorEnemy);

		$('#major').flickable(); // リストのフリックスクロールを可能にする
		$('#minor').flickable();

		var majorIdx
		var minorIdx

	
/*
		$('#major').find(".block").each(function(index){
			$(this).dblclick(function(){
				pre1.removeClass("notice")
				$(this).addClass("notice")
				majorIdx = index
				pre1 = $(this)
			});
		});

		$('#minor').find(".block").each(function(index){
			$(this).dblclick(function(){
				pre2.removeClass("notice")
				$(this).addClass("notice")
				minorIdx = index
				pre2 = $(this)
			});
		});
*/

		var buttonChange = new Label();
		buttonChange._element.setAttribute('class','css3button');
		formation.addChild(buttonChange);
		buttonChange.width = 100;
		buttonChange.x = game.width/2 + 50;
		buttonChange.y = game.height-160;
		buttonChange.text = 'チェンジ';
//		buttonChange.backgroundColor = 'red';
		buttonChange.font = '2em"Ariar"';
		buttonChange.addEventListener('touchend',function(e){ // 1軍と2軍で選んだ項目を入れ替え
			var content1
			var content2
			$('#major').find("li").each(function(index){
				if(index == majorIdx){ // 1軍の選択したインデックス番号のとき
					content1 =  $(this) // 1軍の要素のテキストを保持
					$('#minor').find("li").each(function(index){ // 2軍の選択したインデックス番号のとき
						if(index == minorIdx){
							content2 = $(this) // 2軍要素のテキストを保持
						}
						if(index == minorIdx + 1){
							$(this).before(content1) // 2軍要素のテキストを1軍要素のテキストに入れ替え
						}
					});
				}
				if(index == majorIdx +1){
					$(this).before(content2) // 1軍要素のテキストを2軍用要素のテキストに入れ替え
				}
			});
		});

		// モンスター編成画面からホームへ戻るボタン
		var buttonBack = new Label();
		buttonBack._element.setAttribute('class','css3button');
		formation.addChild(buttonBack);
		buttonBack.width = 100;
		buttonBack.x = game.width/2-200;
		buttonBack.y = game.height-160;
		buttonBack.text = '戻る';
//		buttonBack.backgroundColor = 'red';
		buttonBack.font = '2em"Ariar"';
		buttonBack.addEventListener('touchend',function(e){ // 1軍と2軍で選んだ項目を入れ替え
			game.replaceScene(home)
		});

		/**************************************************************/

		// ショップ画面に移るボタン
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
			// ショップボタンが押されたときの処理（未実装）
		});
		buttonShop.addEventListener('enterframe', function() {
		});

		// たからものを見る画面に映るボタン
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
			// たからものボタンが押されたときの処理（未実装）
		});

		// モンスター編成画面に映るボタン
		var buttonFormation = new Label();
		buttonFormation._element.setAttribute('class','button');
		home.addChild(buttonFormation);
		buttonFormation.width = game.width/2;
		buttonFormation.x = 0;
		buttonFormation.y = game.height-160;
		buttonFormation.text = 'ダンジョン編成';
		buttonFormation.backgroundColor = 'red';
		buttonFormation.font = '4em"Ariar"';
		buttonFormation.addEventListener('touchend',function(e){
			game.replaceScene(formation)
			var pre1 = $("#major.block") // １軍で前回クリックされたリスト項目（初期値はすべてのリストからハイライトを消すために設定）
			var pre2 = $("#minor.block") // ２軍で前回クリックされたリスト項目（初期値はすべてのリストからハイライトを消すために設定）
			$('#major').flickable(); // １軍リストのフリックスクロールを可能にする
			$('#minor').flickable(); // ２軍リストのフリックスクロールを可能にする
	
			// １軍のリストがダブルクリックされたときハイライトする
			$('#major').find(".block").each(function(index){
				$(this).dblclick(function(){
					pre1.removeClass("notice")
					$(this).addClass("notice")
					majorIdx = index
					pre1 = $(this)
				});
			});

			// ２軍のリストがダブルクリックされたときハイライトする
			$('#minor').find(".block").each(function(index){
				$(this).dblclick(function(){
					pre2.removeClass("notice")
					$(this).addClass("notice")
					minorIdx = index
					pre2 = $(this)
				});
			});
		});

		// ダンジョン進行画面へ移るためのボタン
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
				initDungeon() // ダンジョンを初期化
				game.replaceScene(dungeon); // ダンジョン画面に切り替える
		});

		// ホーム画面の体力情報を表示するためのラベル
		var healthInfo = new Label();
		home.addChild(healthInfo);
		healthInfo.x = 10;
		healthInfo.y = 0;
		healthInfo.font = '2em"Ariar"';
		healthInfo.text = player.health+"/"+player.healthmax;

		// ホーム画面のレベル情報を表示するためのラベル
		var levelInfo = new Label();
		home.addChild(levelInfo);
		levelInfo.x = 10;
		levelInfo.y = 20;
		levelInfo.font = '2em"Ariar"';
		levelInfo.text = "Lv:"+player.level;

		/************************************************************/

		// ダンジョンで戦うモンスターのリスト
		var enemyList = [];
		for(i=0 ; i<10 ; i++){
			enemyList.push(new Enemy("モンスター"+i, randomRange(1,20), randomRange(1,20),("00" + randomRange(1,10)).slice(-3),randomRange(1,10))); // 4つ目のパラメタはモンスターのIDを3桁の文字列で取得
		}

		// ダンジョンのサイズとモンスターリストを属性に持つオブジェクト
		var opdungeon = new opDungeon(100,enemyList)

		var defaultPhase = 1 // 通路にいるときをあらわす定数
		var battlePhase = 2 // 戦闘中をあらわす定数
		var forkPhase = 3 // 分かれ道にいるときを表す定数

		var phase = defaultPhase // ダンジョンでの状態を表すフラグ
		var listnum // モンスターのリスト番号
		var distance = 0 // ダンジョンを進んだ距離
		var choice_door // 選んだドアの番号

		// ダンジョンを進むためのボタン
		var buttonForward = new Label();
		buttonForward._element.setAttribute('class','button');
		dungeon.addChild(buttonForward);
		buttonForward.width = game.width/2;
		buttonForward.x = 0;
		buttonForward.y = game.height-80;
		buttonForward.text = '進む';
		buttonForward.backgroundColor = 'red';
		buttonForward.font = '4em"Ariar"';
		buttonForward.addEventListener('enterframe',function(){
			if(game.frame % game.fps == 0){ // 1秒ごとに実行
				dungeon.removeChild(symbol) // 敵シンボルや宝箱シンボルを消す
				switch(phase){
					case defaultPhase:
						switch(randomRange(0,2)){
							case 0:
								mesbox.text = "なにもみつからなかった"
								phase = defaultPhase // 通路フラグを立てる
								break
							case 1:
								listnum = randomRange(0,9)
								mesbox.text = ""+ opdungeon.enemyList[listnum].name + "があらわれた"
								symbol.text = '<img src="'+opdungeon.enemyList[listnum].id+'.png">'
								dungeon.addChild(symbol)
								buttonForward.text = 'たたかう';
								phase = battlePhase // 戦闘フラグを立てる
								break
							case 2:
								mesbox.text = "分かれ道だ"
								addDoor()
								dungeon.removeChild(buttonForward)
								phase = forkPhase // 分かれ道フラグを立てる
								break
						}
						break;
					case battlePhase:
						battle(enemyList[listnum]) // バトルして結果をメッセージとして表示
						buttonForward.text = '進む';
						phase = defaultPhase;
						break;
					case forkPhase:
						switch(randomRange(0,3)){
							case 1:
								mesbox.text = "なにもみつからなかった"
								removeDoor()
								phase = defaultPhase // 通路フラグを立てる
								break
							case 2:
								listnum = randomRange(0,9)
								mesbox.text = ""+ opdungeon.enemyList[listnum].name + "があらわれた"
								symbol.text = '<img src="'+opdungeon.enemyList[listnum].id+'.png">'
								dungeon.addChild(symbol)
								buttonForward.text = 'たたかう';
								removeDoor()
								phase = battlePhase // 戦闘フラグを立てる
								break
							case 3:
								mesbox.text = "たからものをみつけた"
								symbol.text = '<img src="treasure.png">'
								dungeon.addChild(symbol)
								removeDoor()
								phase = defaultPhase // 通路フラグを立てる
								break
						}
	//					dungeon.addChild(buttonForward)
	//					phase = defaultPhase;
						break
				}
				healthInfo.text =  player.health+"/"+player.healthmax; // HP情報を表示
				levelInfo.text = "Lv:"+player.level; // レベル情報を表示
				distance += 5 // ダンジョンの進行度を上げる
			}
			if(distance > opdungeon.size){
				alert("おたからを取り返されてしまった・・・")
				game.replaceScene(home)
			}
			if(player.health <= 0 ){
				alert("プレイヤーを返り討ちにした")
				game.replaceScene(home)
			}
		});
			/*
			dungeon.removeChild(symbol) // 敵シンボルや宝箱シンボルを消す
			switch(phase){
				case defaultPhase:
					switch(randomRange(0,2)){
						case 0:
							mesbox.text = "なにもみつからなかった"
							phase = defaultPhase // 通路フラグを立てる
							break
						case 1:
							listnum = randomRange(0,9)
							mesbox.text = ""+ opdungeon.enemyList[listnum].name + "があらわれた"
							symbol.text = '<img src="'+opdungeon.enemyList[listnum].id+'.png">'
							dungeon.addChild(symbol)
							buttonForward.text = 'たたかう';
							phase = battlePhase // 戦闘フラグを立てる
							break
						case 2:
							mesbox.text = "分かれ道だ"
							addDoor()
							dungeon.removeChild(buttonForward)
							phase = forkPhase // 分かれ道フラグを立てる
							break
					}
					break;
				case battlePhase:
					battle(enemyList[listnum]) // バトルして結果をメッセージとして表示
					buttonForward.text = '進む';
					phase = defaultPhase;
					break;
				case forkPhase:
					switch(choice_door){
						case 1:
							mesbox.text = "なにもみつからなかった"
							removeDoor()
							phase = defaultPhase // 通路フラグを立てる
							break
						case 2:
							listnum = randomRange(0,9)
							mesbox.text = ""+ opdungeon.enemyList[listnum].name + "があらわれた"
							symbol.text = '<img src="'+opdungeon.enemyList[listnum].id+'.png">'
							dungeon.addChild(symbol)
							buttonForward.text = 'たたかう';
							removeDoor()
							phase = battlePhase // 戦闘フラグを立てる
							break
						case 3:
							mesbox.text = "たからものをみつけた"
							symbol.text = '<img src="treasure.png">'
							dungeon.addChild(symbol)
							removeDoor()
							phase = defaultPhase // 通路フラグを立てる
							break
					}
//					dungeon.addChild(buttonForward)
//					phase = defaultPhase;
					break
			}
			healthInfo.text =  player.health+"/"+player.healthmax; // HP情報を表示
			levelInfo.text = "Lv:"+player.level; // レベル情報を表示
			distance += 5 // ダンジョンの進行度を上げる
			*/




		// ホーム画面に戻るためのボタン
		var buttonRetire = new Label();
		buttonRetire._element.setAttribute('class','button');
		dungeon.addChild(buttonRetire);
		buttonRetire.width = game.width/2;
		buttonRetire.x = buttonForward.width;
		buttonRetire.y = game.height-80;
		buttonRetire.text = 'リタイア';
		buttonRetire.backgroundColor = 'red';
		buttonRetire.font = '4em"Ariar"';
		buttonRetire.addEventListener('touchend',function(e){
			game.replaceScene(home);
		});

		// ダンジョンでのメッセージボックスとして利用するラベル
		var mesbox = new Label();
		mesbox._element.setAttribute('class','messagebox');
		dungeon.addChild(mesbox);
		mesbox.width = game.width;
		mesbox.height = 115;
		mesbox.x = 0;
		mesbox.y = game.height-200;
		mesbox.text = "ダンジョンの入り口だ";
		mesbox.font = '2em"Ariar"';

		// ダンジョン画面の画像
		var view = new Sprite(game.width, 200);
		view.image = game.assets['mainview.png']
		dungeon.addChild(view);
		view.x = 0
		view.y = 100

		// 戦闘時に表示されるモンスターの画像
		var enemyImg = new Sprite(64,64)
		dungeon.addChild(enemyImg)
		enemyImg.x = game.width - enemyImg.width/2
		enemyImg.y = 200;

		// プレイヤーの体力情報を表示するためのラベル
		var healthInfo = new Label();
		dungeon.addChild(healthInfo);
		healthInfo.x = 10;
		healthInfo.y = 0;
		healthInfo.font = '2em"Ariar"';
		healthInfo.text = player.health+"/"+player.healthmax;

		// プレイヤーのレベル情報を表示するためのラベル
		var levelInfo = new Label();
		dungeon.addChild(levelInfo);
		levelInfo.x = 10;
		levelInfo.y = 20;
		levelInfo.font = '2em"Ariar"';
		levelInfo.text = "Lv:"+player.level;

		// 体力をあらわすバー
		var healthBar = new Sprite(130,15)
		var surface1 = new Surface(130,15)
		healthBar.image = surface1
		dungeon.addChild(healthBar)
		healthBar.x = 100
		healthBar.y = 7
		healthBar.addEventListener('enterframe',function(){
			var c = surface1.context
			c.beginPath()
			c.fillStyle = "rgb(255,0,0)"; //赤色
			c.fillRect(0,0,healthBar.width, healthBar.height) // 下地の色
			c.fillStyle = "rgb(0,255,0)"; //緑色
			c.fillRect(0,0, parseInt((player.health / player.healthmax) * healthBar.width)  , healthBar.height) // 体力に応じて領域を塗りつぶす
			c.strokeRect(0,0,healthBar.width, healthBar.height) // 枠をつける
			c.closePath()
		})

		// 経験値をあらわすバー
		var expBar = new Sprite(130,15)
		var surface2 = new Surface(130,15)
		expBar.image = surface2
		dungeon.addChild(expBar)
		expBar.x = 100
		expBar.y = 28
		expBar.addEventListener('enterframe',function(){
			var c = surface2.context
			c.beginPath()
			c.fillStyle = "rgb(255,255,255)"; //白色
			c.fillRect(0,0,healthBar.width, healthBar.height) // 下地の色
			c.fillStyle = "rgb(255,255,0)"; //黄色
			c.fillRect(0,0, parseInt((player.exp / player.nextlevel) * expBar.width)  , expBar.height) // 体力に応じて領域を塗りつぶす
			c.strokeRect(0,0,expBar.width, expBar.height) // 枠をつける
			c.closePath()
		})

		// ダンジョンの進行度をあらわすバー
		var distanceBar = new Sprite(130,15)
		var surface3 = new Surface(130,15)
		distanceBar.image = surface3
		dungeon.addChild(distanceBar)
		distanceBar.x = 400
		distanceBar.y = 15
		distanceBar.addEventListener('enterframe',function(){
			var c = surface3.context
			c.beginPath()
			c.fillStyle = "rgb(255,255,255)"; //白色
			c.fillRect(0,0,healthBar.width, healthBar.height) // 下地の色
			c.fillStyle = "rgb(0,0,255)"; //黄色
			c.fillRect(0,0, parseInt((distance / opdungeon.size) * distanceBar.width)  , distanceBar.height) // 体力に応じて領域を塗りつぶす
			c.strokeRect(0,0,distanceBar.width, distanceBar.height) // 枠をつける
			c.closePath()
		})

		// 分かれ道画面のバックグラウンドを設定
		var background = new Sprite(640,200)
		background.image = game.assets['background.png']
		background.x = 0
		background.y = 100

		// １つめのドアを作る
		var door1 = new Sprite(180,200)
		door1.image = game.assets['door.png']
		door1.x = 20
		door1.y = 100
		door1.addEventListener('touchend',function(e){
			mesbox.text = "あしあとがある"
			choice_door = 1
			dungeon.addChild(buttonForward)
		})

		
		// ２つめのドアを作る
		var door2 = new Sprite(180,200)
		door2.image = game.assets['door.png']
		door2.x = 230
		door2.y = 100
		door2.addEventListener('touchend',function(e){
			mesbox.text = "あやしい気配がする"
			choice_door = 2
			dungeon.addChild(buttonForward)
		})


		// ３つめのドアを作る
		var door3 = new Sprite(180,200)
		door3.image = game.assets['door.png']
		door3.x = 440
		door3.y = 100
		door3.addEventListener('touchend',function(e){
			mesbox.text = "なにかが光っている"
			choice_door = 3
			dungeon.addChild(buttonForward)
		})

		// ダンジョン進行画面に表示されるアイコン（敵シンボルやお宝のシンボルとして使う汎用的な画像）
		var symbol = new Label()
		symbol.x = 280
		symbol.y = 150


		// 分かれ道の画面の画像を消去する関数
		function removeDoor(){
			dungeon.removeChild(door1)
			dungeon.removeChild(door2)
			dungeon.removeChild(door3)
			dungeon.removeChild(background)
			dungeon.addChild(buttonForward)
		}

		// 分かれ道の画面に画像を表示させる関数
		function addDoor(){
			dungeon.addChild(background)
			dungeon.addChild(door1)
			dungeon.addChild(door2)
			dungeon.addChild(door3)
		}

		// ダンジョンを初期化する関数
		function initDungeon()
		{
			player.health = player.healthmax
			mesbox.text = "ダンジョンの入り口だ"
			distance = 0
			removeDoor()
			pahse = defaultPhase
		}

		// enemyとバトルした結果をメッセージボックスに出力する関数
		function battle(enemy)
		{
			var percent = player.offence/(player.offence + enemy.defence) // 自分の勝率
			var damege  = enemy.offence * enemy.offence/(enemy.offence + player.defence) // 戦闘で受けるダメージ

			if(Math.random() < percent){ // 勝利した場合
				mesbox.text = ""+ enemy.name + "をたおした<br>"+ enemy.weight +"の経験地を獲得<br>"+ parseInt(damege/2) + "ダメージを受けた"
				player.health -= parseInt(damege/2) // 勝利したときはダメージ半減
				player.exp += enemy.weight
			}
			else{ // 負けた場合
				mesbox.text = "やられた<br>"+ parseInt(damege) + "ダメージを受けた"
				player.health -= parseInt(damege) // 負けたときは通常ダメージ
			}

			if(player.exp >= player.nextlevel){ // レベルアップしたとき
				player.levelUp() // レベルアップ関数を呼ぶ
			}
		}
	}
	game.start(); // ゲームを開始する
}
		/************************************************************/

// min以上max以下の数値を返す関数
function randomRange(min,max)
{
	return Math.floor( Math.random() * (max - min +1) + min)
}

// プレイヤーの情報を返すオブジェクト
function Player(name,offence,defence,health)
{
	this.name = name;
	this.offence = offence;
	this.defence = defence;
	this.money = 0;
	this.health = this.healthmax = health;
	this.exp = 0;
	this.level = 1;
	this.nextlevel = 10
	this.getNextLevel = function(){
		var next = [10,30,60,100,150,230,350,500,700,950,1200,1500]
		return next[this.level-1]
	}
	this.levelUp = function(){
		this.level ++
		this.nextlevel = this.getNextLevel()
		this.offence += 3
		this.defence += 3
		this.health += 5
		this.healthmax += 5
	}
}

// モンスターの情報を返すオブジェクト
function Enemy(name,offence,defence, id, weight)
{
	this.name = name;
	this.offence = offence;
	this.defence = defence;
	this.id = id;
	this.weight = weight;
}

// 進行しているダンジョンの情報を返すオブジェクト
function opDungeon(size, enemyList)
{
	this.size = size
	this.enemyList = enemyList
}

// フリックするためのリストを囲んだdiv要素を返す
function makeFlickableList(id, list)
{
	var tag = '<div id="'+id+'" class="flickable"><ul>'
	for(i = 0 ; i<list.length ; i++){
		tag += '<li><div class="block">'+ getPermeate() +'</div></li>' // リストを1項目ずつ作成
	}
	tag += '</ul><div style="clear:both;"></div></div>'

	return tag

	// フリックリストの項目を返す
	function getPermeate()
	{
		return '<div>'+ list[i].name +'<br>攻撃力：'+ list[i].offence +'<br>守備力：'+ list[i].defence +'<br><img src="'+ list[i].id +'.png"></div>'
	}
}

