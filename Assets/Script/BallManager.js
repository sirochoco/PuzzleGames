#pragma strict
//初期設定
var BallOnRailCount:int=3;//最大数
var BallOnRailType:int;//種類数
var BallOnRaileErase:int=3;//いくつ揃ったら消すか

var ballPrefabs:GameObject[];
var ballArray:Array;//ボールの配列
var ballIndex:int;
var ballPos:int;
var ballPos0:int;
var ballType:int;//生成されるボールの種類
private var ball:GameObject;//インスタンス生成されたボール
private var startPosition:Vector3;//パスの出発点の座標


function Start () {
BallOnRailType=ballPrefabs.length;
//ボールの配列を作成する
ballArray=new Array();

//パスの開始点の座標を取得する
startPosition=GameObject.Find("Rail").GetComponent.<iTweenPath>().nodes[0];
}

function Update () {
	if(Input.GetButtonDown("Fire1")){
		ballType=Random.Range(0,BallOnRailType);
		AddBall(ballType);
	}
	if(ball.GetComponent.<Ball>().index==0){
		ballPos0=ball.GetComponent.<Ball>().pos;
		print(ballPos0);
	}
	//ボールが最大数に達していない、かつパス上のボールの数が０か、スタートから一番近いボールまでの距離がボール一個以上ならば、新しいボールをスタートに生成する
	if ((ballArray.length==0||ballPos0>=1) && ballArray.length<BallOnRailCount){
		ballType=Random.Range(0,BallOnRailType);
		
			if(ballArray.length>=BallOnRaileErase-1){
				//for(var i=0;i<BallOnRaileErase-1;i++){
					//if()
				//}
			}
		AddBall(ballType);
	}	
}

function AddBall(ballType){
		//ballインスタンスをパスの出発点に生成
	ball=Instantiate(ballPrefabs[ballType],startPosition,Quaternion.identity);
	ball.GetComponent.<Ball>().type=ballType;
	//ballArray.Splice(i,0,ball);
		ballArray.Push(ball);
}

//衝突したときの処理
function HitBall(index){
//ballのインデックスを取得
	for(var i=0;i<ballArray.length;i++){
			ballArray[i];
			ball.GetComponent.<Ball>().index=i;
		}
	if(index==3){
	//指定したインデックスのボールを配列から削除する
	ballArray.RemoveAt(ballIndex);
	//消去のSendMessage
	ball.SendMessage("EraseBall");
	}
}
