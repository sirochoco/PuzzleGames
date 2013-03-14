private var manager:GameObject;
private var fireBall:GameObject[];
private var position:Vector3;

function Start () {
manager=GameObject.Find("BallManager");
fireBall=manager.GetComponent.<BallManager>().ballPrefabs;
}

function Update () {
transform.rotation*=Quaternion.AngleAxis(Input.GetAxis("Horizontal")*180.0*Time.deltaTime,Vector3(0,0,1));
	//砲台の座標を取得
	//var firePosition=cannon.GetComponent.<Cannon>().position;
	
	position=Vector3(transform.position.x,transform.position.y,transform.position.z);
	//砲台の回転値（四元数）を取得
	var q=transform.rotation;
	//オイラー角に変換する
	var Axis=q.eulerAngles.y;

}

function InitBall(){
var type=Random.Range(0,fireBall.length);
ball=Instantiate(fireBall[type],position,Quaternion.identity);
//砲台の子どもに入れる
}
