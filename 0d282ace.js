$(document).ready(function () {

	$("button").click(function(){
		var password = $('#password').val();
		if (password != ''){
			var href = password+'.html';
			window.open(href, '_blank');
		}else{
			alert("口令不能为空");
		}
		
	});

});