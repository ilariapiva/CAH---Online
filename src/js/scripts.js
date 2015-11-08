// To Read
$(document).ready(function(){
//alert();
  if(localStorage.getItem("myVar") == undefined)
  {
    $(location).attr('href', "login.html");
  }
});

$("#btn-logout").on("click",function()
{
  localStorage.removeItem("myVar");
  $(location).attr('href', "login.html");
});