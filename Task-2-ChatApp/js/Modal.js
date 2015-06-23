var Modal=function(){

};
Modal.prototype.SendAjax=function(a,b,c){
	$.ajax({
	    url: 'http://localhost:3030/'+ new Date().getTime(), 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify({timestamp:a,nick:b,msg:c}),
	success:function(res){console.log(res);}
	});
}

Modal.prototype.GetAjax=function(){
	var that=this;
	$.get('http://localhost:3030/data',function(res)
{
	console.log(res);
	var arg=res;
			value = $("#txtChat").val();
			for(var i in res)
		{	
				if(res[i].timestamp>that.Lasttimestamp){
				var ts=new Date(res[i].timestamp);
				ControllerObj.PassRenderMsg(ts,arg,i);
			}
		};
		that.Lasttimestamp=i;
});
}
	ModalObj=new Modal();

