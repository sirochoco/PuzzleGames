#pragma strict

private var Manager:GameObject;
function Start () {
Manager=GameObject.Find("BallManager");
}

function Update () {

}

function OnTriggerEnter(colliderInfo:Collider){

	if(colliderInfo.tag=="Block"){
	//BallManagerにSendMessageする
		Manager.SendMessage("HitBall");
	}
}
//BallManagerからのSendMessage
function EraseBall(){
	//print("Destroy");
	Destroy(gameObject);
}