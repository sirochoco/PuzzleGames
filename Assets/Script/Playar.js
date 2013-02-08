var speed:float=1.0;
private var move:boolean;

function Start () {
move=true;
}

function Update () {
//InputManagerによる移動
transform.Translate(new Vector2(Input.GetAxis("Horizontal"),Input.GetAxis("Vertical"))*Time.deltaTime*speed);


}