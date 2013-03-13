#pragma strict

var pathPercent:float=0.0f;//パスに対するボールの位置をパーセントにしたもの
var pathLeng:float;//パスの長さ
var ballPos:int;//ボールの直径を1とした時のパス上での並び（位置）
var ballType:int;
var ballSpeed:float;

private var manager:GameObject;

function Start () {
manager=GameObject.Find("BallManager");
//iTween.MoveTo(gameObject,iTween.Hash("path",iTweenPath.GetPath("RailPath"),"time",10,"EaseType",iTween.EaseType.easeOutSine));

}

function Update () {
	iTween.PutOnPath(gameObject,iTweenPath.GetPath("RailPath"),pathPercent/100);
	pathLeng=iTween.PathLength(iTweenPath.GetPath("RailPath"));
	
	pathPercent+=ballSpeed;
	ballPos=pathLeng*pathPercent/100;
	
	if(100<pathPercent){
		EraseBall();
	}

}

function InitType(type){
	ballType=type;
}

function InitSpeed(speed){
	ballSpeed=speed;
}

function OnTriggerEnter(colliderInfo:Collider){
	if(colliderInfo.tag=="Block"){
	//BallManagerにSendMessageする
		//manager.SendMessage("HitBall","index");
	}
}
//BallManagerからのSendMessage
function EraseBall(){
	print("Destroy");
	Destroy(gameObject);
}