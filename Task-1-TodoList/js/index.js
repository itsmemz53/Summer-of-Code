var arr=[];
var storage=[];
var value = $("#txtTodo").val();
$(function() {
	$.get('http://datastore.asadmemon.com/mz',function(res)
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
		console.log(arr);
		$.ajax({
	    url: 'http://datastore.asadmemon.com/mz', 
	    type: 'POST', 
	    contentType: 'application/json', 
	    data: JSON.stringify(arr),
	success:function(res){console.log(res);}
	});
	};
	
	$("#btnAddTodo").click(function(e)
	 {
		value = $("#txtTodo").val();
		var html=$('<div class="todo-holder" style="border-radius: 8px;border: 2px solid #8AC007;margin: 5px;padding: 1px; width: 70%;height: 30px; "><label><input type="checkbox" class="todo-checkbox" /> <span class="todo">'+value+'</label></div>');		
		if(value !== "") 
		{
			$("#pending-todos").append(html);
			html.attr("data-id",arr.length);
			$("#txtTodo").val("");
			arr.push({text:value, state:false});
			saveit();
		}	
	});

	$("#txtTodo").keyup(function(e) 
	{
		if(e.keyCode == 13)
		{
			value = $(this).val();
			if(value != "") 
			{
				$("#btnAddTodo").click();
			}
		}
	});



	$(document.body).on('click', ".todo-checkbox", function() 
	{
		var  that=$(this).parents(".todo-holder").attr("data-id")
		if($(this).is(":checked")) 
		{
			$(this).next(".todo").css("text-decoration", "line-through");
			arr[that].state=true;
			saveit(arr);
		} else 
		{
			$(this).next(".todo").css("text-decoration", "none");			
			arr[that].state=false;
			saveit();
		}
	});
});