#pragma strict

var type:int;
var index:int;
var pathPercent:float=0.0f;//パスに対するボールの位置をパーセントにしたもの
var pathLeng:float;//パスの長さ
var pos:int;//ボールの直径を1とした時のパス上での並び（位置）
private var manager:GameObject;

function Start () {
manager=GameObject.Find("BallManager");

//iTween.MoveTo(gameObject,iTween.Hash("path",iTweenPath.GetPath("RailPath"),"time",10,"EaseType",iTween.EaseType.easeOutSine));

}

function Update () {
		iTween.PutOnPath(gameObject,iTweenPath.GetPath("RailPath"),pathPercent/100);
		pathLeng=iTween.PathLength(iTweenPath.GetPath("RailPath"));
		
		pathPercent+=0.05f;
		pos=pathLeng*pathPercent/100;
		//print(pos);
}

function OnTriggerEnter(colliderInfo:Collider){
	if(colliderInfo.tag=="Block"){
	//BallManagerにSendMessageする
		manager.SendMessage("HitBall","index");
	}
}
//BallManagerからのSendMessage
function EraseBall(){
	print("Destroy");
	Destroy(gameObject);
}