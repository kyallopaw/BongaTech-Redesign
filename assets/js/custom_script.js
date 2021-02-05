/*----------------------------------------------
 Menu Responsive
----------------------------------------------*/

jQuery(function ($) {
    'use strict';
    function navResponsive() {
        let navbar = $('.navbar .items');
        let menu = $('#menu .items');
        menu.html('');
        navbar.clone().appendTo(menu);
        $('.menu .icon-arrow-right').removeClass('icon-arrow-right').addClass('icon-arrow-down');
    }

    navResponsive();
    $(window).on('resize', function () {
        navResponsive();
    })

    $('.menu .dropdown-menu').each(function() {
        var children = $(this).children('.dropdown').length;
        $(this).addClass('children-'+children);
    })
    
    $('.menu .nav-item.dropdown').each(function() {
        var children = $(this).children('.nav-link');
        children.addClass('prevent');
    })

    $(document).on('click', '#menu .nav-item .nav-link', function (event) {
        if($(this).hasClass('prevent')) {
            event.preventDefault();
        }
        var nav_link = $(this);
        nav_link.next().toggleClass('show');
        if(nav_link.hasClass('smooth-anchor')) {
            $('#menu').modal('hide');
        }
    })
})

/*----------------------------------------------
 Navigation
----------------------------------------------*/

jQuery(function ($) {
    'use strict';
    var position = $(window).scrollTop();
    var toTop = $('#scroll-to-top');
    toTop.hide();
    $(window).scroll(function () {
        let scroll = $(window).scrollTop();
        let navbar = $('.navbar');
        if (!navbar.hasClass('relative')) {
            if (scroll > position) {
                if (window.screen.width >= 767) {
                    navbar.fadeOut('fast');
                } else {
                    navbar.addClass('navbar-sticky');
                }
                toTop.fadeOut('fast');
            } else {
                if (position < 76) {
                    navbar.slideDown('fast').removeClass('navbar-sticky');
                } else {
                    navbar.slideDown('fast').addClass('navbar-sticky');
                }

                if (position > 1023) {
                    if (window.screen.width >= 767) {
                        toTop.fadeIn('fast');
                    }
                } else {
                    toTop.fadeOut('fast');
                }
            }
            position = scroll;
        }
    })

    $(document).on('click', '.smooth-anchor', function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
    })

    $('.dropdown-menu').each(function () {
        let dropdown = $(this);
        dropdown.hover(function () {
            //dropdown.parent().find('.nav-link').first().addClass('active');
        }, function () {
            //dropdown.parent().find('.nav-link').first().removeClass('active');
        })
    })
})

/*----------------------------------------------
 Slides
----------------------------------------------*/

jQuery(function ($) {
    'use strict';
    setTimeout(() => {
        $('.no-slider .left').addClass('init');
    }, 1200)

    var animation = (slider) => {
        let image = $(slider + ' .swiper-slide-active img');
        let title = $(slider + ' .title');
        let description = $(slider + ' .description');
        let btn = $(slider + ' .btn');
        let nav = $(slider + ' nav');
        image.toggleClass('aos-animate');
        title.toggleClass('aos-animate');
        description.toggleClass('aos-animate');
        btn.toggleClass('aos-animate');
        nav.toggleClass('aos-animate');
        setTimeout(() => {
            image.toggleClass('aos-animate');
            title.toggleClass('aos-animate');
            description.toggleClass('aos-animate');
            btn.toggleClass('aos-animate');
            nav.toggleClass('aos-animate');
            AOS.refresh();
        }, 100)

        if ($('.full-slider').hasClass('animation')) {
            $('.full-slider .left').addClass('off');
            $('.full-slider .left').removeClass('init');
            setTimeout(() => {
                $('.full-slider .left').removeClass('off');
            }, 200)

            setTimeout(() => {
                $('.full-slider .left').addClass('init');
            }, 1000)

        } else {
            $('.full-slider .left').addClass('init');
        }
    }

    var fullSlider = new Swiper('.full-slider', {
        autoplay: {
            delay: 5000,
        },
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        pagination: {
            el: '.swiper-pagination'
        },
        navigation: false,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        keyboard: {
            enabled: true,
            onlyInViewport: false
        },
        on: {
            init: () => {
                animation('.full-slider')
                let pagination = $('.full-slider .swiper-pagination');
                pagination.hide();
                setTimeout(() => {
                    pagination.show();
                }, 2000)
            },
            slideChange: () => {
                animation('.full-slider')
            }
        }
    })

    var midSlider = new Swiper('.slider-mid', {
        autoplay: {
            delay: 5000,
        },
        loop: true,
        slidesPerView: 1,
        allowTouchMove: true,
        spaceBetween: 30,
        breakpoints: {
            767: {
                slidesPerView: 2,
                spaceBetween: 30
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    })

    var minSlider = new Swiper('.slider-min', {
        autoplay: false,
        loop: false,
        slidesPerView: 1,
        spaceBetween: 1,
        breakpoints: {
            424: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            767: {
                slidesPerView: 1,
                spaceBetween: 15
            },
            1023: {
                slidesPerView: 3,
                spaceBetween: 150
            },
            1199: {
                slidesPerView: 3,
                spaceBetween: 150
            }
        },
        pagination: false,
    })

    var sliderDisabled = new Swiper('.no-slider', {
        autoplay: false,
        loop: false,
        keyboard: false,
        grabCursor: false,
        allowTouchMove: false,
        on: {
            init: () => {
                animation('.no-slider')
            }
        }
    })
})

/*----------------------------------------------
	Contact Form
----------------------------------------------*/

function sendmessage()
    {
	var name=$('#name').val();
	var email=$('#email').val();
	var subject=$('#subject').val();
	var phone=$('#phone').val();
	var message=$('#message').val();
	if(name!="" && email!="" && subject!="" && phone!="" && message!="")
	{
	$.ajax({
		url:'sendmail.php',
		method: "POST",
		data: {
			name:name,
			email:email,
			subject:subject,
			phone:phone,
			message:message,
			btn_submit:'submit'
		},
		success: function (result) {
			$('#success_message').addClass('active');
		}
		});                
	return false;
	}
}

/*----------------------------------------------
	Subscribe
----------------------------------------------*/

jQuery(function ($) {
    'use strict';
    // Variable to hold request
    var request;
    // Bind to the submit event of our form
    $('form').each(function() {
        var form = $(this);
        if(form.attr('id') == 'subscribe' || form.attr('id') == 'utf-subscribe') {
            form.submit(function (event) {
                // Prevent default posting of form - put here to work in case of errors
                event.preventDefault();
                // Prevent
                setTimeout(function() {
                    let input = form.find('.form-control');
                    let button = form.find('button');
                    input.attr('disabled', 'disabled');
                    button.attr('disabled', 'disabled').html('<i class="icon-check"></i>'+button.data('success'));
                }, 1500)

                // Abort any pending request
                if (request) {
                    request.abort();
                }

                // setup some local variables
                var $form = $(this);

                // Let's select and cache all the fields
                var $inputs = $form.find('input, select, button, textarea');

                // Serialize the data in the form
                var serializedData = $form.serialize();

                // Let's disable the inputs for the duration of the Ajax request
                // Note: we disable elements AFTER the form data has been serialized
                // Disabled form elements will not be serialized
                $inputs.prop('disabled', true);

                // Fire off the request
                request = $.ajax({
                    url: $form.attr('action'), // Enter your back-end URL here
                    type: 'post',
                    data: serializedData
                })

                // Callback handler that will be called on success
                request.done(function (response, textStatus, jqXHR) {
                    // Log a message to the console
                })

                // Callback handler that will be called on failure
                request.fail(function (jqXHR, textStatus, errorThrown) {
                    // Log the error to the console
                    console.error(textStatus, errorThrown);
                })

                // Callback handler that will be called regardless
                // if the request failed or succeeded
                request.always(function () {
                    // Reenable the inputs
                    $inputs.prop('disabled', false);
                })
            })
        }
    })
})

/*----------------------------------------------
	Login & Register
----------------------------------------------*/

jQuery(function ($) {
    $(document).on('click', 'a[data-target="#register"]', function() { 
        $('#sign').modal('hide');
    })
	
    $(document).on('click', 'a[data-target="#sign"]', function() { 
        $('#register').modal('hide');
    })
})

/*----------------------------------------------
	Vfx Loader
----------------------------------------------*/

$(window).on('load', function() {
	$('.vfx-loader').delay(400).fadeOut(500);
});

/*----------------------------------------------
   Counter
----------------------------------------------*/

$('.count').each(function () {
	$(this).prop('Counter',0).animate({
		Counter: $(this).text()
	}, {
		duration: 4000,
		easing: 'swing',
		step: function (now) {
			$(this).text(Math.ceil(now));
		}
	});
});