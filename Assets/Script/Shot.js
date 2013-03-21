#pragma strict

private var screenPoint:Vector3;
private var offset:Vector3;
private var originalPoint:Vector3;
private var originalPosition:Vector3;

private var currentScreenPoint:Vector3;
private var currentPosition:Vector3;
private var currentPoint:Vector3;

private var shootVector:Vector3;

private var moving:boolean;
var ballSpeed:float;

function Start () {
	
}

function Update () {


}

function OnMouseDown(){
	originalPosition=this.transform.position;
	//マウスクリックの座標を取得
	originalPoint=Vector3(Input.mousePosition.x,Input.mousePosition.y,screenPoint.z);
	//オブジェクトの座標をワールド座標系に変換
	this.screenPoint=Camera.main.WorldToScreenPoint(transform.position);
	//オブジェクトの座標とマウスクリックのワールド座標との差
	this.offset=transform.position-Camera.main.ScreenToWorldPoint(originalPoint);
	//print("screenPoint"+screenPoint+"offset"+offset);
}

function OnMouseDrag(){
	//マウスの座標を取得
	currentPoint=Vector3(Input.mousePosition.x,Input.mousePosition.y,screenPoint.z);
	//ワールド座標系に変換
	currentScreenPoint=currentPoint;
	//マウスのワールド座標系をオブジェクトの座標に変換
	currentPosition=Camera.main.ScreenToWorldPoint(currentScreenPoint)+this.offset;
	transform.position=currentPosition;
	shootVector=originalPoint-currentPoint;
	//shootVector=Vector3(Mathf.Clamp(transform.position.x,-20,20),Mathf.Clamp(transform.position.y,-20,20),-10);
//transform.position=Vector3(Mathf.Clamp(transform.position.x,-2,2),Mathf.Clamp(transform.position.y,-2,2),0);
print(shootVector);
}

function OnMouseUp(){	
		
		//this.rigidbody.useGravity=true;	
		this.rigidbody.velocity=shootVector*ballSpeed;	
		//this.rigidbody.AddForce(shootVector*ballSpeed,ForceMode.Impulse);
}

function OnGUI(){
	if(GUI.Button(Rect(10,10,100,40),"Reset")){
		
	this.transform.position=originalPosition;
	this.rigidbody.velocity=Vector3.zero;
	//this.rigidbody.useGravity=false;
}
}