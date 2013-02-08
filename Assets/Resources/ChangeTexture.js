//var textureA:Texture;
//var textureB:Texture;
var defultTextutre:Texture;

function Start () {
defultTextutre=renderer.material.mainTexture;
}

function Update () {
	if(Input.GetButtonDown("Fire1")){	
		if(renderer.material.mainTexture==defultTextutre){
		renderer.material.mainTexture=Instantiate(Resources.Load("textureB"));
		}else{
		renderer.material.mainTexture=defultTextutre;
		}
		
		Debug.Log("Fire1");
	}
}
