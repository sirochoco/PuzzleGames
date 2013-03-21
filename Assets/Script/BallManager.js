
//初期設定
var BallOnRailCount:int;//最大数
var BallOnRaileErase:int;//いくつ揃ったら消すか

var speed:float;
var ballPrefabs:GameObject[];//ボールプレファブを格納するビルトイン配列
var ballBuiltin:GameObject[];//パス上のボールを格納するビルトイン配列
var ballArray:Array;//ボールのJS配列（変換用）
private var ball:GameObject;//ボール単体のインスタンス
private var bulletBall:GameObject;//ボール単体のインスタンス
var type:int;//ボールの種類
//var pos:int;//ボールの直径を1とした時のパス上での並び（位置）
var type0:int;//パス上のボール配列が0の時の値
var pos0:float;//パス上のボール配列が0の時の値

var cannon:GameObject;
private var ballReady:boolean;//発射可能かのフラグ
var spawnSpeed:float;

private var startPosition:Vector3;//パスの出発点の座標

function Start () {
	//ビルトイン配列を作成
	ballBuiltin=new GameObject[0];
	//パスの開始点の座標を取得する
	startPosition=GameObject.Find("Rail").GetComponent.<iTweenPath>().nodes[0];
	AddBall();
	//砲台を取得
	cannon=GameObject.Find("Cannon");
	SetBulletBall();
}

function Update () {
var i:int;
var distance:int=1;
	//スタートから一番近いボールの種類を取得（ビルトイン配列要素からは直接GetComponentできるのね）
	type0=ballBuiltin[0].GetComponent.<Ball>().ballType;
	//スタートから一番近いボールまでの位置を取得
	pos0=ballBuiltin[0].GetComponent.<Ball>().ballPos;
	//ボールが最大数に達していない、かつパス上のボールの数が０か、スタートから一番近いボールまでの距離がボール一個以上ならば、新しいボールをスタートに生成する
	if ((ballBuiltin.length==0||pos0>=distance) && ballBuiltin.length<BallOnRailCount){
	//種類数からランダムでボールの種類を決める
		type=Random.Range(0,ballPrefabs.length);	
		//同じ種類のボールを規定数以上連続させないための処理
			if(ballBuiltin.length>=BallOnRaileErase-1){		
			//スタートに同じ種類のボールが規定数-1連続しているか調べる
						
			for(i=1;i<BallOnRaileErase-1;i++){							
				//スタートから一番近いボールと２番目のボールの種類が異なっていればストップ
				if(ballBuiltin[i].GetComponent.<Ball>().ballType != type0) {
					break;
				}
			}
			//連続している場合、異なる種類のボールを生成する
				//iが2ということはストップしなかったということ
				if(i==BallOnRaileErase-1){
					while(type==type0){
						type=Random.Range(0,ballPrefabs.length);
					}
				}
		}
			AddBall();
	}
	
	// ボールの間隔を調整する
	for(i=1;i<ballBuiltin.Length;i++){
	
	ballBuiltin[i].SendMessage("SetId",i);
		//あるボールと、１つ前の（スタートに近い）ボールについて、間の距離を調べる
		
		var iPos1:float=ballBuiltin[i].GetComponent(Ball).ballPos;
		var iPos0:float=ballBuiltin[i-1].GetComponent(Ball).ballPos;

		//
		var iP1:float=ballBuiltin[i].GetComponent(Ball).pathPercent;
		var iP0:float=ballBuiltin[i-1].GetComponent(Ball).pathPercent;
		var d:float=iPos1-iPos0;
		var p:float=iP1-iP0;

		//距離がボール１個未満ならば、ボール１個の距離まで、ボールを少しづつ遠ざける
		if(d<distance){
			var s:float=(distance-d)*p/100;
			ballBuiltin[i].SendMessage("AjustPos",s);
			//print("Near"+"i"+i+"d"+(distance-d)+"p"+p);
		}else
		//距離がボール１個より大きければ、ボール１個の距離まで、ボールを少しづつ近づける
		if(d>distance){
			s=(distance-d)*p/100;
			ballBuiltin[i].SendMessage("AjustPos",s);
			//print("Far"+"i"+i+"d"+(distance-d)+"p"+p);
		}		
	}
	
	
	//print("bulletBall"+bulletBall.transform.rotation);
	//print("cannon"+cannon.transform.rotation);
		
		//発射可能ならば
	if(ballReady){
		if(Input.GetButtonDown("Fire1")){
		
		//右方向へ加速度を設定する
		//Translateだと連続移動しないのな
			bulletBall.rigidbody.velocity=transform.forward*spawnSpeed;
			ballReady=false;
		}
	}	

//パス上で規定以上のボールが並んだら、ボールを消す
	for(i=0;i<ballBuiltin.length;i++){
	//同じ種類のボールが規定数以上並んでいるかを調べる
		var j:int;
		var iType:int=ballBuiltin[i].GetComponent(Ball).ballType;
		
		for(j=i+1;
			j<ballBuiltin.length
			//同じ種類のボールである
			&& iType==ballBuiltin[j].GetComponent(Ball).ballType
			//ボール間の距離がボール一個分である
			&& Mathf.Round(ballBuiltin[j].GetComponent(Ball).ballPos)==Mathf.Round(ballBuiltin[j-1].GetComponent(Ball).ballPos)+1
			;j++){			
				//print("SameType"+"i"+i+"j"+j);
				}	
				//規定数以上並んでいたら、ボールを消す			
					if (j-i>=BallOnRaileErase){
					for(;i<j;i++){		
						//print("EraseBall"+i);
						ballBuiltin[i].SendMessage("EraseBall");
						
						ballArray=new Array(ballBuiltin);
						ballArray.RemoveAt(i);
						ballBuiltin=ballArray.ToBuiltin(GameObject);
						}			
					}
			}

}

for(i=0;i<ballBuiltin.length;i++){
var pathP=ballBuiltin[i].GetComponent(Ball).pathPercent;
	if(pathP>100){
		ballBuiltin[i].SendMessage("EraseBall");
								
		ballArray=new Array(ballBuiltin);
		ballArray.RemoveAt(i);
		ballBuiltin=ballArray.ToBuiltin(GameObject);
	}
}

function SetBulletBall(){
	//ボールインスタンス生成
	bulletBall=Instantiate(ballPrefabs[type],Vector3(0,0,0),Quaternion.identity);
	
	//スピードの値をボールに渡す
	bulletBall.SendMessage("InitSpeed",speed);
	bulletBall.transform.parent=cannon.transform;
	//bulletBall.transform.rotation=cannon.transform.rotation;
	ballReady=true;
}

function TryAddBall(hitId){
	print("TryAddBall"+hitId);
	var i:int=hitId;
		pi1=ballBuiltin[i].GetComponent(Ball).pathPercent;
		pi0=ballBuiltin[i-1].GetComponent(Ball).pathPercent;
		var p=(pi1-pi0)/2+pi0;
		bulletBall.SendMessage("SetId",i);
		//フラグの設定を渡す
		bulletBall.SendMessage("PutOnPath",p);		
		ballArray=new Array(ballBuiltin);
		ballArray.Splice(i,0,ball);
		ballBuiltin=ballArray.ToBuiltin(GameObject);
		ballReady=true;
		//ballBuiltin[i].SendMessage("AjustPos",s);

}

function OnGUI(){
	if(GUI.Button(Rect(10,10,100,40),"BallHit")){
	var i:int=5;
		pi1=ballBuiltin[i].GetComponent(Ball).pathPercent;
		pi0=ballBuiltin[i-1].GetComponent(Ball).pathPercent;
		var p=(pi1-pi0)/2+pi0;
		
		ball=Instantiate(ballPrefabs[type],startPosition,Quaternion.identity);
		//種類の値をボールに渡す
		ball.SendMessage("InitType",type);
		//スピードの値をボールに渡す
		ball.SendMessage("InitSpeed",speed);
		//フラグの設定を渡す
		ball.SendMessage("PutOnPath",p);
		//ビルトイン配列をJS配列に変換
		ballArray=new Array(ballBuiltin);
		ballArray.Splice(i,0,ball);
		ballBuiltin=ballArray.ToBuiltin(GameObject);
		//print(ballBuiltin[i].GetComponent(Ball).ballId);
	}
}

function AddBall(){
	//ビルトイン配列をJS配列に変換
	ballArray=new Array(ballBuiltin);	
	//ボールインスタンス生成
	ball=Instantiate(ballPrefabs[type],startPosition,Quaternion.identity);
	
	//種類の値をボールに渡す
	ball.SendMessage("InitType",type);
	//スピードの値をボールに渡す
	ball.SendMessage("InitSpeed",speed);
	//フラグの設定を渡す
	ball.SendMessage("InitOnPath");
	//	配列の先頭（パス上の並びの末尾）に追加	
	ballArray.Unshift(ball);
	//ballArray.Push(ball);
	//ビルトイン配列に再変換
	ballBuiltin=ballArray.ToBuiltin(GameObject);		
}



