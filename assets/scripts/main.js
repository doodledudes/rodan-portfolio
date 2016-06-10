var Main = (function () {
	// variables
	var ctr = 0;

	// object
	return {
		init: function () {

			Main.scroll(".navbar-default .navbar-nav > li:not(.dropdown) > a");

			$(window).on('scroll', function() {

				var scrollTop = $(window).scrollTop();

				var triggers = ['experience', 'portfolio'];
				var duration = 1;
				$.each(triggers, function(index) {
					var sectionTrigger = $('.' + triggers[index]).offset().top;
					if ( sectionTrigger < (($(window.top).height() / 2) + scrollTop) ) {
						if ( triggers[index] == 'experience' ) {
							$('.' + triggers[index]).find('.animated').css({'visibility' : 'visible'}).addClass('fadeInUp');
						}
						if ( triggers[index] == 'portfolio' ) {
							$('.' + triggers[index]).find('.animated').css({'visibility' : 'visible'}).addClass('fadeInUp');
						}
					}
				});

			});

		},

		scroll : function (obj) {

			var body = $("html, body");

			$(obj).on("click", function(e) {
				e.preventDefault();
				var selector = $(this).attr("href");
				try {
					var objOffset = $(selector).offset().top;
				} catch(e){}
				body.stop().animate({scrollTop: selector == '#' ? 0 : objOffset}, '200', 'swing');
			});

		},

		//--------
		nocomma: null
	};
}());

// Init after the page has loaded
jQuery(Main.init);
