var Controller=function(){

};
Controller.prototype.SendData=function(){
	ModalObj.SendAjax(new Date().getTime(),document.getElementById("nickName").value,document.getElementById("txtChat").value);
}
Controller.prototype.getData=function(){

	ModalObj.GetAjax();
}
Controller.prototype.PassRenderMsg=function(ts,res,i)
{
	
	var show=$('<div class="Chat-Holder"><span class="todo">[<em> '+ ts.getHours()+" : "+ts.getMinutes()+" : "+ts.getSeconds()+ '</em> ]  '+ ': '+ res[i].nick+ '-> ' +res[i].msg+'</div>');
	ViewObj.RenderMsg(show);
}
var ControllerObj=new Controller();