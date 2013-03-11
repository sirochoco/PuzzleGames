#pragma strict
var enemy:GameObject;
//コンストラクタ
class Monsters{
	var gameObj:GameObject;
	var name:String;
	var id:int;
	var hp:int;
	function Monsters(obj:GameObject,n:String,i:int,h:int){
		gameObj=obj;
		name=n;
		id=i;
		hp=h;
		
	}
}
//JSの配列宣言
var jsArray:Array;
//ビルトイン配列宣言
var monsterArray:Monsters[];

var obj:GameObject;

function Start () {
//コンストラクタがあるオブジェクト配列を作成
monsterArray=new Monsters[5];
	for(var i:int=0;i<5;i++){
		monsterArray[i]=new Monsters(obj,"Woo"+i,1*i,100*i);
		obj=Instantiate(enemy,Vector3(0,0,0),Quaternion.identity);
	}
print(monsterArray[0].name);
}

function Update () {
	if(Input.GetButtonDown("Fire1")){
//JS配列のインスタンスを作成し、ビルトイン配列を割り当てる
jsArray=new Array(monsterArray);
//新しい要素を配列の末尾に追加
var monster=new Monsters(obj,"Foo",6,40);
obj=Instantiate(enemy,Vector3(0,0,0),Quaternion.identity);
jsArray.Push(monster);
//JS配列をビルトイン配列に変換
monsterArray=jsArray.ToBuiltin(Monsters);
//配列のコンストラクタ要素にアクセスできる
print(monsterArray[5].name);		
	}
}
