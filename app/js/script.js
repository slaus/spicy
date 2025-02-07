//Scripts

//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('#back-to-top, #go-to-cart').fadeIn();
    } else {
        $('#back-to-top, #go-to-cart').fadeOut();
    }
});
// scroll body to 0px on click
$('#back-to-top').click(function () {
    $('#back-to-top').tooltip('hide');
    $('body,html').animate({
        scrollTop: 0
    }, 800);
    return false;
});

//Carousel responsive
$(function () {

    if (window.sessionStorage && window.localStorage) {
        const AGREE = "Yes";

        if (localStorage.getItem("Agreement") == AGREE) {
            $(".alert-dismissible.close-alert").hide();
        } else {
            $(".close-alert .close").click(function () {
                localStorage.setItem("Agreement", AGREE);
            });
        }
    }


    $(".dc-mega-icon").click(function (e) {
        e.preventDefault();
        $(".dc-mega").removeClass("hide-active");
        $(".dc-mega-icon").removeClass("active");
        if ($(this).parent().next().hasClass("show-container")) {
            $(this).parent().next().removeClass("show-container");
            $(this).parent().addClass("hide-active");
        } else {
            $(this).addClass("active");
            $(".dc-mega").removeClass("hide-active");
            $(".sub-container").removeClass("show-container");
            console.log($(this).parent().next());
            $(this).parent().next().addClass("show-container");
        }
    });

    $("#hamburger, .mainmenu-btn-wrapper").click(function (e) {
        e.preventDefault();
        $("#mega-menu").toggleClass("mobile-menu");
        $(".mainmenu-btn").toggleClass("press-btn");
        $("body").toggleClass("mobile");
    });

    $("#search").click(function (e) {
        e.preventDefault();
        $(".search-area").toggleClass("show-search-area");
    });

    $("#account").click(function (e) {
        e.preventDefault();
        $(".topbar-link-wrapper").toggleClass("show-link-wrapper");
    });

    $("#cart-contents").click(function (e) {
        e.preventDefault();
        $("#widget_cart-2").toggleClass("show_shopping_cart");
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest(".cart.togg").length) {
            $("#widget_cart-2").removeClass("show_shopping_cart");
        }
        if (!$(e.target).closest(".topbar-link").length) {
            $(".topbar-link-wrapper").removeClass("show-link-wrapper");
        }
        if (!$(e.target).closest(".search-string").length) {
            $(".search-area").removeClass("show-search-area");
        }
        if (!$(e.target).closest("#site-navigation").length) {
            $("#mega-menu").removeClass("mobile-menu");
            $(".mainmenu-btn").removeClass("press-btn");
            $("body").removeClass("mobile");
            $(".sub-container").removeClass("show-container");
        }
        e.stopPropagation();
    });

    $(".mega-menu .sub-container").hover(function() {
        $(this).parent(".menu-item").toggleClass("hover");
    });


    // Set up the carousel's "state"
    var prevIndex = 2;
    var currentIndex = 0;
    var nextIndex = 1;
    var lastIndex = $('#carousel').find('.item').length - 1;

    // Generate pips
    generatePips();

    // Cycle automatically
    var carouselRunning = true;
    var carouselRestartTimeout;

    delay = 10000;

    showNextQuote();

    // Set the carousel working
    var interval = setInterval(function() {
        if (carouselRunning) {
            showNextQuote();
        }
    }, delay);

    function showNextQuote() {
        // Calculate the indices needed to show the next quote
        if (currentIndex === lastIndex) {
            currentIndex = 0;
        } else {
            currentIndex++;
        }
        updateState(currentIndex);
    }

    function updateState(index, direction) {
        // Calculates the previous and next indices, and updates the carousel
        prevIndex = index === 0 ? lastIndex : index - 1;
        currentIndex = index;
        nextIndex = index === lastIndex ? 0 : index + 1;

        updateCarouselPosition();
        updatePips();
    }


    function updateCarouselPosition(direction) {
        // Remove any previous, current, next classes
        $('#carousel').find('.previous').removeClass('previous');
        $('#carousel').find('.current').removeClass('current');
        $('#carousel').find('.next').removeClass('next');
        var allQuotes = $('#carousel').find('.item');
        $(allQuotes[prevIndex]).addClass('previous');
        $(allQuotes[currentIndex]).addClass('current');
        $(allQuotes[nextIndex]).addClass('next');
        $(allQuotes[currentIndex]).css('z-index', 10)
        if (direction === "right") {
            $(allQuotes[prevIndex]).css('z-index', 0);
            $(allQuotes[nextIndex]).css('z-index', 1);
        } else {
            $(allQuotes[prevIndex]).css('z-index', 1);
            $(allQuotes[nextIndex]).css('z-index', 0);
        }
    }

    function generatePips() {
        // Add pips to the ul element in index.html
        var listContainer = $('#carousel-pips').find('ul');
        for (var i = lastIndex; i >= 0; i--) {
            var newPip = $('<li class="pip"></li>');
            $(listContainer).append(newPip);
        }
        updatePips();
    }

    function updatePips() {
        // Update the classes on the pips depending on the current indices
        $('#carousel-pips').find('.previous').removeClass('previous');
        $('#carousel-pips').find('.current').removeClass('current');
        $('#carousel-pips').find('.next').removeClass('next');
        var allPips = $('#carousel-pips').find('.pip');
        $(allPips[prevIndex]).addClass('previous');
        $(allPips[currentIndex]).addClass('current');
        $(allPips[nextIndex]).addClass('next');
    }

    // Lastly, add a listener for situations where the browser is in another tab / not visible
    document.addEventListener("visibilitychange", function() {
        if (document.hidden) {
            carouselRunning = false;
        } else {
            carouselRunning = true;
        }
    });

    var jcarousel = $('.jcarousel'),
        manufacturers = $('.jcarousel.manufacturers');

    manufacturers
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 1199) {
                width = width / 5;
            } else if (width >= 991) {
                width = width / 4;
            } else if (width >= 575) {
                width = width / 3;
            } else if (width >= 412) {
                width = width / 2;
            }

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true,
        });

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            carousel.jcarousel('items').css('width', Math.ceil(width) + 'px');
        })
        .jcarousel({
            wrap: 'circular',
            animation: {
                duration: 1000,
                speed: 1000,
                easing: 'linear',
                complete: function () {
                }
            }
        })
        .jcarouselAutoscroll({
            interval: 10000,
            target: '+=1',
            autostart: true,
        })
        .on('mouseover', function (e) {
            $(this).jcarouselAutoscroll('stop');
        })
        .on('mouseout', function (e) {
            $(this).jcarouselAutoscroll('start');
        });

    $('.jcarousel-control-prev')
        .jcarouselControl({
            target: '-=1'
        });

    $('.jcarousel-control-next')
        .jcarouselControl({
            target: '+=1'
        });

    $('.jcarousel-pagination')
        .on('jcarouselpagination:active', 'a', function () {
            $(this).addClass('active');
        })
        .on('jcarouselpagination:inactive', 'a', function () {
            $(this).removeClass('active');
        })
        .on('click', function (e) {
            e.preventDefault();
        })
        .jcarouselPagination({
            perPage: 1,
            item: function (page) {
                return '<a href="#' + page + '">' + page + '</a>';
            }
        });

//Match Height
    $(function() {
        $('.item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });
});
