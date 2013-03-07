var railePrefab0:GameObject;
var railePrefab1:GameObject;
var railePrefab2:GameObject;
var railePrefab3:GameObject;
var railePrefab4:GameObject;
var railePrefab5:GameObject;
var railePrefab6:GameObject;
var railePrefab7:GameObject;
var raileArray:Array;
var cell:int=64;
var cellXSize:int=6;//x方向のセルの数
var cellYSize:int=4;//y方向のセルの数

var moveTime : float = 0;//アニメーション完了までの秒数

private var vec:Vector3;
private var i:int;
private var j:int;
private var cx:int;//カーソルの位置
private var cy:int;

private var state:int;
private var timer : float = 0;
private var vx : int = 0;//移動量
private var vy : int = 0;

function Start () {
raileArray=[
[4,5,3,4,2,0],
[1,5,7,2,1,3],
[4,5,7,3,6,6],
[1,5,2,1,5,2]
];

	for(i=0;i<cellYSize;i++){
		for(j=0;j<cellXSize;j++){
			if(raileArray[i][j]==0){
				cx=j;
				cy=i;
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab0,vec,Quaternion.identity);
				Debug.Log("カーソル位置"+cx+","+cy);
			}else if(raileArray[i][j]==1){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab1,vec,Quaternion.identity);
			}else if(raileArray[i][j]==2){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab2,vec,Quaternion.identity);
			}else if(raileArray[i][j]==3){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab3,vec,Quaternion.identity);
			}else if(raileArray[i][j]==4){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab4,vec,Quaternion.identity);
			}else if(raileArray[i][j]==5){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab5,vec,Quaternion.identity);
			}else if(raileArray[i][j]==6){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab6,vec,Quaternion.identity);
			}else if(raileArray[i][j]==7){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(railePrefab7,vec,Quaternion.identity);
				}
		}
	}
}

function Update () {

	//  入力状態
	if (state == 0) {
		if(Input.GetKey("left") && cx>0){
				vx=-1;
				cx += vx;
				state = 1;
				//timer = 0;
				timer = moveTime;
				
			Debug.Log("left");			
		}
	}
	
	//移動状態の処理
	if(state==1){
		//タイマーの更新
		timer -= Time.deltaTime;
		//カーソルと線路のセルを入れ替える
		iTween.MoveTo(railePrefab0, {"x":cx*cell, "y":cy*cell, "time":moveTime+0.1});
		
		//入力状態に移行する
		state=0;
	}
	
	//Debug.Log("state"+state);
}