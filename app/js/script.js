//Scripts
function tekst(msg, ctrlwidth) {
    var elem = document.getElementById("text");
    msg = " " + msg;
    newmsg = msg;
    while (newmsg.length < ctrlwidth) {
        newmsg += msg;
    }
    elem.innerHTML = '<form name="Tekst"><input name="tekst" class="border-0 text-uppercase text-black-50" value= "' + newmsg + '" size= ' + ctrlwidth + ' /></form>';
    prokrutka();
}

function prokrutka() {
    NowMsg = document.Tekst.tekst.value;
    NowMsg = NowMsg.substring(1, NowMsg.length) + NowMsg.substring(0, 1);
    document.Tekst.tekst.value = NowMsg;
    bannerid = setTimeout("prokrutka()", 150);
}

var text = tekst("Инструкция — Что делать — Как защититься — ", 40);




//Back to top button
$(window).scroll(function () {
    if ($(this).scrollTop() > 400) {
        $('#back-to-top').fadeIn();
    } else {
        $('#back-to-top').fadeOut();
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

    var jcarousel = $('.jcarousel');

    jcarousel
        .on('jcarousel:reload jcarousel:create', function () {
            var carousel = $(this),
                width = carousel.innerWidth();

            if (width >= 991) {
                width = width / 2;
            } else if (width >= 767) {
                width = width;
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
            interval: 8000,
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
    $(function () {
        $('.item').matchHeight({
            byRow: true,
            property: 'height',
            target: null,
            remove: false
        });
    });
});
