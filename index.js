$(document).ready(function(){
	var navMap = {"uxNav" : 0, "webNav" : 1, "visNav" : 2, "aboutNav" : 3};
	var navColor = "#a2d9df"

	$('.slider').slick({
	  dots: false,
	  infinite: true,
	  speed: 300,
	  slidesToShow: 1,
	  adaptiveHeight: true,
	  arrows: false,
	  draggable: false
	});

	$("#uxNav").css("background-color", navColor);
	$("#uxNav").addClass("selectedNav");

	$("#sliderNav li").click(function(){
		var id = $(this)[0].id;
		$(".slider").slick("slickGoTo", navMap[id], "false");
		var currentSlide = $(".slider").slick('slickCurrentSlide');

		// Clear background colors
		$("#sliderNav li").css("background", "none");
		$("#sliderNav li").removeClass("selectedNav");

		$(this).addClass("selectedNav");

		if (currentSlide == 0)
			$("#uxNav").css("background-color", navColor);
		else if (currentSlide == 1)
			$("#webNav").css("background-color", navColor);
		else if (currentSlide == 2)
			$("#visNav").css("background-color", navColor);
		else if (currentSlide == 3)
			$("#aboutNav").css("background-color", navColor);

	})

})

