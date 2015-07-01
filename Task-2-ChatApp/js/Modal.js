var Modal=function(){

};
Modal.prototype.SendAjax=function(a,b,c){
	$.ajax({
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

