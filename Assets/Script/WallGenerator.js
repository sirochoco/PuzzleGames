var wallPrefab:GameObject;
var wallArray:Array;
var cell : int = 64;//セルのサイズ

private var vec:Vector3;
private var i:int;
private var j:int;

function Start () {

wallArray=[
		[1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,1,0,1,0,1,0,1,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,1,0,1,0,1,0,1,0,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,1],	
		[1,1,1,1,1,1,1,1,1,1,1,1]
	];
	
	for(i=0;i<8;i++){
		for(j=0;j<12;j++){
			if(wallArray[i][j]==1){
				vec=Vector3(j*cell,i*cell,0);
				Instantiate(wallPrefab,vec,transform.rotation);
			}
		}
	}
}

function Update () {

}