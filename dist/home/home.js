/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;
	$(function() {
	    __webpack_require__(1);
	    __webpack_require__(16);
	    __webpack_require__(5);
	    /*图片懒加载*/
	    var LazyLoadImg = __webpack_require__(25);
	    new LazyLoadImg({
	        select: '.imglazyload'
	    });

	    var Swipe = __webpack_require__(18);

	    new Swipe($('#swipe_wrap')[0], {
	        startSlide: 0,
	        speed: 0,
	        auto: 1000,
	        continuous: true,
	        disableScroll: false,
	        stopPropagation: false,
	        callback: function(index, elem) {
	            var dotList = $('#pnav').find('li');
	            $(dotList[index]).addClass('focus').siblings().removeClass('focus');
	        }
	    });

	    function buildYieldBg() {
	        var canvas = $('#yield_bg').get(0);
	        var content = canvas.getContext('2d'); //取得图形上下文 graphics context 

	        content.fillStyle = '#fff'; //填充canvas的背景颜色 
	        content.fillRect(0, 0, 320, 160); //参数分别表示 x轴,y轴,宽度,高度 

	        content.beginPath(); //创建路径 
	        content.arc(25, 13, 8.5, 0, Math.PI * 2, true); //绘制图形 
	        content.closePath(); //关闭路径 
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)'; //设置样式 
	        content.fill(); //填充 

	        content.beginPath();
	        content.arc(63, 90, 33.5, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)';
	        content.fill();

	        content.beginPath();
	        content.arc(145, 59, 59, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)';
	        content.fill();

	        content.beginPath();
	        content.arc(156, 62, 62, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.1)';
	        content.fill();

	        content.beginPath();
	        content.arc(240, 5, 4.5, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)';
	        content.fill();

	        content.beginPath();
	        content.arc(243, 75, 19, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)';
	        content.fill();

	        content.beginPath();
	        content.arc(293, 113, 7.2, 0, Math.PI * 2, true);
	        content.closePath();
	        content.fillStyle = 'rgba(246, 106, 106, 0.2)';
	        content.fill();
	    }

	    buildYieldBg();

	    var Confirm = __webpack_require__(26);
	    var openConfirm = new Confirm();

	    $('#open_btn').on('click', function(e) {
	        e.preventDefault();
	        openConfirm.open();
	        bindButtonClick();
	    })

	    function bindButtonClick() {

	        getUserSuc(function(token) {
	            $('#open_btn').html(token);
	        });
	    }

	    window.getUserSuc = function(callback) {
	        callback('123@h5.com');
	    }


	    $('#check_ticket').on('click', function(e) {
	        e.preventDefault();
	        bindCheckTicket();
	    })

	    function bindCheckTicket() {
	        getTicket(function(number) {
	            $('#check_ticket').html(number);
	        })
	    }
	    window.getTicket = function(callback) {
	        callback("hongbaonumber@h5.com")
	    }

	    $('#product_detail').on('click', function(e) {
	        e.preventDefault();
	        bindproductDetail();
	    })

	    function bindproductDetail() {
	        getDetail(function(detail) {
	            $('#product_detail').html(detail);
	        })
	    }
	    window.getDetail = function(callback) {
	        callback("detail@h5.com")
	    }


	    /*app端*/
	    JSBK.connectWebViewJavascriptBridge(function(bridge) {

	        bridge.init(function(message, responseCallback) {
	            /*alert('JS got a message', message)
	            var data = { 'Javascript Responds':'Wee!' }
	            alert('JS responding with', data)
	            responseCallback(data)*/
	        })

	        window.getUserSuc = function(callback) {
	            bridge.callHandler('com.hongzhe.bank94.getToken', null, function(response) {
	                callback(response);
	            })
	        };

	        window.getTicket = function(callback) {
	            bridge.callHandler('com.hongzhe.bank94.requestCheckTickets', null, function(response) {
	                callback(response);
	            })
	        };

	        window.getDetail = function(callback) {
	            bridge.callHandler('com.hongzhe.bank94.requestProductDetail', {
	                'proType': '3'
	            }, function(response) {
	                callback(response);
	            })
	        };

	    })

	    $('input').on('keyup', function(v) {

	        if ($(this).val().length === 1) {
	            $(this).next().focus();
	        }
	    })
	    
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */
/***/ function(module, exports) {

	;
	(function(win, doc, $) {

	    var jsbk = win.JSBK || {};

	    jsbk.Utils = {

	        // http://techpatterns.com/downloads/javascript_cookies.php
	        setCookie: function(name, value, expires, path, domain, secure) {
	            // set time, it's in milliseconds
	            var today = new Date();
	            today.setTime(today.getTime());
	            /*
	                if the expires variable is set, make the correct
	                expires time, the current script below will set
	                it for x number of days, to make it for hours,
	                delete * 24, for minutes, delete * 60 * 24
	            */
	            if (expires) {
	                expires = expires * 1000 * 60 * 60 * 24;
	            }
	            var expires_date = new Date(today.getTime() + (expires));

	            doc.cookie = name + "=" + escape(value) +
	                ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
	                ((path) ? ";path=" + path : "") +
	                ((domain) ? ";domain=" + domain : "") +
	                ((secure) ? ";secure" : "");
	        },

	        // this fixes an issue with the old method, ambiguous values
	        // with this test document.cookie.indexOf( name + "=" );
	        getCookie: function(check_name) {
	            // first we'll split this cookie up into name/value pairs
	            // note: document.cookie only returns name=value, not the other components
	            var a_all_cookies = doc.cookie.split(';'),
	                a_temp_cookie = '',
	                cookie_name = '',
	                cookie_value = '',
	                length,
	                b_cookie_found = false; // set boolean t/f default f

	            for (i = 0, length = a_all_cookies.length; i < length; i++) {
	                // now we'll split apart each name=value pair
	                a_temp_cookie = a_all_cookies[i].split('=');
	                // and trim left/right whitespace while we're at it
	                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

	                // if the extracted name matches passed check_name
	                if (cookie_name == check_name) {
	                    b_cookie_found = true;
	                    // we need to handle case where cookie has no value but exists (no = sign, that is):
	                    if (a_temp_cookie.length > 1) {
	                        cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
	                    }
	                    // note that in cases where cookie is initialized but no value, null is returned
	                    return cookie_value;
	                    break;
	                }
	                a_temp_cookie = null;
	                cookie_name = '';
	            }
	            if (!b_cookie_found) {
	                return null;
	            }
	        },

	        // this deletes the cookie when called
	        deleteCookie: function(name, path, domain) {
	            if (this.getCookie(name)) {
	                doc.cookie = name + "=" +
	                    ((path) ? ";path=" + path : "") +
	                    ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
	            }
	        },

	        LocalStorageHelper: function(action, key, val) {
	            try {
	                if (action == "setItem") {
	                    localStorage[action](key, val);
	                    return true;
	                } else {
	                    var result = localStorage[action](key);
	                    return result;
	                }
	            } catch (e) {
	                return false;
	            }
	        },

	        //获取url中"?"符后的字串 
	        GetUrlSearch: function() {
	            var url = location.search; 
	            var theRequest = new Object();
	            if (url.indexOf("?") != -1) {
	                var str = url.substr(1);
	                strs = str.split("&");
	                for (var i = 0; i < strs.length; i++) {
	                    theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
	                }
	            }
	            return theRequest;
	        }
	    };

	    jsbk.connectWebViewJavascriptBridge = function(callback) {
	        if (window.WebViewJavascriptBridge) {
	            callback(WebViewJavascriptBridge)
	        } else {
	            window.WVJBCallbacks = [callback];
	            var WVJBIframe = document.createElement('iframe');
	            WVJBIframe.style.display = 'none';
	            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
	            document.documentElement.appendChild(WVJBIframe);
	            setTimeout(function() {
	                document.documentElement.removeChild(WVJBIframe)
	            }, 0)
	            document.addEventListener('WebViewJavascriptBridgeReady', function() {
	                callback(WebViewJavascriptBridge)
	            }, false)
	        }
	    }
	    win.JSBK = jsbk;
	    
	})(window, document, Zepto);

/***/ },
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 17 */,
/* 18 */
/***/ function(module, exports) {

	;
	(function($) {
	 var Swipe = function(container, options) {
	    var noop = function() {};
	    var offloadFn = function(fn) {
	        setTimeout(fn || noop, 0)
	    };
	    var browser = {
	        addEventListener: !!window.addEventListener,
	        touch: ("ontouchstart" in window) || window.DocumentTouch && document instanceof DocumentTouch,
	        transitions: (function(temp) {
	            var props = ["transitionProperty", "WebkitTransition", "MozTransition", "OTransition", "msTransition"];
	            for (var i in props) {
	                if (temp.style[props[i]] !== undefined) {
	                    return true
	                }
	            }
	            return false
	        })(document.createElement("swipe"))
	    };
	    if (!container) {
	        return
	    }
	    var element = container.children[0];
	    var slides, slidePos, width, length;
	    options = options || {};
	    var index = parseInt(options.startSlide, 10) || 0;
	    var speed = options.speed || 300;
	    options.continuous = options.continuous !== undefined ? options.continuous : true;

	    function setup() {
	        slides = element.children;
	        length = slides.length;
	        if (slides.length < 2) {
	            options.continuous = false
	        }
	        if (browser.transitions && options.continuous && slides.length < 3) {
	            element.appendChild(slides[0].cloneNode(true));
	            element.appendChild(element.children[1].cloneNode(true));
	            slides = element.children
	        }
	        slidePos = new Array(slides.length);
	        width = container.getBoundingClientRect().width || container.offsetWidth;
	        element.style.width = (slides.length * width) + "px";
	        var pos = slides.length;
	        while (pos--) {
	            var slide = slides[pos];
	            slide.style.width = width + "px";
	            slide.setAttribute("data-index", pos);
	            if (browser.transitions) {
	                slide.style.left = (pos * -width) + "px";
	                move(pos, index > pos ? -width : (index < pos ? width : 0), 0)
	            }
	        }
	        if (options.continuous && browser.transitions) {
	            move(circle(index - 1), -width, 0);
	            move(circle(index + 1), width, 0)
	        }
	        if (!browser.transitions) {
	            element.style.left = (index * -width) + "px"
	        }
	        container.style.visibility = "visible"
	    }

	    function prev() {
	        if (options.continuous) {
	            slide(index - 1)
	        } else {
	            if (index) {
	                slide(index - 1)
	            }
	        }
	    }

	    function next() {
	        if (options.continuous) {
	            slide(index + 1)
	        } else {
	            if (index < slides.length - 1) {
	                slide(index + 1)
	            }
	        }
	    }

	    function circle(index) {
	        return (slides.length + (index % slides.length)) % slides.length
	    }

	    function slide(to, slideSpeed) {
	        if (index == to) {
	            return
	        }
	        if (browser.transitions) {
	            var direction = Math.abs(index - to) / (index - to);
	            if (options.continuous) {
	                var natural_direction = direction;
	                direction = -slidePos[circle(to)] / width;
	                if (direction !== natural_direction) {
	                    to = -direction * slides.length + to
	                }
	            }
	            var diff = Math.abs(index - to) - 1;
	            while (diff--) {
	                move(circle((to > index ? to : index) - diff - 1), width * direction, 0)
	            }
	            to = circle(to);
	            move(index, width * direction, slideSpeed || speed);
	            move(to, 0, slideSpeed || speed);
	            if (options.continuous) {
	                move(circle(to - direction), -(width * direction), 0)
	            }
	        } else {
	            to = circle(to);
	            animate(index * -width, to * -width, slideSpeed || speed)
	        }
	        index = to;
	        offloadFn(options.callback && options.callback(index, slides[index]))
	    }

	    function move(index, dist, speed) {
	        translate(index, dist, speed);
	        slidePos[index] = dist
	    }

	    function translate(index, dist, speed) {
	        var slide = slides[index];
	        var style = slide && slide.style;
	        if (!style) {
	            return
	        }
	        style.webkitTransitionDuration = style.MozTransitionDuration = style.msTransitionDuration = style.OTransitionDuration = style.transitionDuration = speed + "ms";
	        style.webkitTransform = "translate(" + dist + "px,0)" + "translateZ(0)";
	        style.msTransform = style.MozTransform = style.OTransform = "translateX(" + dist + "px)"
	    }

	    function animate(from, to, speed) {
	        if (!speed) {
	            element.style.left = to + "px";
	            return
	        }
	        var start = +new Date;
	        var timer = setInterval(function() {
	            var timeElap = +new Date - start;
	            if (timeElap > speed) {
	                element.style.left = to + "px";
	                if (delay) {
	                    begin()
	                }
	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index]);
	                clearInterval(timer);
	                return
	            }
	            element.style.left = (((to - from) * (Math.floor((timeElap / speed) * 100) / 100)) + from) + "px"
	        }, 4)
	    }
	    var delay = options.auto || 0;
	    var interval;

	    function begin() {
	        interval = setTimeout(next, delay)
	    }

	    function stop() {
	        delay = 0;
	        clearTimeout(interval)
	    }
	    var start = {};
	    var delta = {};
	    var isScrolling;
	    var events = {
	        handleEvent: function(event) {
	            switch (event.type) {
	                case "touchstart":
	                    this.start(event);
	                    break;
	                case "touchmove":
	                    this.move(event);
	                    break;
	                case "touchend":
	                    offloadFn(this.end(event));
	                    break;
	                case "webkitTransitionEnd":
	                case "msTransitionEnd":
	                case "oTransitionEnd":
	                case "otransitionend":
	                case "transitionend":
	                    offloadFn(this.transitionEnd(event));
	                    break;
	                case "resize":
	                    offloadFn(setup.call());
	                    break
	            }
	            if (options.stopPropagation) {
	                event.stopPropagation()
	            }
	        },
	        start: function(event) {
	            var touches = event.touches[0];
	            start = {
	                x: touches.pageX,
	                y: touches.pageY,
	                time: +new Date
	            };
	            isScrolling = undefined;
	            delta = {};
	            element.addEventListener("touchmove", this, false);
	            element.addEventListener("touchend", this, false)
	        },
	        move: function(event) {
	            if (event.touches.length > 1 || event.scale && event.scale !== 1) {
	                return
	            }
	            if (options.disableScroll) {
	                event.preventDefault()
	            }
	            var touches = event.touches[0];
	            delta = {
	                x: touches.pageX - start.x,
	                y: touches.pageY - start.y
	            };
	            if (typeof isScrolling == "undefined") {
	                isScrolling = !!(isScrolling || Math.abs(delta.x) < Math.abs(delta.y))
	            }
	            if (!isScrolling) {
	                event.preventDefault();
	                stop();
	                if (options.continuous) {
	                    translate(circle(index - 1), delta.x + slidePos[circle(index - 1)], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(circle(index + 1), delta.x + slidePos[circle(index + 1)], 0)
	                } else {
	                    delta.x = delta.x / ((!index && delta.x > 0 || index == slides.length - 1 && delta.x < 0) ? (Math.abs(delta.x) / width + 1) : 1);
	                    translate(index - 1, delta.x + slidePos[index - 1], 0);
	                    translate(index, delta.x + slidePos[index], 0);
	                    translate(index + 1, delta.x + slidePos[index + 1], 0)
	                }
	            }
	        },
	        end: function(event) {
	            var duration = +new Date - start.time;
	            var isValidSlide = Number(duration) < 250 && Math.abs(delta.x) > 20 || Math.abs(delta.x) > width / 2;
	            var isPastBounds = !index && delta.x > 0 || index == slides.length - 1 && delta.x < 0;
	            if (options.continuous) {
	                isPastBounds = false
	            }
	            var direction = delta.x < 0;
	            if (!isScrolling) {
	                if (isValidSlide && !isPastBounds) {
	                    if (direction) {
	                        if (options.continuous) {
	                            move(circle(index - 1), -width, 0);
	                            move(circle(index + 2), width, 0)
	                        } else {
	                            move(index - 1, -width, 0)
	                        }
	                        move(index, slidePos[index] - width, speed);
	                        move(circle(index + 1), slidePos[circle(index + 1)] - width, speed);
	                        index = circle(index + 1)
	                    } else {
	                        if (options.continuous) {
	                            move(circle(index + 1), width, 0);
	                            move(circle(index - 2), -width, 0)
	                        } else {
	                            move(index + 1, width, 0)
	                        }
	                        move(index, slidePos[index] + width, speed);
	                        move(circle(index - 1), slidePos[circle(index - 1)] + width, speed);
	                        index = circle(index - 1)
	                    }
	                    options.callback && options.callback(index, slides[index])
	                } else {
	                    if (options.continuous) {
	                        move(circle(index - 1), -width, speed);
	                        move(index, 0, speed);
	                        move(circle(index + 1), width, speed)
	                    } else {
	                        move(index - 1, -width, speed);
	                        move(index, 0, speed);
	                        move(index + 1, width, speed)
	                    }
	                }
	            }
	            element.removeEventListener("touchmove", events, false);
	            element.removeEventListener("touchend", events, false)
	        },
	        transitionEnd: function(event) {
	            if (parseInt(event.target.getAttribute("data-index"), 10) == index) {
	                if (delay) {
	                    begin()
	                }
	                options.transitionEnd && options.transitionEnd.call(event, index, slides[index])
	            }
	        }
	    };
	    setup();
	    if (delay) {
	        begin()
	    }
	    if (browser.addEventListener) {
	        if (browser.touch) {
	            element.addEventListener("touchstart", events, false)
	        }
	        if (browser.transitions) {
	            element.addEventListener("webkitTransitionEnd", events, false);
	            element.addEventListener("msTransitionEnd", events, false);
	            element.addEventListener("oTransitionEnd", events, false);
	            element.addEventListener("otransitionend", events, false);
	            element.addEventListener("transitionend", events, false)
	        }
	        window.addEventListener("resize", events, false)
	    } else {
	        window.onresize = function() {
	            setup()
	        }
	    }
	    return {
	        setup: function() {
	            setup()
	        },
	        slide: function(to, speed) {
	            stop();
	            slide(to, speed)
	        },
	        prev: function() {
	            stop();
	            prev()
	        },
	        next: function() {
	            stop();
	            next()
	        },
	        getPos: function() {
	            return index
	        },
	        getNumSlides: function() {
	            return length
	        },
	        kill: function() {
	            stop();
	            element.style.width = "auto";
	            element.style.left = 0;
	            var pos = slides.length;
	            while (pos--) {
	                var slide = slides[pos];
	                slide.style.width = "100%";
	                slide.style.left = 0;
	                if (browser.transitions) {
	                    translate(pos, 0, 0)
	                }
	            }
	            if (browser.addEventListener) {
	                element.removeEventListener("touchstart", events, false);
	                element.removeEventListener("webkitTransitionEnd", events, false);
	                element.removeEventListener("msTransitionEnd", events, false);
	                element.removeEventListener("oTransitionEnd", events, false);
	                element.removeEventListener("otransitionend", events, false);
	                element.removeEventListener("transitionend", events, false);
	                window.removeEventListener("resize", events, false)
	            } else {
	                window.onresize = null
	            }
	        }
	    }
	}

	module.exports = Swipe;

	})(Zepto);

/***/ },
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */
/***/ function(module, exports) {

	;
	(function($) {

	    var LazyLoadImg = function(opt) {
	        var defaults = {
	            min: 0,
	            max: -1,
	            select: 'img',
	            attr: 'data-src',
	            ratioAttr: 'origin',
	            isClip: false,
	            imgRange: 1
	        };
	        this.ops = {};
	        $.extend(this.ops, defaults, opt);
	        this.init();
	    };
	    LazyLoadImg.prototype = {
	        constructor: LazyLoadImg,
	        init: function() {
	            var _this = this,
	                rafStatus = false;

	            // 使用raf代码scoll和touchmove
	            rAf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
	                window.setTimeout(callback, 1000 / 60);
	            };

	            function imgHander() {
	                var $window = $(window),
	                    min = _this.ops.min,
	                    max = _this.ops.max,
	                    wheight = $window.height(),
	                    scrolltop = $window.scrollTop();
	                if (_this.ops.min < scrolltop) {
	                    min = scrolltop;
	                }
	                if (_this.ops.max === -1 || wheight * _this.ops.imgRange + scrolltop < _this.ops.max) {
	                    max = wheight * _this.ops.imgRange + scrolltop;
	                }
	                _this.refreshImg(min, max);
	                rafStatus = false;
	            }

	            function scrollHander() {
	                if (rafStatus === true) {
	                    return;
	                }
	                rafStatus = true;
	                rAf(imgHander);
	            }
	            $(window).scroll(scrollHander);
	            $(document).on('touchmove', scrollHander);
	            // rAf(imgHander);
	            $(window).trigger('scroll');
	        },
	        refreshImg: function(min, max) {
	            var _this = this,
	                style,
	                top;
	            style = this.ops.select.replace('.', '');
	            $(this.ops.select).each(function(index, el) {
	                var $this = $(el);
	                top = $this.offset().top;
	                if (top >= min && top <= max) {
	                    _this.imgReplace($this, _this.ops.attr, _this.ops.ratioAttr, _this.ops.isClip);
	                    $this.removeClass(style);
	                }
	            });
	        },
	        imgReplace: function(dom, attr, ratioAttr, isClip) {
	            var _this = this,
	                attrName = attr || 'data-src',
	                url = dom.attr(attrName),
	                img;
	            if (!url) {
	                return;
	            }
	            if (url) {
	                img = new Image();
	                img.onerror = function() {
	                    // dom.removeAttr('data-src');
	                    return false;
	                };
	                
	                img.onload = function() {
	                    // dom.removeAttr('data-src');
	                    dom.attr('src', url);
	                };

	                img.src = url;
	            }
	        }
	    };

	    module.exports = LazyLoadImg;

	})(Zepto);

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	;
	(function($) {
	    var Confirm = function(op) {
	        var self = this;
	        var defaults = {
	            bgClose         : false,
	            titleHtml       : "确定？",
	            cancleBtnHtml   : "取消",
	            confirmBtnHtml  : "确定",
	            select          : self.getSelect(),
	            cancleCallback  : null,
	            confirmCallback : null
	        };
	        this.ops = $.extend(defaults, op);
	        this.dialog = null;
	        this.init();
	    }

	    Confirm.prototype.init = function() {
	        var self = this;
	        self.setHtml();
	        __webpack_require__(28);
	        var Dialog = __webpack_require__(27);
	        self.dialog = new Dialog( self.ops );
	        self.bindEvent();
	    }

	    Confirm.prototype.open = function() {
	        this.dialog.open();
	    }

	    Confirm.prototype.bindEvent = function() {
	        var self = this;

	        // 绑定： 点击“取消”
	        self.ops.select.on("click", ".cancle-btn", function(e) {
	            e.stopPropagation();
	            if( self.ops.cancleCallback ) {
	                self.ops.cancleCallback(self);
	            } else {
	                self.dialog.close();
	            }
	        });

	        // 绑定： 点击“确定”
	        self.ops.select.on("click", ".confirm-btn", function(e) {
	            e.stopPropagation();
	            if( self.ops.confirmCallback ) {
	                self.ops.confirmCallback(self);
	            } else {
	                self.dialog.close();
	            }
	        });
	    }

	    Confirm.prototype.setHtml = function() {
	        var self = this;
	        self.ops.select.find(".title").html( self.ops.titleHtml );
	        self.ops.select.find(".cancle-btn").html( self.ops.cancleBtnHtml );
	        self.ops.select.find(".confirm-btn").html( self.ops.confirmBtnHtml );
	    }

	    Confirm.prototype.getSelect = function() {
	        return $('<div class="dialog-mod dialog-confirm">' +
	                    '<p class="title"></p>' +
	                    '<div class="btn-wrap">' +
	                        '<span class="btn cancle-btn"></span>' +
	                        '<span class="btn confirm-btn"></span>' +
	                    '</div>' +
	                '</div>');
	    }

	    module.exports = Confirm;

	})(Zepto);


/***/ },
/* 27 */
/***/ function(module, exports) {

	;
	(function($) {

	    var Observer = {
	        listener: {
	            defaults: []
	        },
	        on: function(type, fn, context) {
	            var _type,
	                _fn;
	            if (typeof type !== 'string' && typeof type !== 'undefined') {
	                return;
	            }
	            if (typeof fn !== 'function' && typeof context[fn] !== 'function') {
	                return;
	            }
	            _type = type || 'defaults';
	            _fn = typeof fn === 'function' ? fn : context[fn];
	            if (typeof this.listener[_type] === 'undefined') {
	                this.listener[_type] = [];
	            }
	            this.listener[_type].push({
	                fn: _fn,
	                context: context || this
	            });
	        },
	        off: function(type, fn, context) {
	            var _type = type || 'defaults',
	                sub = this.listener[_type],
	                i,
	                _context = context || this,
	                max = sub ? sub.length : 0;

	            for (i = 0; i < max; i++) {
	                if (sub[i].fn === fn && sub[i].context === _context) {
	                    sub.splice(i, 1);
	                }
	            }
	        },
	        trigger: function(type, args) {
	            var _type = type || 'defaults',
	                sub = this.listener[_type],
	                i,
	                _args,
	                max = sub ? sub.length : 0;
	            if (!$.isArray(args)) { // 为了兼容老的代码，这里必须转一下
	                if (args) {
	                    _args = [args];
	                } else {
	                    _args = [];
	                }
	            }
	            for (i = 0; i < max; i++) {
	                sub[i].fn.apply(sub[i].context, _args);
	            }
	        }
	    };

	    function addPublisher(o) {
	        $.extend(true, o, Observer);
	    }

	    var Dialog = function(opt) {
	        var defaults = {
	            className: 'g-d-dialog',
	            actionEvent: 'click',
	            bgClose: false,
	            targetNode: ''
	        };
	        this.ops = $.extend(defaults, opt);
	        this.dom = {};
	        addPublisher(this);
	        this.init();
	    };

	    Dialog.prototype = {
	        constructor: Dialog,
	        init: function() {
	            var frame = $(document.createDocumentFragment()),
	                _this = this,
	                content,
	                div = $('<div></div>');
	            div.addClass(this.ops.className);
	            frame.append(div);
	            if(this.ops.select){
	                content = $(this.ops.select);
	            }
	            div.append(content||'');
	            $('body').append(frame);
	            this.dom.dialog = div;

	            // 禁止弹层上面的touchmove
	            this.dom.dialog.on('touchmove', function(e) {
	                e.preventDefault();
	            });

	            // 关闭按钮
	            $(this.ops.closeSelect).click(function(event) { // 初始化关闭按钮
	                event.stopPropagation();
	                _this.trigger('dialogClose');
	                _this.close();
	            });

	            // 点击背景关闭
	            if (this.ops.bgClose) {
	                div.click(function(event) { // 点击背景关闭
	                    if (event.target === this) {
	                        event.stopPropagation();
	                        _this.trigger('bgClose');
	                        _this.close();
	                    }
	                });
	            }

	            // 输入框
	            div.find('input').blur(function(event) {
	                event.stopPropagation();
	                _this.fixDrawSlow();
	            });

	            // 打开弹框
	            if (this.ops.targetNode) {
	                $(this.ops.targetNode).on(this.ops.actionEvent, function(event) {
	                    event.stopPropagation();
	                    var arr = [].slice.call(arguments);
	                    _this.open(arr.slice(1));
	                });
	            }
	        },
	        open: function(arg) {
	            this.trigger('open', arg);
	            this.dom.dialog.css('display', '-webkit-box');
	            this.trigger('afteropen', arg);
	        },
	        close: function(arg) {
	            this.dom.dialog.hide();
	            this.trigger('close', arg);
	        },
	        getDialog: function() {
	            return this.dom.dialog;
	        },
	        fixDrawSlow: function() {
	            var top = $(window).scrollTop();
	            setTimeout(function() {
	                $(window).scrollTop(top + 1);
	                setTimeout(function() {
	                    $(window).scrollTop(top);
	                }, 10);
	            }, 1);
	        },
	    };

	    module.exports = Dialog;
	})(Zepto);


/***/ },
/* 28 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
/******/ ]);