var Ajax=function(){

};

Ajax.prototype.buttonFunction=function(){

	$("#btnSendtext").click(function()
	 {
		$.ajax({
	    url: 'http://datastore.asadmemon.com/chat/'+ new Date().getTime(), 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify({timestamp:new Date().getTime(),nick:document.getElementById("nickName").value,msg:document.getElementById("txtChat").value}),
	success:function(res){console.log(res);}
	});
			$("#txtChat").val("");
			$("#nickName").val("");
	});
};
Ajax.prototype.intervalFunction=function(){

	setInterval(function()
{
$.get('http://datastore.asadmemon.com/chat',function(res)
{
	 var temp={timestamp:new Date().getTime(),nick:document.getElementById("nickName").value,msg:document.getElementById("txtChat").value};
			value = $("#txtChat").val();

			$("#Chat").empty();
		for(var i in res)
		{	
				var ts=new Date(res[i].timestamp);
				var show=$('<div class="Chat-Holder"><span class="todo"> ['+ ts.getHours()+" : "+ts.getMinutes()+" : "+ts.getSeconds()+ ']'+ ': '+ res[i].nick+ '-> ' +res[i].msg+'</div>');		
				$("#Chat").append(show);
		};
});


},1);
};
var AjaxObj=new Ajax();
AjaxObj.buttonFunction();
AjaxObj.intervalFunction();