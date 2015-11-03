$(document).ready(function(){
    //alert();
    if(localStorage.getItem("myVar") != undefined)
    {
      $(location).attr('href', "index.html");
    }
});