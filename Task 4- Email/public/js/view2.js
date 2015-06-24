var UpdateSentView=function(){

}
 
	
	UpdateSentView.prototype.goGogo=function(data)
	{
		
		 var from=$('<div><p class="bg-info">' + ' '+data.from +'</p></div>');
		 	var subject=$('<div><p class="bg-info">' +' ' +data.subject +'</p></div>' );
		 	var message=$('<div><p class="bg-info">' +' '	+data.message + '</p></div>');
		 	var timestamp=new Date(data.timestamp);
		 	var dt=timestamp.getHours() +":" + timestamp.getMinutes();

		 				var temp=$('<div class="list-group"><a href="#" class="list-group-item"><div class="checkbox"><label><input type="checkbox"></label></div><span class="glyphicon glyphicon-star-empty"></span><span class="name" style="min-width: 120px;display: inline-block;">'+data.from +'</span> <span class="">'+data.subject+'</span><span class="text-muted" style="font-size: 11px;">-' +data.message+'</span> <span class="badge">'+  timestamp.getHours()+" : "+timestamp.getMinutes()+" : "+timestamp.getSeconds()+' </span> <span class="glyphicon glyphicon-paperclip"></span></a></div>');
		 				$(".loadimg").remove();
		 				$("#home").append(temp);
}


var ui=new UpdateSentView();
$('#btnSend').click(function(){

updateUi();
});

