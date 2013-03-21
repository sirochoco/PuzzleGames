#pragma strict

var foo:GameObject[];
var myArray:Array;

function Start () {
myArray=new Array("Hello","World");
}

function Update () {

}

function OnGUI(){
//配列の末尾に要素を追加
	if(GUI.Button(Rect(10,10,100,50),"Push")){
		myArray.Push("last");

			print(myArray+"配列の数"+myArray.length);
		
	}
	//配列の末尾の要素を削除
	if(GUI.Button(Rect(120,10,100,50),"Pop")){
		myArray.Pop();
		
		print(myArray+"配列の数"+myArray.length);
	}
//配列の指定された要素を削除
	if(GUI.Button(Rect(230,10,100,50),"RemoveAt")){
		myArray.RemoveAt(1);
		
		print(myArray+"配列の数"+myArray.length);
	}
	//配列の指定された要素を入れ替える
	if(GUI.Button(Rect(340,10,100,50),"Splice")){
	//要素の指定、置換する数（０の場合は置換しない）、置換する内容
		myArray.Splice(1,0,"hoge");
		
		print(myArray+"配列の数"+myArray.length+myArray);
	}
	
}