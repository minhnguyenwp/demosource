/*
 * http://benalman.com/projects/jquery-outside-events-plugin/
 */
(function($,c,b){$.map("click dblclick mousemove mousedown mouseup mouseover mouseout change select submit keydown keypress keyup".split(" "),function(d){a(d)});a("focusin","focus"+b);a("focusout","blur"+b);$.addOutsideEvent=a;function a(g,e){e=e||g+b;var d=$(),h=g+"."+e+"-special-event";$.event.special[e]={setup:function(){d=d.add(this);if(d.length===1){$(c).bind(h,f)}},teardown:function(){d=d.not(this);if(d.length===0){$(c).unbind(h)}},add:function(i){var j=i.handler;i.handler=function(l,k){l.target=k;j.apply(this,arguments)}}};function f(i){$(d).each(function(){var j=$(this);if(this!==i.target&&!j.has(i.target).length){j.triggerHandler(e,[i.target])}})}}})(jQuery,document,"outside");
/*
 * jQuery FlexSlider v2.2.2
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0,10);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.on(u,function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){t.addEventListener("touchstart",g,!1);function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.slides.width(r.computedW);r.update(r.pagingCount);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},uniqueID:function(t){t.find("[id]").each(function(){var t=e(this);t.attr("id",t.attr("id")+"_clone")});return t},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n);r.container.css("transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args);r.container.css("transform",i)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"));v.uniqueID(r.slides.first().clone().addClass("clone")).appendTo(r.container);v.uniqueID(r.slides.last().clone().addClass("clone")).prependTo(r.container)}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide");r.vars.init(r)};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);(function(e){e.flexslider=function(t,n){var r=e(t);r.vars=e.extend({},e.flexslider.defaults,n);var i=r.vars.namespace,s=window.navigator&&window.navigator.msPointerEnabled&&window.MSGesture,o=("ontouchstart"in window||s||window.DocumentTouch&&document instanceof DocumentTouch)&&r.vars.touch,u="click touchend MSPointerUp",a="",f,l=r.vars.direction==="vertical",c=r.vars.reverse,h=r.vars.itemWidth>0,p=r.vars.animation==="fade",d=r.vars.asNavFor!=="",v={},m=!0;e.data(t,"flexslider",r);v={init:function(){r.animating=!1;r.currentSlide=parseInt(r.vars.startAt?r.vars.startAt:0,10);isNaN(r.currentSlide)&&(r.currentSlide=0);r.animatingTo=r.currentSlide;r.atEnd=r.currentSlide===0||r.currentSlide===r.last;r.containerSelector=r.vars.selector.substr(0,r.vars.selector.search(" "));r.slides=e(r.vars.selector,r);r.container=e(r.containerSelector,r);r.count=r.slides.length;r.syncExists=e(r.vars.sync).length>0;r.vars.animation==="slide"&&(r.vars.animation="swing");r.prop=l?"top":"marginLeft";r.args={};r.manualPause=!1;r.stopped=!1;r.started=!1;r.startTimeout=null;r.transitions=!r.vars.video&&!p&&r.vars.useCSS&&function(){var e=document.createElement("div"),t=["perspectiveProperty","WebkitPerspective","MozPerspective","OPerspective","msPerspective"];for(var n in t)if(e.style[t[n]]!==undefined){r.pfx=t[n].replace("Perspective","").toLowerCase();r.prop="-"+r.pfx+"-transform";return!0}return!1}();r.vars.controlsContainer!==""&&(r.controlsContainer=e(r.vars.controlsContainer).length>0&&e(r.vars.controlsContainer));r.vars.manualControls!==""&&(r.manualControls=e(r.vars.manualControls).length>0&&e(r.vars.manualControls));if(r.vars.randomize){r.slides.sort(function(){return Math.round(Math.random())-.5});r.container.empty().append(r.slides)}r.doMath();r.setup("init");r.vars.controlNav&&v.controlNav.setup();r.vars.directionNav&&v.directionNav.setup();r.vars.keyboard&&(e(r.containerSelector).length===1||r.vars.multipleKeyboard)&&e(document).bind("keyup",function(e){var t=e.keyCode;if(!r.animating&&(t===39||t===37)){var n=t===39?r.getTarget("next"):t===37?r.getTarget("prev"):!1;r.flexAnimate(n,r.vars.pauseOnAction)}});r.vars.mousewheel&&r.bind("mousewheel",function(e,t,n,i){e.preventDefault();var s=t<0?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(s,r.vars.pauseOnAction)});r.vars.pausePlay&&v.pausePlay.setup();r.vars.slideshow&&r.vars.pauseInvisible&&v.pauseInvisible.init();if(r.vars.slideshow){r.vars.pauseOnHover&&r.hover(function(){!r.manualPlay&&!r.manualPause&&r.pause()},function(){!r.manualPause&&!r.manualPlay&&!r.stopped&&r.play()});if(!r.vars.pauseInvisible||!v.pauseInvisible.isHidden())r.vars.initDelay>0?r.startTimeout=setTimeout(r.play,r.vars.initDelay):r.play()}d&&v.asNav.setup();o&&r.vars.touch&&v.touch();(!p||p&&r.vars.smoothHeight)&&e(window).bind("resize orientationchange focus",v.resize);r.find("img").attr("draggable","false");setTimeout(function(){r.vars.start(r)},200)},asNav:{setup:function(){r.asNav=!0;r.animatingTo=Math.floor(r.currentSlide/r.move);r.currentItem=r.currentSlide;r.slides.removeClass(i+"active-slide").eq(r.currentItem).addClass(i+"active-slide");if(!s)r.slides.on(u,function(t){t.preventDefault();var n=e(this),s=n.index(),o=n.offset().left-e(r).scrollLeft();if(o<=0&&n.hasClass(i+"active-slide"))r.flexAnimate(r.getTarget("prev"),!0);else if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass(i+"active-slide")){r.direction=r.currentItem<s?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction,!1,!0,!0)}});else{t._slider=r;r.slides.each(function(){var t=this;t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",function(e){e.preventDefault();e.currentTarget._gesture&&e.currentTarget._gesture.addPointer(e.pointerId)},!1);t.addEventListener("MSGestureTap",function(t){t.preventDefault();var n=e(this),i=n.index();if(!e(r.vars.asNavFor).data("flexslider").animating&&!n.hasClass("active")){r.direction=r.currentItem<i?"next":"prev";r.flexAnimate(i,r.vars.pauseOnAction,!1,!0,!0)}})})}}},controlNav:{setup:function(){r.manualControls?v.controlNav.setupManual():v.controlNav.setupPaging()},setupPaging:function(){var t=r.vars.controlNav==="thumbnails"?"control-thumbs":"control-paging",n=1,s,o;r.controlNavScaffold=e('<ol class="'+i+"control-nav "+i+t+'"></ol>');if(r.pagingCount>1)for(var f=0;f<r.pagingCount;f++){o=r.slides.eq(f);s=r.vars.controlNav==="thumbnails"?'<img src="'+o.attr("data-thumb")+'"/>':"<a>"+n+"</a>";if("thumbnails"===r.vars.controlNav&&!0===r.vars.thumbCaptions){var l=o.attr("data-thumbcaption");""!=l&&undefined!=l&&(s+='<span class="'+i+'caption">'+l+"</span>")}r.controlNavScaffold.append("<li>"+s+"</li>");n++}r.controlsContainer?e(r.controlsContainer).append(r.controlNavScaffold):r.append(r.controlNavScaffold);v.controlNav.set();v.controlNav.active();r.controlNavScaffold.delegate("a, img",u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){r.direction=s>r.currentSlide?"next":"prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},setupManual:function(){r.controlNav=r.manualControls;v.controlNav.active();r.controlNav.bind(u,function(t){t.preventDefault();if(a===""||a===t.type){var n=e(this),s=r.controlNav.index(n);if(!n.hasClass(i+"active")){s>r.currentSlide?r.direction="next":r.direction="prev";r.flexAnimate(s,r.vars.pauseOnAction)}}a===""&&(a=t.type);v.setToClearWatchedEvent()})},set:function(){var t=r.vars.controlNav==="thumbnails"?"img":"a";r.controlNav=e("."+i+"control-nav li "+t,r.controlsContainer?r.controlsContainer:r)},active:function(){r.controlNav.removeClass(i+"active").eq(r.animatingTo).addClass(i+"active")},update:function(t,n){r.pagingCount>1&&t==="add"?r.controlNavScaffold.append(e("<li><a>"+r.count+"</a></li>")):r.pagingCount===1?r.controlNavScaffold.find("li").remove():r.controlNav.eq(n).closest("li").remove();v.controlNav.set();r.pagingCount>1&&r.pagingCount!==r.controlNav.length?r.update(n,t):v.controlNav.active()}},directionNav:{setup:function(){var t=e('<ul class="'+i+'direction-nav"><li><a class="'+i+'prev" href="#">'+r.vars.prevText+'</a></li><li><a class="'+i+'next" href="#">'+r.vars.nextText+"</a></li></ul>");if(r.controlsContainer){e(r.controlsContainer).append(t);r.directionNav=e("."+i+"direction-nav li a",r.controlsContainer)}else{r.append(t);r.directionNav=e("."+i+"direction-nav li a",r)}v.directionNav.update();r.directionNav.bind(u,function(t){t.preventDefault();var n;if(a===""||a===t.type){n=e(this).hasClass(i+"next")?r.getTarget("next"):r.getTarget("prev");r.flexAnimate(n,r.vars.pauseOnAction)}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(){var e=i+"disabled";r.pagingCount===1?r.directionNav.addClass(e).attr("tabindex","-1"):r.vars.animationLoop?r.directionNav.removeClass(e).removeAttr("tabindex"):r.animatingTo===0?r.directionNav.removeClass(e).filter("."+i+"prev").addClass(e).attr("tabindex","-1"):r.animatingTo===r.last?r.directionNav.removeClass(e).filter("."+i+"next").addClass(e).attr("tabindex","-1"):r.directionNav.removeClass(e).removeAttr("tabindex")}},pausePlay:{setup:function(){var t=e('<div class="'+i+'pauseplay"><a></a></div>');if(r.controlsContainer){r.controlsContainer.append(t);r.pausePlay=e("."+i+"pauseplay a",r.controlsContainer)}else{r.append(t);r.pausePlay=e("."+i+"pauseplay a",r)}v.pausePlay.update(r.vars.slideshow?i+"pause":i+"play");r.pausePlay.bind(u,function(t){t.preventDefault();if(a===""||a===t.type)if(e(this).hasClass(i+"pause")){r.manualPause=!0;r.manualPlay=!1;r.pause()}else{r.manualPause=!1;r.manualPlay=!0;r.play()}a===""&&(a=t.type);v.setToClearWatchedEvent()})},update:function(e){e==="play"?r.pausePlay.removeClass(i+"pause").addClass(i+"play").html(r.vars.playText):r.pausePlay.removeClass(i+"play").addClass(i+"pause").html(r.vars.pauseText)}},touch:function(){var e,n,i,o,u,a,f=!1,d=0,v=0,m=0;if(!s){t.addEventListener("touchstart",g,!1);function g(s){if(r.animating)s.preventDefault();else if(window.navigator.msPointerEnabled||s.touches.length===1){r.pause();o=l?r.h:r.w;a=Number(new Date);d=s.touches[0].pageX;v=s.touches[0].pageY;i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o;e=l?v:d;n=l?d:v;t.addEventListener("touchmove",y,!1);t.addEventListener("touchend",b,!1)}}function y(t){d=t.touches[0].pageX;v=t.touches[0].pageY;u=l?e-v:e-d;f=l?Math.abs(u)<Math.abs(d-n):Math.abs(u)<Math.abs(v-n);var s=500;if(!f||Number(new Date)-a>s){t.preventDefault();if(!p&&r.transitions){r.vars.animationLoop||(u/=r.currentSlide===0&&u<0||r.currentSlide===r.last&&u>0?Math.abs(u)/o+2:1);r.setProps(i+u,"setTouch")}}}function b(s){t.removeEventListener("touchmove",y,!1);if(r.animatingTo===r.currentSlide&&!f&&u!==null){var l=c?-u:u,h=l>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(h)&&(Number(new Date)-a<550&&Math.abs(l)>50||Math.abs(l)>o/2)?r.flexAnimate(h,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}t.removeEventListener("touchend",b,!1);e=null;n=null;u=null;i=null}}else{t.style.msTouchAction="none";t._gesture=new MSGesture;t._gesture.target=t;t.addEventListener("MSPointerDown",w,!1);t._slider=r;t.addEventListener("MSGestureChange",E,!1);t.addEventListener("MSGestureEnd",S,!1);function w(e){e.stopPropagation();if(r.animating)e.preventDefault();else{r.pause();t._gesture.addPointer(e.pointerId);m=0;o=l?r.h:r.w;a=Number(new Date);i=h&&c&&r.animatingTo===r.last?0:h&&c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:h&&r.currentSlide===r.last?r.limit:h?(r.itemW+r.vars.itemMargin)*r.move*r.currentSlide:c?(r.last-r.currentSlide+r.cloneOffset)*o:(r.currentSlide+r.cloneOffset)*o}}function E(e){e.stopPropagation();var n=e.target._slider;if(!n)return;var r=-e.translationX,s=-e.translationY;m+=l?s:r;u=m;f=l?Math.abs(m)<Math.abs(-r):Math.abs(m)<Math.abs(-s);if(e.detail===e.MSGESTURE_FLAG_INERTIA){setImmediate(function(){t._gesture.stop()});return}if(!f||Number(new Date)-a>500){e.preventDefault();if(!p&&n.transitions){n.vars.animationLoop||(u=m/(n.currentSlide===0&&m<0||n.currentSlide===n.last&&m>0?Math.abs(m)/o+2:1));n.setProps(i+u,"setTouch")}}}function S(t){t.stopPropagation();var r=t.target._slider;if(!r)return;if(r.animatingTo===r.currentSlide&&!f&&u!==null){var s=c?-u:u,l=s>0?r.getTarget("next"):r.getTarget("prev");r.canAdvance(l)&&(Number(new Date)-a<550&&Math.abs(s)>50||Math.abs(s)>o/2)?r.flexAnimate(l,r.vars.pauseOnAction):p||r.flexAnimate(r.currentSlide,r.vars.pauseOnAction,!0)}e=null;n=null;u=null;i=null;m=0}}},resize:function(){if(!r.animating&&r.is(":visible")){h||r.doMath();if(p)v.smoothHeight();else if(h){r.slides.width(r.computedW);r.update(r.pagingCount);r.setProps()}else if(l){r.viewport.height(r.h);r.setProps(r.h,"setTotal")}else{r.vars.smoothHeight&&v.smoothHeight();r.newSlides.width(r.computedW
);r.setProps(r.computedW,"setTotal")}}},smoothHeight:function(e){if(!l||p){var t=p?r:r.viewport;e?t.animate({height:r.slides.eq(r.animatingTo).height()},e):t.height(r.slides.eq(r.animatingTo).height())}},sync:function(t){var n=e(r.vars.sync).data("flexslider"),i=r.animatingTo;switch(t){case"animate":n.flexAnimate(i,r.vars.pauseOnAction,!1,!0);break;case"play":!n.playing&&!n.asNav&&n.play();break;case"pause":n.pause()}},uniqueID:function(t){t.find("[id]").each(function(){var t=e(this);t.attr("id",t.attr("id")+"_clone")});return t},pauseInvisible:{visProp:null,init:function(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)e[t]+"Hidden"in document&&(v.pauseInvisible.visProp=e[t]+"Hidden");if(v.pauseInvisible.visProp){var n=v.pauseInvisible.visProp.replace(/[H|h]idden/,"")+"visibilitychange";document.addEventListener(n,function(){v.pauseInvisible.isHidden()?r.startTimeout?clearTimeout(r.startTimeout):r.pause():r.started?r.play():r.vars.initDelay>0?setTimeout(r.play,r.vars.initDelay):r.play()})}},isHidden:function(){return document[v.pauseInvisible.visProp]||!1}},setToClearWatchedEvent:function(){clearTimeout(f);f=setTimeout(function(){a=""},3e3)}};r.flexAnimate=function(t,n,s,u,a){!r.vars.animationLoop&&t!==r.currentSlide&&(r.direction=t>r.currentSlide?"next":"prev");d&&r.pagingCount===1&&(r.direction=r.currentItem<t?"next":"prev");if(!r.animating&&(r.canAdvance(t,a)||s)&&r.is(":visible")){if(d&&u){var f=e(r.vars.asNavFor).data("flexslider");r.atEnd=t===0||t===r.count-1;f.flexAnimate(t,!0,!1,!0,a);r.direction=r.currentItem<t?"next":"prev";f.direction=r.direction;if(Math.ceil((t+1)/r.visible)-1===r.currentSlide||t===0){r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");return!1}r.currentItem=t;r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");t=Math.floor(t/r.visible)}r.animating=!0;r.animatingTo=t;n&&r.pause();r.vars.before(r);r.syncExists&&!a&&v.sync("animate");r.vars.controlNav&&v.controlNav.active();h||r.slides.removeClass(i+"active-slide").eq(t).addClass(i+"active-slide");r.atEnd=t===0||t===r.last;r.vars.directionNav&&v.directionNav.update();if(t===r.last){r.vars.end(r);r.vars.animationLoop||r.pause()}if(!p){var m=l?r.slides.filter(":first").height():r.computedW,g,y,b;if(h){g=r.vars.itemMargin;b=(r.itemW+g)*r.move*r.animatingTo;y=b>r.limit&&r.visible!==1?r.limit:b}else r.currentSlide===0&&t===r.count-1&&r.vars.animationLoop&&r.direction!=="next"?y=c?(r.count+r.cloneOffset)*m:0:r.currentSlide===r.last&&t===0&&r.vars.animationLoop&&r.direction!=="prev"?y=c?0:(r.count+1)*m:y=c?(r.count-1-t+r.cloneOffset)*m:(t+r.cloneOffset)*m;r.setProps(y,"",r.vars.animationSpeed);if(r.transitions){if(!r.vars.animationLoop||!r.atEnd){r.animating=!1;r.currentSlide=r.animatingTo}r.container.unbind("webkitTransitionEnd transitionend");r.container.bind("webkitTransitionEnd transitionend",function(){r.wrapup(m)})}else r.container.animate(r.args,r.vars.animationSpeed,r.vars.easing,function(){r.wrapup(m)})}else if(!o){r.slides.eq(r.currentSlide).css({zIndex:1}).animate({opacity:0},r.vars.animationSpeed,r.vars.easing);r.slides.eq(t).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing,r.wrapup)}else{r.slides.eq(r.currentSlide).css({opacity:0,zIndex:1});r.slides.eq(t).css({opacity:1,zIndex:2});r.wrapup(m)}r.vars.smoothHeight&&v.smoothHeight(r.vars.animationSpeed)}};r.wrapup=function(e){!p&&!h&&(r.currentSlide===0&&r.animatingTo===r.last&&r.vars.animationLoop?r.setProps(e,"jumpEnd"):r.currentSlide===r.last&&r.animatingTo===0&&r.vars.animationLoop&&r.setProps(e,"jumpStart"));r.animating=!1;r.currentSlide=r.animatingTo;r.vars.after(r)};r.animateSlides=function(){!r.animating&&m&&r.flexAnimate(r.getTarget("next"))};r.pause=function(){clearInterval(r.animatedSlides);r.animatedSlides=null;r.playing=!1;r.vars.pausePlay&&v.pausePlay.update("play");r.syncExists&&v.sync("pause")};r.play=function(){r.playing&&clearInterval(r.animatedSlides);r.animatedSlides=r.animatedSlides||setInterval(r.animateSlides,r.vars.slideshowSpeed);r.started=r.playing=!0;r.vars.pausePlay&&v.pausePlay.update("pause");r.syncExists&&v.sync("play")};r.stop=function(){r.pause();r.stopped=!0};r.canAdvance=function(e,t){var n=d?r.pagingCount-1:r.last;return t?!0:d&&r.currentItem===r.count-1&&e===0&&r.direction==="prev"?!0:d&&r.currentItem===0&&e===r.pagingCount-1&&r.direction!=="next"?!1:e===r.currentSlide&&!d?!1:r.vars.animationLoop?!0:r.atEnd&&r.currentSlide===0&&e===n&&r.direction!=="next"?!1:r.atEnd&&r.currentSlide===n&&e===0&&r.direction==="next"?!1:!0};r.getTarget=function(e){r.direction=e;return e==="next"?r.currentSlide===r.last?0:r.currentSlide+1:r.currentSlide===0?r.last:r.currentSlide-1};r.setProps=function(e,t,n){var i=function(){var n=e?e:(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo,i=function(){if(h)return t==="setTouch"?e:c&&r.animatingTo===r.last?0:c?r.limit-(r.itemW+r.vars.itemMargin)*r.move*r.animatingTo:r.animatingTo===r.last?r.limit:n;switch(t){case"setTotal":return c?(r.count-1-r.currentSlide+r.cloneOffset)*e:(r.currentSlide+r.cloneOffset)*e;case"setTouch":return c?e:e;case"jumpEnd":return c?e:r.count*e;case"jumpStart":return c?r.count*e:e;default:return e}}();return i*-1+"px"}();if(r.transitions){i=l?"translate3d(0,"+i+",0)":"translate3d("+i+",0,0)";n=n!==undefined?n/1e3+"s":"0s";r.container.css("-"+r.pfx+"-transition-duration",n);r.container.css("transition-duration",n)}r.args[r.prop]=i;(r.transitions||n===undefined)&&r.container.css(r.args);r.container.css("transform",i)};r.setup=function(t){if(!p){var n,s;if(t==="init"){r.viewport=e('<div class="'+i+'viewport"></div>').css({overflow:"hidden",position:"relative"}).appendTo(r).append(r.container);r.cloneCount=0;r.cloneOffset=0;if(c){s=e.makeArray(r.slides).reverse();r.slides=e(s);r.container.empty().append(r.slides)}}if(r.vars.animationLoop&&!h){r.cloneCount=2;r.cloneOffset=1;t!=="init"&&r.container.find(".clone").remove();r.container.append(r.slides.first().clone().addClass("clone").attr("aria-hidden","true")).prepend(r.slides.last().clone().addClass("clone").attr("aria-hidden","true"));v.uniqueID(r.slides.first().clone().addClass("clone")).appendTo(r.container);v.uniqueID(r.slides.last().clone().addClass("clone")).prependTo(r.container)}r.newSlides=e(r.vars.selector,r);n=c?r.count-1-r.currentSlide+r.cloneOffset:r.currentSlide+r.cloneOffset;if(l&&!h){r.container.height((r.count+r.cloneCount)*200+"%").css("position","absolute").width("100%");setTimeout(function(){r.newSlides.css({display:"block"});r.doMath();r.viewport.height(r.h);r.setProps(n*r.h,"init")},t==="init"?100:0)}else{r.container.width((r.count+r.cloneCount)*200+"%");r.setProps(n*r.computedW,"init");setTimeout(function(){r.doMath();r.newSlides.css({width:r.computedW,"float":"left",display:"block"});r.vars.smoothHeight&&v.smoothHeight()},t==="init"?100:0)}}else{r.slides.css({width:"100%","float":"left",marginRight:"-100%",position:"relative"});t==="init"&&(o?r.slides.css({opacity:0,display:"block",webkitTransition:"opacity "+r.vars.animationSpeed/1e3+"s ease",zIndex:1}).eq(r.currentSlide).css({opacity:1,zIndex:2}):r.slides.css({opacity:0,display:"block",zIndex:1}).eq(r.currentSlide).css({zIndex:2}).animate({opacity:1},r.vars.animationSpeed,r.vars.easing));r.vars.smoothHeight&&v.smoothHeight()}h||r.slides.removeClass(i+"active-slide").eq(r.currentSlide).addClass(i+"active-slide");r.vars.init(r)};r.doMath=function(){var e=r.slides.first(),t=r.vars.itemMargin,n=r.vars.minItems,i=r.vars.maxItems;r.w=r.viewport===undefined?r.width():r.viewport.width();r.h=e.height();r.boxPadding=e.outerWidth()-e.width();if(h){r.itemT=r.vars.itemWidth+t;r.minW=n?n*r.itemT:r.w;r.maxW=i?i*r.itemT-t:r.w;r.itemW=r.minW>r.w?(r.w-t*(n-1))/n:r.maxW<r.w?(r.w-t*(i-1))/i:r.vars.itemWidth>r.w?r.w:r.vars.itemWidth;r.visible=Math.floor(r.w/r.itemW);r.move=r.vars.move>0&&r.vars.move<r.visible?r.vars.move:r.visible;r.pagingCount=Math.ceil((r.count-r.visible)/r.move+1);r.last=r.pagingCount-1;r.limit=r.pagingCount===1?0:r.vars.itemWidth>r.w?r.itemW*(r.count-1)+t*(r.count-1):(r.itemW+t)*r.count-r.w-t}else{r.itemW=r.w;r.pagingCount=r.count;r.last=r.count-1}r.computedW=r.itemW-r.boxPadding};r.update=function(e,t){r.doMath();if(!h){e<r.currentSlide?r.currentSlide+=1:e<=r.currentSlide&&e!==0&&(r.currentSlide-=1);r.animatingTo=r.currentSlide}if(r.vars.controlNav&&!r.manualControls)if(t==="add"&&!h||r.pagingCount>r.controlNav.length)v.controlNav.update("add");else if(t==="remove"&&!h||r.pagingCount<r.controlNav.length){if(h&&r.currentSlide>r.last){r.currentSlide-=1;r.animatingTo-=1}v.controlNav.update("remove",r.last)}r.vars.directionNav&&v.directionNav.update()};r.addSlide=function(t,n){var i=e(t);r.count+=1;r.last=r.count-1;l&&c?n!==undefined?r.slides.eq(r.count-n).after(i):r.container.prepend(i):n!==undefined?r.slides.eq(n).before(i):r.container.append(i);r.update(n,"add");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.added(r)};r.removeSlide=function(t){var n=isNaN(t)?r.slides.index(e(t)):t;r.count-=1;r.last=r.count-1;isNaN(t)?e(t,r.slides).remove():l&&c?r.slides.eq(r.last).remove():r.slides.eq(t).remove();r.doMath();r.update(n,"remove");r.slides=e(r.vars.selector+":not(.clone)",r);r.setup();r.vars.removed(r)};v.init()};e(window).blur(function(e){focused=!1}).focus(function(e){focused=!0});e.flexslider.defaults={namespace:"flex-",selector:".slides > li",animation:"fade",easing:"swing",direction:"horizontal",reverse:!1,animationLoop:!0,smoothHeight:!1,startAt:0,slideshow:!0,slideshowSpeed:7e3,animationSpeed:600,initDelay:0,randomize:!1,thumbCaptions:!1,pauseOnAction:!0,pauseOnHover:!1,pauseInvisible:!0,useCSS:!0,touch:!0,video:!1,controlNav:!0,directionNav:!0,prevText:"Previous",nextText:"Next",keyboard:!0,multipleKeyboard:!1,mousewheel:!1,pausePlay:!1,pauseText:"Pause",playText:"Play",controlsContainer:"",manualControls:"",sync:"",asNavFor:"",itemWidth:0,itemMargin:0,minItems:1,maxItems:0,move:0,allowOneSlide:!0,start:function(){},before:function(){},after:function(){},end:function(){},added:function(){},removed:function(){},init:function(){}};e.fn.flexslider=function(t){t===undefined&&(t={});if(typeof t=="object")return this.each(function(){var n=e(this),r=t.selector?t.selector:".slides > li",i=n.find(r);if(i.length===1&&t.allowOneSlide===!0||i.length===0){i.fadeIn(400);t.start&&t.start(n)}else n.data("flexslider")===undefined&&new e.flexslider(this,t)});var n=e(this).data("flexslider");switch(t){case"play":n.play();break;case"pause":n.pause();break;case"stop":n.stop();break;case"next":n.flexAnimate(n.getTarget("next"),!0);break;case"prev":case"previous":n.flexAnimate(n.getTarget("prev"),!0);break;default:typeof t=="number"&&n.flexAnimate(t,!0)}}})(jQuery);

/*
    Copyright 2009 Itamar Arjuan
    jsDatePick is distributed under the terms of the GNU General Public License.
    This JsDatePick makes use of the jQuery library found at http://jquery.com/
*/
/*
    Configuration settings documentation:
    
    useMode (Integer) – Possible values are 1 and 2 as follows:
        1 – The calendar's HTML will be directly appended to the field supplied by target
        2 – The calendar will appear as a popup when the field with the id supplied in target is clicked.
    
    target (String) – The id of the field to attach the calendar to , usually a text input field when using useMode 2.
    
    isStripped (Boolean) – When set to true the calendar appears without the visual design - usually used with useMode 1
    
    selectedDate (Object) – When supplied , this object tells the calendar to open up with this date selected already.
    
    yearsRange (Array) – When supplied , this array sets the limits for the years enabled in the calendar.
    
    limitToToday (Boolean) – Enables you to limit the possible picking days to today's date.
    
    cellColorScheme (String) – Enables you to swap the colors of the date's cells from a wide range of colors.
        Available color schemes: torqoise,purple,pink,orange,peppermint,aqua,armygreen,bananasplit,beige,
        deepblue,greenish,lightgreen,  ocean_blue <-default
    
    dateFormat (String) - Enables you to easily switch the date format without any hassle at all! 
        Should you not supply anything this field will default to: "%m-%d-%Y"
        
        Possible values to use in the date format:
        
        %d - Day of the month, 2 digits with leading zeros
        %j - Day of the month without leading zeros
        
        %m - Numeric representation of a month, with leading zeros
        %M - A short textual representation of a month, three letters
        %n - Numeric representation of a month, without leading zeros
        %F - A full textual representation of a month, such as January or March
        
        %Y - A full numeric representation of a year, 4 digits
        %y - A two digit representation of a year
        
        You can of course put whatever divider you want between them.
        
    weekStartDay (Integer) : Enables you to change the day that the week starts on.
        Possible values 0 (Sunday) through 6 (Saturday)
        Default value is 1 (Monday)
        
    Note: We have implemented a way to change the image path of the img folder should you decide you want to move it somewhere else.
    Please read through the instructions on how to carefully accomplish that just in the next comment!
    
    Thanks for using my calendar !
    Itamar :-)
    
    itamar.arjuan@gmail.com
    
*/
// The language array - change these values to your language to better fit your needs!
g_l = [];
g_l["MONTHS"] = ["Janaury","February","March","April","May","June","July","August","September","October","November","December"];
g_l["DAYS_3"] = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
g_l["MONTH_FWD"] = "Move a month forward";
g_l["MONTH_BCK"] = "Move a month backward";
g_l["YEAR_FWD"] = "Move a year forward";
g_l["YEAR_BCK"] = "Move a year backward";
g_l["CLOSE"] = "Close the calendar";
g_l["ERROR_2"] = g_l["ERROR_1"] = "Date object invalid!";
g_l["ERROR_4"] = g_l["ERROR_3"] = "Target invalid!";

/* Changing the image path: WARNING! */
/*
    The image path can be changed easily , however a few important
    safety steps must take place!
    
    CSS as a rule-of-thumb is always looking for relative image paths to where the CSS
    file resides. Meaning , if we place the css document of JsDatePick somewhere else
    Since some of the elements inside the CSS have  background:url(img/someimage.png);
    
    The system will try to look for a file under the same folder where the CSS file is.
    So pay careful attention when moving the CSS file somewhere else as the images folder
    must be relative to it. If you want to put the CSS document somewhere else and the images somewhere
    else - you HAVE to look and replace each background:url(img/someimage.png); to the new path you desire.
    
    That way you ensure risk free operation of images.
    For any further questions or support about this issue - please consider the feedback form
    at javascriptcalendar.org
    Thank you!
*/
g_jsDatePickImagePath = "img/";
g_jsDatePickDirectionality = "ltr";

g_arrayOfUsedJsDatePickCalsGlobalNumbers = [];
g_arrayOfUsedJsDatePickCals = [];
g_currentDateObject = {};
g_currentDateObject.dateObject = new Date();

g_currentDateObject.day = g_currentDateObject.dateObject.getDate();
g_currentDateObject.month = g_currentDateObject.dateObject.getMonth() + 1;
g_currentDateObject.year = g_currentDateObject.dateObject.getFullYear();

String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
};
String.prototype.ltrim = function() {
    return this.replace(/^\s+/,"");
};
String.prototype.rtrim = function() {
    return this.replace(/\s+$/,"");
};
String.prototype.strpad=function(){
    return (!isNaN(this) && this.toString().length==1)?"0"+this:this;
};

JsDatePick = function(configurationObject){
    
    if (document.all){
        this.isie = true;
        this.iever = JsDatePick.getInternetExplorerVersion();
    } else {
        this.isie = false;
    }
    
    this.oConfiguration = {};
    this.oCurrentDay = g_currentDateObject;
    this.monthsTextualRepresentation = g_l["MONTHS"];
    
    this.lastPostedDay = null;
    
    this.initialZIndex = 2;
    
    this.globalNumber = this.getUnUsedGlobalNumber();
    g_arrayOfUsedJsDatePickCals[this.globalNumber] = this;
    
    this.setConfiguration(configurationObject);
    this.makeCalendar();
};

JsDatePick.getCalInstanceById=function(id){ return g_arrayOfUsedJsDatePickCals[parseInt(id,10)]; };

JsDatePick.getInternetExplorerVersion=function(){
    var rv = -1, ua, re;
    if (navigator.appName == 'Microsoft Internet Explorer'){
        ua = navigator.userAgent;
        re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null){
          rv = parseFloat( RegExp.$1 );
        }
        return rv;
    }
};

JsDatePick.prototype.setC = function(obj, aClassName){
    if (this.isie && this.iever > 7){
        $(obj).attr("class", aClassName);
    } else {
        obj.className = aClassName;
    }
};

JsDatePick.prototype.getUnUsedGlobalNumber = function(){
    
    var aNum = Math.floor(Math.random()*1000);
    
    while ( ! this.isUnique_GlobalNumber(aNum) ){
        aNum = Math.floor(Math.random()*1000);
    }
    
    return aNum;
};

JsDatePick.prototype.isUnique_GlobalNumber = function(aNum){
    var i;
    for (i=0; i<g_arrayOfUsedJsDatePickCalsGlobalNumbers.length; i++){
        if (g_arrayOfUsedJsDatePickCalsGlobalNumbers[i] == aNum){
            return false;
        }
    }
    return true;
};

JsDatePick.prototype.addOnSelectedDelegate = function(aDelegatedFunction){
    if (typeof(aDelegatedFunction) == "function"){
        this.addonSelectedDelegate = aDelegatedFunction;
    }
    return false;
};

JsDatePick.prototype.setOnSelectedDelegate = function(aDelegatedFunction){
    if (typeof(aDelegatedFunction) == "function"){
        this.onSelectedDelegate = aDelegatedFunction;
        return true;
    }
    return false;
};

JsDatePick.prototype.executeOnSelectedDelegateIfExists = function(){
    if (typeof(this.onSelectedDelegate) == "function"){
        this.onSelectedDelegate();
    }
    if (typeof(this.addonSelectedDelegate) == "function"){
        this.addonSelectedDelegate();
    }
};

JsDatePick.prototype.setRepopulationDelegate = function(aDelegatedFunction){
    if (typeof(aDelegatedFunction) == "function"){
        this.repopulationDelegate = aDelegatedFunction;
        return true;
    }
    return false;
};

JsDatePick.prototype.setConfiguration = function(aConf){
    this.oConfiguration.isStripped      = (aConf["isStripped"] != null) ? aConf["isStripped"] : false;
    this.oConfiguration.useMode         = (aConf["useMode"] != null) ? aConf["useMode"] : 1;
    this.oConfiguration.selectedDate    = (aConf["selectedDate"] != null) ? aConf["selectedDate"] : null;
    this.oConfiguration.target          = (aConf["target"] != null) ? aConf["target"] : null;
    this.oConfiguration.yearsRange      = (aConf["yearsRange"] != null) ? aConf["yearsRange"] : [1971,2100];
    this.oConfiguration.limitToToday    = (aConf["limitToToday"] != null) ? aConf["limitToToday"] : false;
    this.oConfiguration.field           = (aConf["field"] != null) ? aConf["field"] : false;
    this.oConfiguration.cellColorScheme = (aConf["cellColorScheme"] != null) ? aConf["cellColorScheme"] : "ocean_blue";
    this.oConfiguration.dateFormat      = (aConf["dateFormat"] != null) ? aConf["dateFormat"] : "%m-%d-%Y";
    this.oConfiguration.imgPath         = (g_jsDatePickImagePath.length != null) ? g_jsDatePickImagePath : "img/";
    this.oConfiguration.weekStartDay    = (aConf["weekStartDay"] != null) ? aConf["weekStartDay"] : 1;
    
    this.selectedDayObject = {};
    this.flag_DayMarkedBeforeRepopulation = false;
    this.flag_aDayWasSelected = false;
    this.lastMarkedDayObject = null;
    
    if (!this.oConfiguration.selectedDate){
        this.currentYear    = this.oCurrentDay.year;
        this.currentMonth   = this.oCurrentDay.month;
        this.currentDay     = this.oCurrentDay.day;
    }
};

JsDatePick.prototype.resizeCalendar = function(){
    this.leftWallStrechedElement.style.height = "0px";
    this.rightWallStrechedElement.style.height = "0px";
    
    var totalHeight = this.JsDatePickBox.offsetHeight, newStrechedHeight = totalHeight-16;  
    
    if (newStrechedHeight < 0){
        return;
    }
    
    this.leftWallStrechedElement.style.height = newStrechedHeight+"px";
    this.rightWallStrechedElement.style.height = newStrechedHeight+"px";
    return true;
};

JsDatePick.prototype.closeCalendar = function(){
    this.JsDatePickBox.style.display = "none";
    document.onclick=function(){};
};

JsDatePick.prototype.populateFieldWithSelectedDate = function(){
    $("#"+this.oConfiguration.target).val(this.getSelectedDayFormatted());
    if (this.lastPickedDateObject){
        delete(this.lastPickedDateObject);
    }
    this.lastPickedDateObject = {};
    this.lastPickedDateObject.day = this.selectedDayObject.day;
    this.lastPickedDateObject.month = this.selectedDayObject.month;
    this.lastPickedDateObject.year = this.selectedDayObject.year;
    
    this.closeCalendar();
};

JsDatePick.prototype.makeCalendar = function(){
    var d = document, JsDatePickBox, clearfix, closeButton,leftWall,rightWall,topWall,bottomWall,topCorner,bottomCorner,wall,inputElement,aSpan,aFunc;
    
    JsDatePickBox = d.createElement("div");
    clearfix        = d.createElement("div");
    closeButton     = d.createElement("div");
    
    this.setC(JsDatePickBox, "JsDatePickBox");
    this.setC(clearfix, "clearfix");
    this.setC(closeButton, "jsDatePickCloseButton");
    closeButton.setAttribute("globalNumber",this.globalNumber);
    
    closeButton.onmouseover = function(){
        var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["CLOSE"]);
        gRef.setC(this, "jsDatePickCloseButtonOver");
    };
    
    closeButton.onmouseout = function(){
        var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "jsDatePickCloseButton");
    };
    
    closeButton.onmousedown = function(){
        var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["CLOSE"]);
        gRef.setC(this, "jsDatePickCloseButtonDown");
    };
    
    closeButton.onmouseup = function(){
        var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "jsDatePickCloseButton");
        gRef.closeCalendar();
    };
    
    this.JsDatePickBox = JsDatePickBox;
    
    leftWall    = d.createElement("div");
    rightWall   = d.createElement("div");
    topWall     = d.createElement("div");
    bottomWall  = d.createElement("div");
    
    this.setC(topWall, "topWall");
    this.setC(bottomWall, "bottomWall");
    
    if (this.isie && this.iever == 6){
        bottomWall.style.bottom = "-2px";
    }
    
    topCorner    = d.createElement("div");
    bottomCorner = d.createElement("div");
    wall         = d.createElement("div");
    
    this.setC(topCorner, "leftTopCorner");
    this.setC(bottomCorner, "leftBottomCorner");
    this.setC(wall, "leftWall");
    
    this.leftWallStrechedElement = wall;
    this.leftWall  = leftWall;
    this.rightWall = rightWall;
    
    leftWall.appendChild(topCorner);
    leftWall.appendChild(wall);
    leftWall.appendChild(bottomCorner);
    
    topCorner    = d.createElement("div");
    bottomCorner = d.createElement("div");
    wall         = d.createElement("div");
    
    this.setC(topCorner, "rightTopCorner");
    this.setC(bottomCorner, "rightBottomCorner");
    this.setC(wall, "rightWall");
    
    this.rightWallStrechedElement = wall;
    
    rightWall.appendChild(topCorner);
    rightWall.appendChild(wall);
    rightWall.appendChild(bottomCorner);
    
    if (this.oConfiguration.isStripped){
        this.setC(leftWall, "hiddenBoxLeftWall");
        this.setC(rightWall, "hiddenBoxRightWall");             
    } else {
        this.setC(leftWall, "boxLeftWall");
        this.setC(rightWall, "boxRightWall");
    }
    
    JsDatePickBox.appendChild(leftWall);
    JsDatePickBox.appendChild(this.getDOMCalendarStripped());
    JsDatePickBox.appendChild(rightWall);
    JsDatePickBox.appendChild(clearfix);
    
    if (!this.oConfiguration.isStripped){
        JsDatePickBox.appendChild(closeButton);
        JsDatePickBox.appendChild(topWall);
        JsDatePickBox.appendChild(bottomWall);
    }
    
    if (this.oConfiguration.useMode == 2){
        if (this.oConfiguration.target != false){
            if (typeof($("#"+this.oConfiguration.target)) != null){
                inputElement = document.getElementById(this.oConfiguration.target);
        
                aSpan = document.createElement("span");
                inputElement.parentNode.replaceChild(aSpan,inputElement);
                aSpan.appendChild(inputElement);
        
                inputElement.setAttribute("globalNumber",this.globalNumber);
                inputElement.onclick = function(){ JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar(); };
                inputElement.onfocus = function(){ JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")).showCalendar(); };
                
                aSpan.style.position = "relative";
                this.initialZIndex++;
                
                JsDatePickBox.style.zIndex = this.initialZIndex.toString();
                JsDatePickBox.style.position = "absolute";
               
                JsDatePickBox.style.left = "0px";
                JsDatePickBox.style.display = "none";
                aSpan.appendChild(JsDatePickBox);
                
                aFunc = new Function("g_arrayOfUsedJsDatePickCals["+this.globalNumber+"].populateFieldWithSelectedDate();");
                
                this.setOnSelectedDelegate(aFunc);
            } else {
                alert(g_l["ERROR_3"]);
            }
        }
    } else {
        if (this.oConfiguration.target != null){
            $("#"+this.oConfiguration.target).append(JsDatePickBox);
            $("#"+this.oConfiguration.target).css("position","relative");
            JsDatePickBox.style.position = "absolute";
            JsDatePickBox.style.top = "0px";
            JsDatePickBox.style.left = "0px";
            this.resizeCalendar();
            this.executePopulationDelegateIfExists();
        } else {
            alert(g_l["ERROR_4"]);
        }
    }
};

JsDatePick.prototype.determineFieldDate = function(){
    var aField,divider,dateMold,array,array2,i,dI,yI,mI,tflag=false,fflag=false;
    if (this.lastPickedDateObject){
        this.setSelectedDay({
            year:parseInt(this.lastPickedDateObject.year),
            month:parseInt(this.lastPickedDateObject.month,10),
            day:parseInt(this.lastPickedDateObject.day,10)
        });
    } else {
        aField = $("#"+this.oConfiguration.target);
        
        if (jQuery.trim(aField.val()).length == 0){
            this.unsetSelection();
            if (typeof(this.oConfiguration.selectedDate) == "object" && this.oConfiguration.selectedDate){
                this.setSelectedDay({
                    year:parseInt(this.oConfiguration.selectedDate.year),
                    month:parseInt(this.oConfiguration.selectedDate.month,10),
                    day:parseInt(this.oConfiguration.selectedDate.day,10)
                });
            }
        } else {
            if (jQuery.trim(aField.val()).length > 5){
                divider = this.senseDivider(this.oConfiguration.dateFormat);
                dateMold = this.oConfiguration.dateFormat;
                array   = jQuery.trim(aField.val()).split(divider);
                array2  = dateMold.trim().split(divider);
                i=dI=yI=mI=0;
                
                for (i=0; i<array2.length; i++){
                    switch (array2[i]){
                        case "%d": case "%j": dI = i; break;
                        case "%m": case "%n": mI = i; break;
                        case "%M": mI = i; tflag=true; break;
                        case "%F": mI = i; fflag=true; break;
                        case "%Y": case "%y": yI = i;
                    }
                }
                
                if (tflag){
                    for (i=0; i<12; i++){
                        if (g_l["MONTHS"][i].substr(0,3).toUpperCase() == array[mI].toUpperCase()){
                            mI = i+1; break;
                        }
                    }
                } else if (fflag){
                    for (i=0; i<12; i++){
                        if (g_l["MONTHS"][i].toLowerCase() == array[mI].toLowerCase()){
                            mI = i+1; break;
                        }
                    }
                } else {
                    mI = parseInt(array[mI],10);
                }
                
                this.setSelectedDay({
                    year:parseInt(array[yI],10),
                    month:mI,
                    day:parseInt(array[dI],10)
                });
            } else {
                this.unsetSelection();
                return;
            }
        }
    }
};

JsDatePick.prototype.senseDivider=function(aStr){return aStr.replace("%d","").replace("%j","").replace("%m","").replace("%M","").replace("%n","").replace("%F","").replace("%Y","").replace("%y","").substr(0,1);};

JsDatePick.prototype.showCalendar = function(){ 
    if (this.JsDatePickBox.style.display == "none"){
        this.determineFieldDate();
        this.JsDatePickBox.style.display = "block";
        this.resizeCalendar();
        this.executePopulationDelegateIfExists();
        $(this.JsDatePickBox).mouseover(function(){ document.onclick=function(){}; });
        $(this.JsDatePickBox).attr("globalCalNumber", this.globalNumber);
        $(this.JsDatePickBox).mouseout(function(){
            document.onclick = new Function("g_arrayOfUsedJsDatePickCals["+this.getAttribute("globalCalNumber")+"].closeCalendar();");
        });
    } else {
        return;
    }
};

JsDatePick.prototype.isAvailable = function(y, m, d){
    if (y > this.oCurrentDay.year){
        return false;
    }
    
    if (m > this.oCurrentDay.month && y == this.oCurrentDay.year){
        return false;
    }
    
    if (d > this.oCurrentDay.day && m == this.oCurrentDay.month && y == this.oCurrentDay.year ){
        return false;
    }
    
    return true;
};

JsDatePick.prototype.getDOMCalendarStripped = function(){
    var d = document,boxMain,boxMainInner,clearfix,boxMainCellsContainer,tooltip,weekDaysRow,clearfix2;
    
    boxMain = d.createElement("div");
    if (this.oConfiguration.isStripped){
        this.setC(boxMain, "boxMainStripped");      
    } else {
        this.setC(boxMain, "boxMain");
    }
    
    this.boxMain = boxMain;
    
    boxMainInner            = d.createElement("div");
    clearfix                = d.createElement("div");
    boxMainCellsContainer   = d.createElement("div");
    tooltip                 = d.createElement("div");
    weekDaysRow             = d.createElement("div");
    clearfix2               = d.createElement("div");
    
    this.setC(clearfix, "clearfix");
    this.setC(clearfix2, "clearfix");
    this.setC(boxMainInner, "boxMainInner");
    this.setC(boxMainCellsContainer, "boxMainCellsContainer");
    this.setC(tooltip, "tooltip");
    this.setC(weekDaysRow, "weekDaysRow");
    
    this.tooltip = tooltip;
    
    boxMain.appendChild(boxMainInner);
    
    this.controlsBar = this.getDOMControlBar();
    this.makeDOMWeekDays(weekDaysRow);
    
    boxMainInner.appendChild(this.controlsBar);
    boxMainInner.appendChild(clearfix);
    boxMainInner.appendChild(tooltip);
    boxMainInner.appendChild(weekDaysRow);
    boxMainInner.appendChild(boxMainCellsContainer);
    boxMainInner.appendChild(clearfix2);
    
    this.boxMainCellsContainer = boxMainCellsContainer;
    this.populateMainBox(boxMainCellsContainer);
    
    return boxMain;
};

JsDatePick.prototype.makeDOMWeekDays = function(aWeekDaysRow){
    var i=0,d = document,weekDaysArray = g_l["DAYS_3"],textNode,weekDay;    
    
    for (i=this.oConfiguration.weekStartDay; i<7; i++){
        weekDay     = d.createElement("div");
        textNode    = d.createTextNode(weekDaysArray[i]);
        this.setC(weekDay, "weekDay");
        
        weekDay.appendChild(textNode);
        aWeekDaysRow.appendChild(weekDay);
    }
    
    if (this.oConfiguration.weekStartDay > 0){
        for (i=0; i<this.oConfiguration.weekStartDay; i++){
            weekDay     = d.createElement("div");
            textNode    = d.createTextNode(weekDaysArray[i]);
            this.setC(weekDay, "weekDay");
            
            weekDay.appendChild(textNode);
            aWeekDaysRow.appendChild(weekDay);
        }
    }
    weekDay.style.marginRight = "0px";
};

JsDatePick.prototype.repopulateMainBox = function(){
    while (this.boxMainCellsContainer.firstChild){
        this.boxMainCellsContainer.removeChild(this.boxMainCellsContainer.firstChild);
    }
    
    this.populateMainBox(this.boxMainCellsContainer);
    this.resizeCalendar();
    this.executePopulationDelegateIfExists();
};

JsDatePick.prototype.executePopulationDelegateIfExists = function(){
    if (typeof(this.repopulationDelegate) == "function"){
        this.repopulationDelegate();
    }
};

JsDatePick.prototype.populateMainBox = function(aMainBox){
    var d = document,aDayDiv,aTextNode,columnNumber = 1,disabledDayFlag = false,cmpMonth = this.currentMonth-1,oDay,iStamp,skipDays,i,currentColorScheme;
    
    oDay = new Date(this.currentYear, cmpMonth, 1,1,0,0);
    iStamp = oDay.getTime();
    
    this.flag_DayMarkedBeforeRepopulation = false;
    this.setControlBarText(this.monthsTextualRepresentation[cmpMonth] + ", " + this.currentYear);
    
    skipDays = parseInt(oDay.getDay())-this.oConfiguration.weekStartDay;    
    if (skipDays < 0){
        skipDays = skipDays + 7;
    }
    
    i=0;
    for (i=0; i<skipDays; i++){
        aDayDiv = d.createElement("div");
        this.setC(aDayDiv, "skipDay");
        aMainBox.appendChild(aDayDiv);
        if (columnNumber == 7){
            columnNumber = 1;
        } else {
            columnNumber++;
        }
    }
    
    while (oDay.getMonth() == cmpMonth){
        disabledDayFlag = false;
        aDayDiv     = d.createElement("div");
        
        if (this.lastPostedDay){
            if (this.lastPostedDay == oDay.getDate()){
                aTextNode   = parseInt(this.lastPostedDay,10)+1;
            } else {
                aTextNode   = d.createTextNode(oDay.getDate());
            }
        } else {
            aTextNode   = d.createTextNode(oDay.getDate());
        }
        
        aDayDiv.appendChild(aTextNode);
        aMainBox.appendChild(aDayDiv);
        
        aDayDiv.setAttribute("globalNumber",this.globalNumber);
        
        if (columnNumber == 7){
            if (g_jsDatePickDirectionality == "ltr"){
                aDayDiv.style.marginRight = "0px";
            } else {
                aDayDiv.style.marginLeft = "0px";
            }
        }
        
        if (this.isToday(oDay)){
            aDayDiv.setAttribute("isToday",1);
        }
        
        if (this.oConfiguration.limitToToday){
            if ( ! this.isAvailable(this.currentYear, this.currentMonth, parseInt(oDay.getDate()) ) ){
                disabledDayFlag = true;
                aDayDiv.setAttribute("isJsDatePickDisabled",1);
            }
        }

        aDayDiv.onmouseover = function(){
            var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),currentColorScheme;
            currentColorScheme = gRef.getCurrentColorScheme();
            
            if (parseInt(this.getAttribute("isSelected")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isToday")) == 1){
                gRef.setC(this, "dayOverToday");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayOver.gif) left top no-repeat";
            } else {
                gRef.setC(this, "dayOver");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayOver.gif) left top no-repeat";
            }
        };
        
        aDayDiv.onmouseout = function(){
            var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),currentColorScheme;
            currentColorScheme = gRef.getCurrentColorScheme();
            
            if (parseInt(this.getAttribute("isSelected")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isToday")) == 1){
                gRef.setC(this, "dayNormalToday");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
            } else {
                gRef.setC(this, "dayNormal");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
            }
        };
        
        aDayDiv.onmousedown = function(){
            var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),currentColorScheme;
            currentColorScheme = gRef.getCurrentColorScheme();
            
            if (parseInt(this.getAttribute("isSelected")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isToday")) == 1){
                gRef.setC(this, "dayDownToday");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayDown.gif) left top no-repeat";
            } else {
                gRef.setC(this, "dayDown");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayDown.gif) left top no-repeat";
            }
        };
        
        aDayDiv.onmouseup = function(){
            var gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber")),currentColorScheme;
            currentColorScheme = gRef.getCurrentColorScheme();
            
            if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
                return;
            }
            if (parseInt(this.getAttribute("isToday")) == 1){
                gRef.setC(this, "dayNormalToday");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
            } else {
                gRef.setC(this, "dayNormal");
                //this.style.background = "url(" + gRef.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
            }
            
            gRef.setDaySelection(this);
            gRef.executeOnSelectedDelegateIfExists();
        };
    
        if (this.isSelectedDay(oDay.getDate())){
            aDayDiv.setAttribute("isSelected",1);
            this.flag_DayMarkedBeforeRepopulation = true;
            this.lastMarkedDayObject = aDayDiv;
            
            if (parseInt(aDayDiv.getAttribute("isToday")) == 1){
                this.setC(aDayDiv, "dayDownToday");
                //aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayDown.gif) left top no-repeat";
            } else {
                this.setC(aDayDiv, "dayDown");
                //aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayDown.gif) left top no-repeat";
            }
            
        } else {            
            currentColorScheme = this.getCurrentColorScheme();
            
            if (parseInt(aDayDiv.getAttribute("isToday")) == 1){
                if (disabledDayFlag){
                    this.setC(aDayDiv, "dayDisabled");
                   // aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat";
                } else {
                    this.setC(aDayDiv, "dayNormalToday");
                    //aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat";
                }
            } else {
                if (disabledDayFlag){
                    this.setC(aDayDiv, "dayDisabled");
                   // aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat";
                } else {
                    this.setC(aDayDiv, "dayNormal");
                   // aDayDiv.style.background = "url(" + this.oConfiguration.imgPath + this.oConfiguration.cellColorScheme + "_dayNormal.gif) left top no-repeat";
                }
            }
        }
        
        if (columnNumber == 7){
            columnNumber = 1;
        } else {
            columnNumber++;
        }
        iStamp += 86400000;
        oDay.setTime(iStamp);
    }
    
    this.lastPostedDay = null;
    
    return aMainBox;
};

JsDatePick.prototype.unsetSelection = function(){
    this.flag_aDayWasSelected = false;
    this.selectedDayObject = {};
    this.repopulateMainBox();
};

JsDatePick.prototype.setSelectedDay = function(dateObject){
    this.flag_aDayWasSelected = true;
    
    this.selectedDayObject.day = parseInt(dateObject.day,10);
    this.selectedDayObject.month = parseInt(dateObject.month,10);
    this.selectedDayObject.year = parseInt(dateObject.year);
    
    this.currentMonth   = dateObject.month;
    this.currentYear    = dateObject.year;
    
    this.repopulateMainBox();
};

JsDatePick.prototype.isSelectedDay = function(aDate){
    if (this.flag_aDayWasSelected){
        if (parseInt(aDate) == this.selectedDayObject.day &&
            this.currentMonth == this.selectedDayObject.month &&
            this.currentYear == this.selectedDayObject.year){
            return true;
        } else {
            return false;
        }
    }
    return false;
};

JsDatePick.prototype.getSelectedDay = function(){
    if (this.flag_aDayWasSelected){
        return this.selectedDayObject;
    } else {
        return false;
    }
};

JsDatePick.prototype.getSelectedDayFormatted = function(){
    if (this.flag_aDayWasSelected){
        
        var dateStr = this.oConfiguration.dateFormat;
        
        dateStr = dateStr.replace("%d", this.selectedDayObject.day.toString().strpad());
        dateStr = dateStr.replace("%j", this.selectedDayObject.day);
        
        dateStr = dateStr.replace("%m", this.selectedDayObject.month.toString().strpad());
        dateStr = dateStr.replace("%M", g_l["MONTHS"][this.selectedDayObject.month-1].substr(0,3).toUpperCase());
        dateStr = dateStr.replace("%n", this.selectedDayObject.month);
        dateStr = dateStr.replace("%F", g_l["MONTHS"][this.selectedDayObject.month-1]);
        
        dateStr = dateStr.replace("%Y", this.selectedDayObject.year);
        dateStr = dateStr.replace("%y", this.selectedDayObject.year.toString().substr(2,2));
        
        return dateStr;
    } else {
        return false;
    }
};

JsDatePick.prototype.setDaySelection = function(anElement){
    var currentColorScheme = this.getCurrentColorScheme();
    
    if  (this.flag_DayMarkedBeforeRepopulation){
        /* Un mark last selected day */
        $(this.lastMarkedDayObject).attr("isSelected",0);
        
        if (parseInt(this.lastMarkedDayObject.getAttribute("isToday")) == 1){
            this.setC(this.lastMarkedDayObject, "dayNormalToday");
            //this.lastMarkedDayObject.style.background = "url(" + this.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
        } else {
            this.setC(this.lastMarkedDayObject, "dayNormal");
           // this.lastMarkedDayObject.style.background = "url(" + this.oConfiguration.imgPath + currentColorScheme + "_dayNormal.gif) left top no-repeat";
        }
    }
    
    this.flag_aDayWasSelected = true;
    this.selectedDayObject.year  = this.currentYear;
    this.selectedDayObject.month = this.currentMonth;
    this.selectedDayObject.day   = parseInt(anElement.innerHTML);
    
    this.flag_DayMarkedBeforeRepopulation = true;
    this.lastMarkedDayObject = anElement;
    
    $(anElement).attr("isSelected",1);
    
    if (parseInt(anElement.getAttribute("isToday")) == 1){
        this.setC(anElement, "dayDownToday");
       // anElement.style.background = "url(" + this.oConfiguration.imgPath + currentColorScheme + "_dayDown.gif) left top no-repeat";
    } else {
        this.setC(anElement, "dayDown");
       // anElement.style.background = "url(" + this.oConfiguration.imgPath + currentColorScheme + "_dayDown.gif) left top no-repeat";
    }
};

JsDatePick.prototype.isToday = function(aDateObject){
    var cmpMonth = this.oCurrentDay.month-1;
    if (aDateObject.getDate() == this.oCurrentDay.day &&
        aDateObject.getMonth() == cmpMonth &&
        aDateObject.getFullYear() == this.oCurrentDay.year){
        return true;
    }
    return false;
};

JsDatePick.prototype.setControlBarText = function(aText){
    var aTextNode = document.createTextNode(aText);
    $(this.controlsBarTextCell).empty();
    this.controlsBarTextCell.appendChild(aTextNode);
};

JsDatePick.prototype.setTooltipText = function(aText){
    $(this.tooltip).empty();
    var aTextNode = document.createTextNode(aText);
    this.tooltip.appendChild(aTextNode);
};

JsDatePick.prototype.moveForwardOneYear = function(){
    var desiredYear = this.currentYear + 1;
    if (desiredYear < parseInt(this.oConfiguration.yearsRange[1])){
        this.currentYear++;
        this.repopulateMainBox();
        return true;
    } else {
        return false;
    }
};

JsDatePick.prototype.moveBackOneYear = function(){
    var desiredYear = this.currentYear - 1;
    
    if (desiredYear > parseInt(this.oConfiguration.yearsRange[0])){
        this.currentYear--;
        this.repopulateMainBox();
        return true;
    } else {
        return false;
    }
};

JsDatePick.prototype.moveForwardOneMonth = function(){
    
    if (this.currentMonth < 12){
        this.currentMonth++;
    } else {
        if (this.moveForwardOneYear()){
            this.currentMonth = 1;
        } else {
            this.currentMonth = 12;
        }
    }
    
    this.repopulateMainBox();
};

JsDatePick.prototype.moveBackOneMonth = function(){
    
    if (this.currentMonth > 1){
        this.currentMonth--;
    } else {
        if (this.moveBackOneYear()){
            this.currentMonth = 12;
        } else {
            this.currentMonth = 1;
        }
    }
    
    this.repopulateMainBox();
};

JsDatePick.prototype.getCurrentColorScheme = function(){
    return this.oConfiguration.cellColorScheme;
};

JsDatePick.prototype.getDOMControlBar = function(){
    var d = document, controlsBar,monthForwardButton,monthBackwardButton,yearForwardButton,yearBackwardButton,controlsBarText;
    
    controlsBar             = d.createElement("div");
    monthForwardButton      = d.createElement("div");
    monthBackwardButton     = d.createElement("div");
    yearForwardButton       = d.createElement("div");
    yearBackwardButton      = d.createElement("div");
    controlsBarText         = d.createElement("div");
    
    this.setC(controlsBar, "controlsBar");
    this.setC(monthForwardButton, "monthForwardButton");
    this.setC(monthBackwardButton, "monthBackwardButton");
    this.setC(yearForwardButton, "yearForwardButton");
    this.setC(yearBackwardButton, "yearBackwardButton");
    this.setC(controlsBarText, "controlsBarText");
        
    $(controlsBar).attr("globalNumber",this.globalNumber);
    $(monthForwardButton).attr("globalNumber",this.globalNumber);
    $(monthBackwardButton).attr("globalNumber",this.globalNumber);
    $(yearBackwardButton).attr("globalNumber",this.globalNumber);
    $(yearForwardButton).attr("globalNumber",this.globalNumber);
    
    this.controlsBarTextCell = controlsBarText;
    
    controlsBar.appendChild(monthForwardButton);
    controlsBar.appendChild(monthBackwardButton);
    controlsBar.appendChild(yearForwardButton);
    controlsBar.appendChild(yearBackwardButton);
    controlsBar.appendChild(controlsBarText);
    
    monthForwardButton.onmouseover = function(){
        var gRef,parentElement;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_FWD"]);
        gRef.setC(this, "monthForwardButtonOver");
    };
    
    monthForwardButton.onmouseout = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "monthForwardButton");
    };
    
    monthForwardButton.onmousedown = function(){
        var gRef,parentElement;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }       
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_FWD"]);
        gRef.setC(this, "monthForwardButtonDown");
    };
    
    monthForwardButton.onmouseup = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_FWD"]);
        gRef.setC(this, "monthForwardButton");
        gRef.moveForwardOneMonth();
    };
    
    /* Month backward button event handlers */
    
    monthBackwardButton.onmouseover = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_BCK"]);
        gRef.setC(this, "monthBackwardButtonOver");
    };
    
    monthBackwardButton.onmouseout = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "monthBackwardButton");
    };
    
    monthBackwardButton.onmousedown = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_BCK"]);
        gRef.setC(this, "monthBackwardButtonDown");
    };
    
    monthBackwardButton.onmouseup = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["MONTH_BCK"]);
        gRef.setC(this, "monthBackwardButton");
        gRef.moveBackOneMonth();
    };
    
    /* Year forward button */
    
    yearForwardButton.onmouseover = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;        
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_FWD"]);
        gRef.setC(this, "yearForwardButtonOver");
    };
    
    yearForwardButton.onmouseout = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;         
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "yearForwardButton");
    };
    
    yearForwardButton.onmousedown = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_FWD"]);
        gRef.setC(this, "yearForwardButtonDown");
    };
    
    yearForwardButton.onmouseup = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_FWD"]);
        gRef.setC(this, "yearForwardButton");
        gRef.moveForwardOneYear();
    };
    
    /* Year backward button */
    
    yearBackwardButton.onmouseover = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_BCK"]);
        gRef.setC(this, "yearBackwardButtonOver");
    };
    
    yearBackwardButton.onmouseout = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }       
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText('');
        gRef.setC(this, "yearBackwardButton");
    };
    
    yearBackwardButton.onmousedown = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_BCK"]);
        gRef.setC(this, "yearBackwardButtonDown");
    };
    
    yearBackwardButton.onmouseup = function(){
        var parentElement,gRef;
        if (parseInt(this.getAttribute("isJsDatePickDisabled")) == 1){
            return;
        }
        parentElement = this.parentNode;
        while (parentElement.className != "controlsBar"){
            parentElement = parentElement.parentNode;
        }       
        gRef = JsDatePick.getCalInstanceById(this.getAttribute("globalNumber"));
        gRef.setTooltipText(g_l["YEAR_BCK"]);
        gRef.setC(this, "yearBackwardButton");
        gRef.moveBackOneYear();
    };
    
    return controlsBar;
};