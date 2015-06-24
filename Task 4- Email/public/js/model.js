
var ids=[];


var oldid=0;
var ClassForModel=function(){

};
function loader()
{
	
		$.get('http://localhost:3030/inbox',function(res)
		 	{
		 		if(!$.isEmptyObject(res))
		 		{
		 			console.log(res);
		 			arr2=res;
		 			for(var i in arr2){
		 				if(ids.indexOf(arr2[i]._id)==-1){
		 				
		 				var message=arr2[i].message;
		 				var from=arr2[i].from;
		 				var subject = arr2[i].subject;
		 				var timestamp=arr2[i].timestamp;
		 				var sending={"message":message,"from":from,"subject":subject,"timestamp":timestamp};

		 				ids.push(arr2[i]._id);
		 				up.gotData(sending);
		 				
		 			}	
		 				
		 		}
		 		}
		 			
	});

	

 }

 setInterval(function()

{
	loader();
}
 	,1000);
	