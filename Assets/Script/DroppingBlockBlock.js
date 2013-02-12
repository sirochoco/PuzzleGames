@script RequireComponent(DroppingBlockStage);

var blockPrefab:GameObject;
var blockArray:Array;//ブロックの配列
var cell : int = 64;//セルのサイズ
var cellXSize:int=4;
var cellYSize:int=4;
var moveTime : float = 0;//アニメーション完了までの秒数
var px : int = 5;//移動先
var py : int = 9;

private var vec:Vector3;
private var i:int;
private var j:int;
private var k:int;

private var blocks:GameObject[];//ブロックのインスタンスを格納する配列型GameObject
private var currentBlock:GameObject;//親にするGameObject
private var state : String = "stop";
private var timer : float = 0;//state移行までの秒数
private var dropTime : float = 0;//落下までの秒数
private var vx : int = 0;//移動量
private var vy : int = 0;

private var dbc:DroppingBlockStage;

function Start () {

//空のGameObjectを生成
currentBlock=new GameObject("currentBlock");

//ブロック生成
blockArray=[
		[0,0,0,0],
		[0,1,1,0],
		[0,1,1,0],
		[0,0,0,0]
	];
	
	for(i=0;i<cellYSize;i++){
		for(j=0;j<cellXSize;j++){
			if(blockArray[i][j]==1){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(blockPrefab,vec,transform.rotation);
			}
		}
	}
	//Blockタグを探して格納
	blocks=GameObject.FindGameObjectsWithTag("Block");	
	//Debug.Log(blocks.Length);
	
	//currentBlockの子供にする
	for(k=0;k<blocks.Length;k++){
		blocks[k].transform.parent=currentBlock.transform;
	}
	//初期位置へ
	iTween.MoveTo(currentBlock, {"x":px*cell, "y":py*cell, "time":0});
	
	dbc=GetComponent(DroppingBlockStage)as DroppingBlockStage;
	
}

function Update () {

		//落下タイマーの更新
		dropTime++;
		
		//レバーを下に入力するか、落下タイマーが一定値に達したら、ブロックを落下させる
if (dropTime>=120) {
	//移動方向の設定
				if(Input.GetKey("left"))vx=-1;
			else if (Input.GetKey("right")) vx = 1;
			
				//キー入力された場合の処理
				if(vx!=0||vy!=0){
					if(dbc.wallArray[py+vy][px+vx]==0){
						px += vx;
						py += vy;
							
	if(state == "stop"){	
		if(dbc.wallArray[py-1][px]==0){
			py-=1;
			state="move";
			timer=moveTime;
			}
		}
	}
	}
}

if(state=="move"){
	timer -= Time.deltaTime;
	iTween.MoveTo(currentBlock, {"x":px*cell, "y":py*cell, "time":moveTime+0.1});
	
			//タイマーが0以下になったらステータス変更
		if (timer <= 0.0) {
			vx = vy = 0;
			state = "stop";
			}
}
		

Debug.Log(px+","+py);
//入力状態での処理
	//if(state == "stop"){	
		
		//if (Input.GetKey("down")) vy = -1;
		//落下タイマーの更新
		//dropTime++;
		
		//レバーを下に入力するか、落下タイマーが一定値に達したら、ブロックを落下させる
		//if (dropTime==120) {
				//state = "move";
				//timer = moveTime;
				//Debug.Log("dropTime"+dropTime);
			//}
	//}
	
		//移動状態での処理
	//if(state=="move"){
	
		//移動方向の設定
		//vx= 0;
		//vy=-1;
		//if (Input.GetKey("left")) vx = -1;		
		//else if (Input.GetKey("right")) vx = 1;	
				//px += vx;
				//py += vy;	
		
	
			//タイマーを減少させる
		//timer -= Time.deltaTime;
		
		//iTween.MoveTo(currentBlock, {"x":px*cell, "y":py*cell, "time":moveTime+0.1});
		
		//移動値xセルサイズで移動する
		//iTween.MoveBy(player,{"x":vx*cell,"y":vy*cell,"time":moveTime+0.1});
		
		//タイマーが0以下になったらステータス変更
		//if (timer <= 0.0) {
			//vx = vy = 0;
			//state = "move";
		//}
		//Debug.Log("timer"+timer);
		//Debug.Log(state);
		//}
}