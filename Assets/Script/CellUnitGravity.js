@script RequireComponent(WallGenerator);

var player : GameObject;
var cell : int = 64;//セルのサイズ
var moveTime : float = 0;//アニメーション完了までの秒数
var px : int = 1;//移動先
var py : int = 1;

private var state : String = "stop";
private var timer : float = 0;
private var vx : int = 0;//移動量
private var vy : int = 0;

private var wg:WallGenerator;

function Start () {
//位置初期化
	iTween.MoveTo(player, {"x":(px+0)*cell, "y":(py+0)*cell, "time":0});	
	wg=GetComponent(WallGenerator)as WallGenerator;

}

function Update () {
	//キャラクター静止状態
	if (state == "stop") {
		if(wg.wallArray[(py-1)][px]==0){
			py-=1;
			state="move";
			timer=moveTime;
			
		}else{	
			//移動方向の設定
			vx = vy = 0;
			if (Input.GetKey("left")) vx = -1;		
			else if (Input.GetKey("right")) vx = 1;		
			//else if (Input.GetKey("down")) vy = -1;		
			//else if (Input.GetKey("up")) vy = 1;
			
			//キー入力された場合の処理
			if (vx != 0 || vy != 0) {
				if(wg.wallArray[(py+vy)][px+vx]==0){
					px += vx;
					py += vy;
					state = "move";
					timer = moveTime;
				}
			}
		}
}
	
	//キャラクターが移動中の状態
	if (state == "move") {
		//タイマーを減少させる
		timer -= Time.deltaTime;
		iTween.MoveTo(player, {"x":(px+0)*cell, "y":(py+0)*cell, "time":moveTime+0.1});
		
		//移動値xセルサイズで移動する
		//iTween.MoveBy(player,{"x":vx*cell,"y":vy*cell,"time":moveTime+0.1});
		
		//タイマーが0以下になったらステータス変更
		if (timer <= 0.0) {
			vx = vy = 0;
			state = "stop";
		}	
	}

	Debug.Log(state);
	Debug.Log(px+","+py);
}