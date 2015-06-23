var View=function(){
	$(document).ready(function(){
	$("#btnSendtext").click(function()
	 {

			ControllerObj.SendData();

			$("#txtChat").val("");
			$("#nickName").val("");
	});
});
};

View.prototype.RenderMsg=function(show){
	alert(5);
			console.log(show);
				$("#Chat").append(show);
	

}
View.prototype.EmptyRender=function(){
	
}

var ViewObj=new View();
	setInterval(function()
{
	ControllerObj.getData();
},1000);
