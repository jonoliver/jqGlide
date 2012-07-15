/*
* jQuery plugin to glide html elements around
* Just for fun. This plugin is completely impractical and somewhat buggy.
* Use it as you wish.
*
* Author: Jon Oliver (github.com/jonoliver)
*/
(function( $ ){

	$.fn.glide = function(options) {  
	  
		var settings = $.extend( {
			randomStart: false,
			clickToggle: false
		}, options);

		return this.each(function() {

			var $element = $(this);
			var glide = new Glide();
			
			$element.hover(
				function(e){ glide.drag(e, $element); },
				function(e){ glide.fling(e, $element); }
			);

			if (settings.randomStart){
				glide.randomFling($element);
			}
			
			if (settings.clickToggle){
				var toggler = !settings.randomStart;
				$(window).click(function(){
					if (toggler){
						glide.randomFling($element)
					}
					else {
						glide.stop();
					}
					toggler = !toggler;
				});
			}
		});
		
		function Glide(){			
			// return these methods
			var returnObject = {
				drag: drag,
				fling: fling,
				randomFling: randomFling,
				stop: stop
			};
			
			// global Glide variables
			var flingInterval;
			var cPos = [0, 0];
			var sSize = 50;
			var limit = 15;
			var inc = [randomInc(limit, true),randomInc(limit, true)];

			// begin public methods		
			
			function drag(e, $element){
				var sOffset = getCursorPosition(e, $element[0]);
				stop();
				
				$element[0].onmousemove = function(ev){
					var sPos = [$element[0].offsetLeft,$element[0].offsetTop];
					cPos = getCursorPosition(ev);
					var nOffset = getCursorPosition(ev, $element[0]);
					nOffset = [nOffset[0]-sOffset[0], nOffset[1]-sOffset[1]];
					sPos = [sPos[0]+nOffset[0], sPos[1]+nOffset[1]];
					$element.css({ "left": sPos[0], "top": sPos[1] });
				}
			
			}

			function fling(e, $element){
				$element[0].onmousemove = null;

				var newPos = getCursorPosition(e);
				inc[0] = (cPos[0]-newPos[0])*-1;
				inc[1] = (cPos[1]-newPos[1])*-1;
				stop();
				flingInterval = setInterval(function(){ move($element) }, sSize);
			
			}

			function randomFling($element){
				$element[0].onmousemove = null;
				var inc = [randomInc(limit, true),randomInc(limit, true)];
				stop();
				flingInterval = setInterval(function(){ move($element) }, sSize);			
			}
			
			function stop(){
				clearInterval(flingInterval);
				//flingInterval = false;			
			}
			// end public methods		
			
			// begin private methods
			function move($element){
				var sHeight = $element.height();
				var sWidth = $element.width();
				var sTop = $element[0].offsetTop;
				var sBottom = sTop + sHeight;
				var sLeft = $element[0].offsetLeft;
				var sRight = sLeft + sWidth;
				var wHeight = $(window).height();
				var wWidth = $(window).width();
				var nTop = 0;
				var nLeft = 0;
				
				if (sBottom >= wHeight || sTop <= 0) {
					inc[1] = inc[1]*-1;
				}
				if (sRight >= wWidth || sLeft <= 0) {
					inc[0] = inc[0]*-1;
				}
				nTop = sTop + inc[1];
				nLeft = sLeft + inc[0];
				$element.css({"top":nTop,"left":nLeft});			
			}

			function randomInc(limit, randomneg){
				randomneg = randomneg || false;
				if (randomneg && Math.round(Math.random())) {limit = limit*-1;}
				return (Math.floor(Math.random()*limit));
			}
			
			function getCursorPosition(e, elem) {
				var x;
				var y;
				if (e.pageX || e.pageY) {
				x = e.pageX;
				y = e.pageY;
				}
				else {
				x = e.clientX + document.body.scrollLeft +
						document.documentElement.scrollLeft;
				y = e.clientY + document.body.scrollTop +
						document.documentElement.scrollTop;
				}
				// Convert to coordinates relative to the canvas
				if (elem){
					x -= elem.offsetLeft;
					y -= elem.offsetTop;
				}
				return [x,y];
			}

			// end private methods
			
			return returnObject;
		}
		
	};
})( jQuery );

	
