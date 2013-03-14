
//初期設定
var BallOnRailCount:int;//最大数
var BallOnRaileErase:int;//いくつ揃ったら消すか

var speed:float;
var ballPrefabs:GameObject[];//ボールプレファブを格納するビルトイン配列
var ballBuiltin:GameObject[];//パス上のボールを格納するビルトイン配列
var ballArray:Array;//ボールのJS配列（変換用）
private var ball:GameObject;//ボール単体のインスタンス
var type:int;//ボールの種類
var pos:int;//ボールの直径を1とした時のパス上での並び（位置）
var type0:int;//パス上のボール配列が0の時の値
var pos0:int;//パス上のボール配列が0の時の値

var cannon:GameObject;

private var startPosition:Vector3;//パスの出発点の座標

function Start () {
	//ビルトイン配列を作成
	ballBuiltin=new GameObject[0];
	//パスの開始点の座標を取得する
	startPosition=GameObject.Find("Rail").GetComponent.<iTweenPath>().nodes[0];
	AddBall();
	
	cannon=GameObject.Find("Cannon");
}

function Update () {

	//スタートから一番近いボールの種類を取得（ビルトイン配列要素からは直接GetComponentできるのね）
	type0=ballBuiltin[0].GetComponent.<Ball>().ballType;
	//スタートから一番近いボールまでの位置を取得
	pos0=ballBuiltin[0].GetComponent.<Ball>().ballPos;
	//ボールが最大数に達していない、かつパス上のボールの数が０か、スタートから一番近いボールまでの距離がボール一個以上ならば、新しいボールをスタートに生成する
	if ((ballBuiltin.length==0||pos0>=1) && ballBuiltin.length<BallOnRailCount){
	//乱数を種類数で割ってボールの種類を決める
		type=Random.Range(0,ballPrefabs.length);	
		//同じ種類のボールを規定数以上連続させないための処理
			if(ballBuiltin.length>=BallOnRaileErase-1){		
			//スタートに同じ種類のボールが規定数-1連続しているか調べる
			var i:int;			
			for(i=1;i<BallOnRaileErase-1;i++){							
				//スタートから一番近いボールと２番目のボールの種類が異なっていればストップ
				if(ballBuiltin[i].GetComponent.<Ball>().ballType != type0) {
					break;
				}
			}
			//連続している場合、異なる種類のボールを生成する
				//iが2ということはストップしなかったこと
				if(i==BallOnRaileErase-1){
					while(type==type0){
						type=Random.Range(0,ballPrefabs.length);
					}
				}
		}
			AddBall();
	}


//パス上で規定以上のボールが並んだら、ボールを消す
	for(i=0;i<ballBuiltin.length;i++){
	//同じ種類のボールが規定数以上並んでいるかを調べる
		var j:int;
		var iType:int=ballBuiltin[i].GetComponent.<Ball>().ballType;
		var jType:int=ballBuiltin[j].GetComponent.<Ball>().ballType;
		var jPos:int=ballBuiltin[j].GetComponent.<Ball>().ballPos;
		
			for(j=i+1; j<ballBuiltin.length && 
			//同じ種類のボールである
			jType==iType && 
			//ボール間の距離がボール一個分である
			jPos==ballBuiltin[j-1].GetComponent.<Ball>().ballPos+1;
			j++){
			//規定数以上並んでいたら、ボールを消す
			if (j-i>=BallOnRaileErase){
				for(;i>j;i++){
					ballBuiltin[i].SendMessage.EraseBall();		
				}
			}
		}
	}
}


function AddBall(){
	//ビルトイン配列をJS配列に変換
	ballArray=new Array(ballBuiltin);	
	//ボールインスタンス生成
	ball=Instantiate(ballPrefabs[type],startPosition,Quaternion.identity);
	//種類の値をボールに渡す
	ball.SendMessage("InitType",type);
	ball.SendMessage("InitSpeed",speed);
	//	配列の先頭（パス上の並びの末尾）に追加	
	ballArray.Unshift(ball);
	//ballArray.Push(ball);
	//ビルトイン配列に再変換
	ballBuiltin=ballArray.ToBuiltin(GameObject);		
}



