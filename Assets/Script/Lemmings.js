var speed:float=1.0;
private var plusDir:boolean;

function Start () {
plusDir=true;
}

function Update () {
//時間による移動

if(plusDir){
	transform.Translate(new Vector2(speed,0)*Time.deltaTime);
	}else{	
	transform.Translate(new Vector2(-1*speed,0)*Time.deltaTime);
	}
}

function OnCollisionEnter(collisionInfo:Collision){
	if(collisionInfo.gameObject.tag=="SideFloor"){
	
	//移動方向を反転
	plusDir=!plusDir;
	//Debug.Log("移動方向"+plusDir);
	}

}
