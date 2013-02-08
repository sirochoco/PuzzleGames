private var onPlay:boolean;

function Start () {
onPlay=false;
}

function Update () {
//オーディオがプレイ中ならば真を返す
if(audio.isPlaying){
onPlay=true;
}
}

function OnTriggerEnter(Trigger:Collider){
//Playerタグがトリガーに入って、かつオーディオが再生中でなければ
		if(Trigger.gameObject.tag=="Player"&&!onPlay){
			audio.Play();
			Debug.Log("音を鳴らす");
		}
	}
