$(document).ready(function(){
    //alert();
    if(localStorage.getItem("myVar") == undefined)
    {
      $(location).attr('href', "index.html");
    }
});

$("#btn-save").on("click", function() {
	console.log("Botton clicked.");
	socket.emit("settings",{idN: localStorage.getItem("myVar"), user: $("#user-settings").val(), password: $("#password-settings").val()});
});