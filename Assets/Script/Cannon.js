private var manager:GameObject;
private var bullet:GameObject[];//ボールプレファブを格納するビルトイン配列
private var position:Vector3;//砲台の座標
private var bulletBall:GameObject;//ボール単体のインスタンス
private var ballReady:boolean;//発射可能かのフラグ
var spawnSpeed:float;
var speed:float;
var p:float;

function Start () {
manager=GameObject.Find("BallManager");
//BallManagerのビルトイン配列を取得
//bullet=manager.GetComponent(BallManager).ballPrefabs;
//InitBall();
}

function Update () {
//水平方向の入力で回転させる
transform.rotation*=Quaternion.AngleAxis(Input.GetAxis("Horizontal")*180.0*Time.deltaTime,Vector3(0,0,1));
	//砲台の座標を取得	
	position=Vector3(transform.position.x,transform.position.y,transform.position.z);
	//砲台の回転値（四元数）を取得
	var q=transform.rotation;
	//オイラー角に変換する
	var Axis=q.eulerAngles.y;
	
//	//発射可能ならば
//	if(ballReady){
//		if(Input.GetButtonDown("Fire1")){
//		//右方向へ加速度を設定する
//		//Translateだと連続移動しないのな
//			bulletBall.rigidbody.velocity=transform.right*spawnSpeed;
//			ballReady=false;
//		}
//	}
}

//function InitBall(){
//manager.SendMessage("SetBulletBall");
//	
//}
