// JavaScript Document
'use strict';

$(document).on('click', 'a[href="#"]', function(e) {
    e.preventDefault();
});
    
$(document).ready(function() {

	// disappear spinner
    setTimeout(function() {$('body').removeClass();}, 1100);
    setTimeout(function() {
        $('.spinner').animate({'opacity': 0}, function() {
            $(this).css({'display': 'none'})
        });
    }, 1200);
    
    // background image move effect
	setMoveReverse();
	function setMoveReverse() {
        var startX = 0;
        var startY = 0;
    	var delX = 0;
        var delY = 0;
        var offsetX = 0;
        var offsetY = 0;
        
        $('#header').on('mouseenter', function(e) {
            $(this).find('.main-bg').css({'transition': 'none'});
            startX = e.clientX;
            startY = e.clientY;
            offsetX = $(this).find('.main-bg').position().left;
            offsetY = $(this).find('.main-bg').position().top;
        }) // end of mouseenter
        
    	$('#header').on('mousemove', function(e) {
        	e.preventDefault();
            delX = e.clientX - startX;
            delY = e.clientY - startY;
            $(this).find('.main-bg').css({'left': (offsetX - delX / 30) + 'px', 'top': (offsetY - delY / 50) + 'px'});
            //$(this).find('.main-bg').css({'transform': 'translate(' + (offsetX - delX / 20) + 'px, ' + (offsetY - delY / 60) + 'px)'});
        }); // end of mousemove
        
        $('#header').on('mouseleave', function(e) {
            offsetX = -50;
            offsetY = -50;
            $(this).find('.main-bg').css({'transition': 'all 0.5s', 'left': offsetX + 'px', 'top': offsetY + 'px'});
        }); // end of mouseleave
    } // end of setMoveReverse

    // main title fade in effect // alternative with css animation 2018.08.23
	/*
    titFade();
	function titFade() {
        $('.main-copy').stop().delay(1500).animate({'top': 0 + 'px', 'opacity': 1}, 800);
		$('.sub-copy').stop().delay(2000).animate({'top': -30 + 'px', 'opacity': 1}, 800);
	}
    */
        
    // break rate count
    $.fn.startRateCount = function(options) {
        var settings = $.extend({
            countGap: 729,
            timerSpeed: 1000,
            useComma: true
        }, options)

        var $selector = $(this);
        var numberNow = 0;
        var countGap = settings.countGap;
        var timerSpeed = settings.timerSpeed;
        var useComma = settings.useComma;
        var numberNowComma = '';
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = '0' + (today.getMonth() + 1); // January is 0.
        var dd = today.getDate();

        // 초기값
        numberNow = (yyyy + mm + dd) * countGap;
        updateRate();

        setInterval(function() {updateRate();}, timerSpeed);

        function updateRate() {
            if (useComma === true) {
                numberNowComma = numberNow.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                $selector.text(numberNowComma);
            } else {
                $selector.text(numberNow);
            }
            numberNow += countGap;
        } // end of updateBreakRate
    } // end of jquery function - startRateCount

    $('.counter').startRateCount();

	(function() {
		// easing function
		var baseEasings = {};

		$.extend(baseEasings, {
			Elastic: function(p) {
				return p === 0 || p === 1 ? p :
					-Math.pow(2, 8 * ( p - 1 )) * Math.sin((( p - 1 ) * 80 - 7.5) * Math.PI / 15);
			},
			Bounce: function(p) {
				var pow2,
					bounce = 4;
				while (p < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {}
				return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - p, 2);
			}
		}); // end of extend
		$.each(baseEasings, function(name, easeIn) {
			$.easing["easeIn" + name] = easeIn;
			$.easing["easeOut" + name] = function(p) {
				return 1 - easeIn(1 - p);
			};
			$.easing["easeInOut" + name] = function(p) {
				return p < 0.5 ?
					easeIn(p * 2) / 2 :
					1 - easeIn(p * -2 + 2) / 2;
			};
		}); // end of each
		// based on easing equations from Robert Penner (http://www.robertpenner.com/easing)
	})(); // end of easing function
    
    // menu
	navMenu();
	function navMenu() {
        var menu = $('#menu')
		var openBtn = $('a.menu-open');
		var closeBtn = $('a.menu-close');
        
        open();
        close();
        
		// menu open
        function open() {
            openBtn.on('click', function() {
                menu.css({'display':'block'});
                $(this).parent().stop().animate({'top': -100 + '%'}, 200);
                menu.stop().delay(300).animate({'top': 0}, 1000, 'easeOutBounce');
            }); 
        } // end of open
        
		// menu close
        function close() {
            closeBtn.on('click', function() {
                menu.stop().animate({'top': -100 + '%'}, 100, function() {
                    $(this).css({'display': 'none'})
                });
                openBtn.parent().stop().animate({'top': -20 + 'px'}, 200);
            }); 
        } // end of close

        // menu click
        $('ul.gnb li a').on('click', function() {
            var index = $('ul.gnb li').index($(this).parent()) + 1;
            var pos = $('.menu0' + index).position().top;
            $(this).parents('#menu').stop().animate({'top': -100 + '%'}, 100, function() {
                $(this).css({'display': 'none'})
            	openBtn.parent().stop().animate({'top': -20 + 'px'}, 200);
                $('html, body').animate({scrollTop: pos});
            });
        }); // end of click  
	} // end of nav menu
	
    // header scroll down button
	$('a.scroll-down-btn').on('click', function() {
		var pos = $('#studio').position().top;
		$('html, body').animate({scrollTop: pos});
	});

    // top button
    topBtn();
    function topBtn() {
        var btn = $('a.top-btn');
        var scrollTop = 0;

        checkScroll();
        $(window).on('scroll', function() {
            checkScroll();
        }); // end of scroll
        
        function checkScroll() {
            scrollTop = $(window).scrollTop();
            if (scrollTop >= $('#studio').offset().top && scrollTop <= $('#enjoy').offset().top - 500) {
                btn.css({'display': 'block', 'opacity': 0}).stop().animate({'opacity': 1}, 50);
            } else {
                btn.stop().animate({'opacity': 0}, 50, function() {
                    $(this).css({'display': 'none'});
                });
            }
        } // end of checkScroll

        $('a.top-btn, a.top-btn-ft').on('click', function() {
            $('html, body').animate({scrollTop: 0});
        }); // end of click
    } // end of topBtn

    // menu & video layer popup focus
    $('a.menu-open').on('click', function() {
        openLayerPopup('#menu', $(this));
    });
    $('.view-btn').on('click', function() {
        openLayerPopup('.popup-vid', $(this));
    });
    function openLayerPopup(selector, returnElement, width, height) {
        if (width !== undefined) {
            $(selector).css({'width': width + 'px', 'margin-left': -(width / 2) + 'px'});
        }
        if (height !== undefined) {
            $(selector).css({'height': height + 'px', 'margin-top': -(height / 2) + 'px'});
        }
        $(selector).before('<div class="popup-layer-mask" tabIndex="0"></div>');
        $(selector).find(':last').addClass('last').attr({'tabIndex': 0});
        $(selector).append('<a href="#" class="return"></a>');
        $(selector).css({'display': 'block'}).attr({'tabIndex': 0}).focus();
        
        // focus move
        $(selector).find('a.return').on('focus', function() {
            $(selector).focus();
        });
        $('.popup-layer-mask').on('focus', function() {
            $(selector).find('.last').focus();
        });
        
        // close
        $(selector).find('a.close-btn').one('click', function() {
            $(returnElement).focus();
            $('.popup-layer-mask').remove();
            $(selector).find('a.return').remove();
            $(selector).css({'display': 'none'});
        });
    } // end of openLayerPopup

    // image slide - product list
    $.fn.setImageSlide = function(options) {
        var settings = $.extend({
            slideFirst: 1,
            isTimerOn: true,
            timerSpeed: 3000,
            fadeSpeed: 500,
            transitionType: 'basic'
        }, options);

        this.each(function() {
            var $selector = $(this);
            var numSlide = $selector.find('ul.slide li').length;
            var slideNow = 0;
            var slideNext = 0;
            var slidePrev = 0;
            var slideFirst = settings.slideFirst;
            var timerId = '';
            var timerSpeed = settings.timerSpeed;
            var fadeSpeed = settings.fadeSpeed;
            var isTimerOn = settings.isTimerOn;
            var onPlaying = false;
            var showSlide = '';

            // 초기화
            if (isTimerOn === true) {
                $selector.find('p.control a.play').addClass('on');
            } else {
                $selector.find('p.control a.play').removeClass('on');
            }
            switch (settings.transitionType) {
                case 'basic': showSlide = showSlideBasic; break;
                case 'fade': showSlide = showSlideFade; break;
                case 'swipe': showSlide = showSlideSwipe; break;
                default: showSlide = showSlideBasic;
            }
            showSlide(slideFirst);

            $selector.find('p.control a.prev').on('click', function() {
                $(this).stop(true).animate({'left': '-70px'}, 50).animate({'left': '-60px'}, 100);
                showSlide(slidePrev);
            });
            $selector.find('p.control a.next').on('click', function() {
                $(this).stop(true).animate({'right': '-70px'}, 50).animate({'right': '-60px'}, 100);
                showSlide(slideNext);
            });
            $selector.find('p.control a.play').on('click', function() {
                if (isTimerOn === true) {
                    clearTimeout(timerId);
                    isTimerOn = false;
                    $(this).removeClass('on');
                } else {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                    isTimerOn = true;
                    $(this).addClass('on');
                }
            });

            // 공통함수
            function showSlideBasic(n) {
                clearTimeout(timerId);
                $selector.find('ul.slide li').css({'display': 'none'});
                $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
                $selector.siblings('ul.text').find('li').removeClass('on');
                $selector.siblings('ul.text').find('li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                }
            }  // end of showSlideBasic

            function showSlideFade(n) {
                if (slideNow === n || onPlaying === true) return false; // 현재 위치 네비 누르면 재실행 막기 || 애니메이션 중 클릭해서 애니메이션 쌓이는 것 막기
                clearTimeout(timerId);
                if (slideNow === 0) {
                    $selector.find('ul.slide li').css({'display': 'none'});
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block'});
                } else {
                    onPlaying = true;
                    $selector.find('ul.slide li:eq(' + (slideNow - 1) + ')').stop(true).animate({'opacity': 0}, fadeSpeed, function() {
                        onPlaying = false;
                    });
                    $selector.find('ul.slide li:eq(' + (n - 1) + ')').css({'display': 'block', 'opacity': 0}).stop(true).animate({'opacity': 1}, fadeSpeed);
                }
                $selector.siblings('ul.text').find('li').removeClass('on');
                $selector.siblings('ul.text').find('li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideFade

            function showSlideSwipe(n) {
                clearTimeout(timerId);
                if (slideNow === 0) { // 시작할 때
                    $selector.find('ul.slide li').each(function(i) {
                        $(this).css({'top': (i * 100) + '%', 'display': 'block'}); // 옆으로 밀 때 흰 화면 안 보이게 하기 위한 display: block;
                    });
                    $selector.find('ul.slide').css({'transition': 'none', 'top': (-(n - 1) * 100) + 36 + '%'});
                } else {
                    $selector.find('ul.slide').stop().animate({'transition': 'all .5s', 'top': (-(n - 1) * 100) + 36 + '%'}, timerSpeed, 'easeOutElastic');
                }
                $selector.siblings('ul.text').find('li').removeClass('on');
                $selector.siblings('ul.text').find('li:eq(' + (n - 1) + ')').addClass('on');
                slideNow = n;
                slideNext = (n + 1) > numSlide ? 1 : n + 1;
                slidePrev = (n - 1) < 1 ? numSlide : n - 1;
                if (isTimerOn === true) {
                    timerId = setTimeout(function() {showSlide(slideNext);}, timerSpeed);
                } 
            }  // end of showSlideSwipe
        });  // end of each
    } // end of jquery function - setImageSlide

    $('.product-list').setImageSlide({
        isTimerOn: false,
        timerSpeed: 1000,
        transitionType: 'swipe'
    });

    // title text fade effect scroll event
    $.fn.setCheckShow = function(options) {
        var settings = $.extend({
            classPrefix: 'scroll'
        }, options);
        
        this.each(function() {
            var $selector = $(this);
            var scrollTop = 0;
            var offsetTop = 0;
            var windowHeight = 0;
            var elementHeight = 0;
            var startShow = 0;
            var endShow = 0;
            var classPrefix = settings.classPrefix;

            checkShow();
            $(window).on('scroll resize', function() {
                checkShow();
            }); // end of scroll
            
            function checkShow() {
                scrollTop = $(document).scrollTop();
                offsetTop = $selector.offset().top;
                windowHeight = $(window).height();
                elementHeight = $selector.outerHeight();
                startShow = offsetTop - windowHeight + 50; // offset().top - 브라우저창의 height = 나타나는 순간의 스크롤 값
                endShow = offsetTop + elementHeight;

                if (scrollTop < startShow) { // down
                    $selector.removeClass(classPrefix + '-up' + ' ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-down');
                } else if (scrollTop > endShow) { // up
                    $selector.removeClass(classPrefix + '-down' + ' ' + classPrefix + '-show');
                    $selector.addClass(classPrefix + '-up');
                } else { // show
                    $selector.removeClass(classPrefix + '-up' + ' ' + classPrefix + '-down');
                    $selector.addClass(classPrefix + '-show');
                }
           } // end of checkShow
        }); // end of each
    }  // end of jquery function - setCheckShow

    $('section h2.tit, section p.desc').setCheckShow();

    // video play button
    setPlayVideo();
    function setPlayVideo() {
        var video = $('.making-video');
        var btn = $('.play-btn');
        var isVideoPlay = true;

        btn.on('click', function() {
            playVideo();
        });
        
        function playVideo() {
            if (isVideoPlay === true) {
                video.get(0).pause();
                btn.html('Play');
                isVideoPlay = false;
            } else {
                video.get(0).play();
                btn.html('Pause');
                isVideoPlay = true;
            }
        } // end of playVideo
    } // end of setPlayVideo

    
}) // end of ready