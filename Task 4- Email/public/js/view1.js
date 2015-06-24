var UpdateInboxView=function(){

}
 
	UpdateInboxView.prototype.goGogo=function(data)
	{
		var ab=data.from;
		$('.me').append(ab);
		var rep=$('<button type="button" class="btn btn-primary" id="reply" data-toggle="modal" data-target=".bs-example-modal-lg">Reply</button><div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel"><div class="modal-dialog modal-lg"><div class="modal-content form-group" style="padding:20px"><form action="/email" method="post" id="email"><input type="hidden" name="to" id="newTo"><label>Enter Subject</label><input class="form-control" type="text" name="subject"><label>Enter Email</label><textarea form="email" rows="4" class="form-control" name="message" placeholder="enter email"></textarea><input class="btn btn-primary" type="submit"></form></div></div></div>');
		 var from=$('<div><p class="bg-info">' + ' '+data.from +'</p></div>');
		 	var subject=$('<div><p class="bg-info">' +' ' +data.subject +'</p></div>' );
		 	var message=$('<div><p class="bg-info">' +' '	+data.message + '</p></div>');
		 	var timestamp=new Date(data.timestamp);
		 	var dt=timestamp.getHours() +":" + timestamp.getMinutes();


		 		
		 			//	$("#reply").append(rep);
		 				var temp=$('<div class="list-group"><a href="#" class="list-group-item"><div class="checkbox"><label><input type="checkbox"></label></div><span class="glyphicon glyphicon-star-empty"></span><span class="name" style="min-width: 120px;display: inline-block;">'+data.from +'</span> <span class="">'+data.subject+'</span><span class="text-muted" style="font-size: 11px;">-' +data.message+'</span><span class="badge">'+  timestamp.getHours()+" : "+timestamp.getMinutes()+" : "+timestamp.getSeconds()+' </span></a></div><button type="button" class="btn btn-primary " id="reply" onclick="showDiv()">Reply</button> <div class="modal" id="modalCompose" style="display:none"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><a href="inbox.html"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button></a><h4 class="modal-title">Compose Message</h4></div><div class="modal-body"><form role="form" class="form-horizontal" action="/email" method="post" id="email"><a href="inbox.html"> <button type="submit" class="btn btn-primary" id="btnSend">Send <i class="fa fa-arrow-circle-right fa-lg"></i></button></a><div class="form-group"><label class="col-sm-2" for="inputTo">To</label><div class="col-sm-10"><input type="email" name="to" class="form-control" id="newTo" value="'+data.from+'"></div></div><div class="form-group"><label class="col-sm-2" for="inputSubject">Subject</label><div class="col-sm-10"><input type="text" class="form-control" id="inputSubject" name="subject" placeholder="subject..."></div></div><div class="form-group"><label class="col-sm-12" for="inputBody">Message</label><div class="col-sm-12"><textarea class="form-control" id="inputBody" name="message" rows="18"></textarea></div></div></form></div><div class="modal-footer"><a href="inbox.html"><button type="button" class="btn btn-default pull-left" data-dismiss="modal">Cancel</button> </a></div></div></div>');
		 				$("#home").append(temp);
		 				//$("#reply").append(rep);

}

var ui=new UpdateInboxView();
$('#btnSend').click(function(){

updateUi();
});
     function showDiv() {

   document.getElementById('modalCompose').style.display = "block";
}