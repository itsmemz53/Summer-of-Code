var oldt=0;
var Modal=function(){


};
Modal.prototype.SendAjax=function(a,b,c){
	$.ajax({
	    url: 'http://localhost:3030/'+ new Date().getTime(), 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(),
	success:function(res){console.log(res);}
	});
}

Modal.prototype.GetAjax=function(){
	
	$.get('http://localhost:3030/data',function(res)
{

	//var arg=res;
		//	value = $("#txtChat").val();
			for(var i in res)
		{	

				if(res[i].timestamp>oldt){
				var ts=new Date(res[i].timestamp);
				//ControllerObj.PassRenderMsg(ts,res,i);
			 oldt=res[i].timestamp;
			}
		};
		console.log(i);
});
}
	ModalObj=new Modal();

