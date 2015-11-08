$(document).ready(function(){
    //alert();
    if(localStorage.getItem("myVar") != undefined)
    {
      $(location).attr('href', "index.html");
    }

	$(".tab_content").hide();
	$(".tab_content:first").show(); 

	$("ul.tabs li").click(function() 
	{
		$("ul.tabs li").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").hide();

		var activeTab = $(this).attr("rel"); 

		$("#"+activeTab).fadeIn(); 
	});
});

$("#btn-login").on("click", function() {
	console.log("Botton clicked.");
	if(isEmail($("#email-login").val()))
	{
		socket.emit("login",{email: $("#email-login").val(), password: $("#password-login").val()});
	}
	else
	{
		$("#email-login-error").text("Indirizzo e-mail non valido!");
		$("#email-login-error").removeAttr("hidden");
		$("#email-login").addClass("input-error");
	}
});

$("#btn-sign").on("click", function() {
	console.log("Botton clicked.");
	if(isEmail($("#email-register").val()))
	{
		socket.emit("register",{email: $("#email-register").val(), user: $("#username-register").val(), password: $("#password-register").val()});
	}
	else
	{
		$("#email-register-error").text("Indirizzo e-mail non valido!");
		$("#email-register-error").removeAttr("hidden");
		$("#email-register").addClass("input-error");
	}
});