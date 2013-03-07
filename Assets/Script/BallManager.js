#pragma strict
//初期設定
var BallOnRailCount:int=3;//最大数
var BallOnRailType:int;//種類数
var BallOnRaileErase:int=3;//いくつ揃ったら消すか

var ballPrefabs:GameObject[];
var ballArray:Array;//ボールの配列
var index:int;//ballArrayのインデックス
var type:int;//生成されるボールの種類
private var ball:GameObject;//インスタンス生成されたボール
private var startPosition:Vector3;//パスの出発点の座標

var pathPercent:float=0.0f;

function Start () {
BallOnRailType=ballPrefabs.length;
//ボールの配列を作成する
ballArray=new Array();

//パスの開始点の座標を取得する
startPosition=GameObject.Find("Rail").GetComponent.<iTweenPath>().nodes[0];
}

function Update () {
	if(Input.GetButtonDown("Fire1")){
		type=Random.Range(0,BallOnRailType);
		AddBall(type);
	}
	
	iTween.PutOnPath(ball,iTweenPath.GetPath("RailPath"),pathPercent/100);
	var ballPoint:Vector3=iTween.PointOnPath(iTweenPath.GetPath("RailPath"),pathPercent/100);
	pathPercent+=0.05f;
	print(ballPoint);	
}

function AddBall(type){

	if(ballArray.length<BallOnRailCount){
		//ballインスタンスをパスの出発点に生成
		ball=Instantiate(ballPrefabs[type],startPosition,Quaternion.identity);
		ballArray.Splice(index,0,ball);
		//ballArray.Push(ball);		

	}
	//iTween.MoveTo(ball,iTween.Hash("path",movePath,"time",10,"EaseType",iTween.EaseType.easeOutSine));
	//iTween.MoveTo(ball,iTween.Hash("path",iTweenPath.GetPath("RailPath"),"time",10,"EaseType",iTween.EaseType.easeOutSine));
}
//衝突したときの処理
function HitBall(){
//ballのインデックスを取得
	for(var i=0;i<ballArray.length;i++){
	ballArray[i];
	index=i;
	}
	print(index);
	if(index==3){
	//指定したインデックスのボールを配列から削除する
	ballArray.RemoveAt(index);
	//消去のSendMessage
	ball.SendMessage("EraseBall");
	}
}
