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