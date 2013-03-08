#pragma strict
var enemy:GameObject;

class Monsters{
	var name:String;
	var id:int;
	var hp:int;
}

var testArray:Array;
function Start () {

testArray=new Array();


//var position=Vector3(0,0,0);

//	for(var i:int=0;i<10;i++){
//		monster=Instantiate(enemy,Vector3(0,0,0),Quaternion.identity);
//		monster.GetComponent.<Enemy>().index=i;
//		monster.GetComponent.<Enemy>().hp=i*100;
//	}
}

function Update () {
	if(Input.GetButtonDown("Fire1")){

	}
}

function addMonster(name:String,id:int,hp:int){
		
}