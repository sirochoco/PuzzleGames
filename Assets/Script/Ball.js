
var pathPercent:float=0.0f;//パスに対するボールの位置をパーセントにしたもの
var pathLeng:float;//パスの長さ
var ballPos:float;//ボールの直径を1とした時のパス上での並び（位置）
var ballType:int;
var ballSpeed:float;
var onPath:boolean;//ボールがパス上に有るかというフラグ
var ajustPos:float;

var cannon:GameObject;

private var manager:GameObject;

function Start () {
	manager=GameObject.Find("BallManager");
//砲台を取得
	cannon=GameObject.Find("Cannon");
	//onPath=false;
}
//BallManagerからのSendMessage
function InitType(type){
	ballType=type;
}
//BallManagerからのSendMessage
function InitSpeed(speed){
	ballSpeed=speed;
}
//BallManagerからのSendMessage
function InitOnPath(){
onPath=true;
pathPercent=0;
}
//BallManagerからのSendMessage
function PutOnPath(p){
onPath=true;
pathPercent=p;
}
//BallManagerからのSendMessage
function AjustPos(s){
ajustPos=s;
}

function Update () {
//ボールがパス上に有るならば
	if(onPath){
	//pathPercent/100の位置にボールを置く
		iTween.PutOnPath(gameObject,iTweenPath.GetPath("RailPath"),pathPercent/100);
		//パスの長さを取得
		pathLeng=iTween.PathLength(iTweenPath.GetPath("RailPath"));
		//pathPercentに移動値を追加
		pathPercent+=ballSpeed+ajustPos;
		//パス上での並びを取得
		ballPos=pathLeng*pathPercent/100;
		//パスの終点までいったらボールを消去する
		if(100<pathPercent){
			EraseBall();
		}
	}
}

function OnTriggerEnter(colliderInfo:Collider){
	if(colliderInfo.tag=="Balls"){
		//onPath=true;
		//pathPercent=colliderInfo.pathPercent;
		//print("Hit");
	
	//cannon.SendMessage("InitBall");
	
	//manager.SendMessage("TryAddBall");
	//BallManagerにSendMessageする
		//manager.SendMessage("TryAddBall",pathPercent);
	}
}
//BallManagerからのSendMessage
function EraseBall(){
	print("Destroy");
	Destroy(gameObject);
}