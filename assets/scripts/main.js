var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			Main.scroll(".navbar-default .navbar-nav > li:not(.dropdown) > a");

		},

		scroll : function (obj) {

			var body = $("html, body");

			$(obj).on("click", function(e) {
				e.preventDefault();
				var selector = $(this).attr("href");
				var objOffset = $(selector).offset().top - ($(window).width() > 767 ? 95 : 50);
				body.stop().animate({scrollTop: objOffset}, '200', 'swing');
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
