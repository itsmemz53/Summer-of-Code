$.get('http://datastore.asadmemon.com/asaa',function(res)
{
		arr=res;
		storage=arr;
		for (var i = 0; i < storage.length ;i++) 
		{
				var show=$('<div class="todo-holder" style="border-radius: 8px;border: 2px solid #8AC007;margin: 5px;padding: 1px; width: 70%;height: 30px; "><label><input type="checkbox" class="todo-checkbox" /> <span class="todo">'+storage[i].text+'</label></div>');
				show.attr("data-id",i);
				if(storage[i].state==true)
				{
					$(show).find(".todo").css("text-decoration", "line-through");
					$(show).find(".todo-checkbox").prop("checked",true);
				}
				$("#pending-todos").append(show);
		};
});
	
	function saveit(){
alert(2);
		$.ajax({
	    url: 'http://datastore.asadmemon.com/asaa', 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(arr),
	success:function(res){console.log(res);}
	});
	};
	
	