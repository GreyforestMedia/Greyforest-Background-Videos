/*!=======================================================================================
 * Greyforest Background Videos v1.0.0
 * Lazy-loading + auto-playing (muted) videos that fill the background of their container
 * https://www.greyforest.media/plugins
 * https://github.com/GreyforestMedia
 * ___ License
 * by Greyforest Media
 */
 function gfBackgroundVideos( element ){

	var bgVideoCSS = '<style>'+ 
	element +' {position:relative;overflow:hidden;background-size:cover;background-position:center center;background-repeat:no-repeat;}' +
	element +' .bg-video-glass {position:absolute;height:100%;width:100%;z-index:2;top:0;left:0;margin:0;padding:0;}' +
	element +' .bg-video-wrapper {position:absolute;top:0;left:0;width:100%;height:100%;z-index:0;margin:0;padding:0;}' +
	element +' .bg-video-wrapper video {position: absolute; top: 50%; left: 50%;min-width: 100%; min-height: 100%;width: auto; height: auto; z-index: 0;transform: translate(-50%,-50%);-webkit-transform:translate(-50%,-50%);margin:0;padding:0;}'+
	'<style>';
	
	// check if element exists
	if ( $(element).length ){
		
		// inject css into head
		$('head').append(bgVideoCSS);

		// find each matching element in body
		$(element).each( function(i){
					
			// check if poster is set
			if (typeof $(this).data('bg-video-poster') !== 'undefined') {
				var bg_video_poster = $(this).data('bg-video-poster');
			} else { 
				var bg_video_poster = '';
			}
			
			// check if glass color is set
			if (typeof $(this).data('bg-video-glass') !== 'undefined') {
				// declare glass as variable
				var bg_video_glass = $(this).data('bg-video-glass');
				// hex color regex check
				var bg_video_ishexcolor = /^#[0-9A-F]{6}$/i;
					if ( bg_video_ishexcolor.test(bg_video_glass) == true ) {
						var bg_video_glass_final = bg_video_glass;
					} else { 
						var bg_video_glass_final = 'url(' + bg_video_glass + ');background-repeat:no-repeat;background-size:100% 100%;background-position:center center;';
					}
			} else {
				var bg_video_glass_final = 'none';
			}	
	
			// check if glass opacity is set
			if (typeof $(this).data('bg-video-glassopacity') !== 'undefined') {
				var bg_video_glassopacity = $(this).data('bg-video-glassopacity');
			} else { 
				var bg_video_glassopacity = '0.3';
			}
		
			// append hidden video wrapper to bg-video parent
			// add video poster background to bg-video parent
			// apply z-index to all children elements inside frame
			$(this).append('<div class="bg-video-wrapper" style="display:none"></div>');
			$(this).css('background-image','url('+ bg_video_poster + ')');
			$(this).children().not('.bg-video-wrapper').css('z-index','3');
		
			// check if sources are set and display nothing if not
			if (typeof $(this).data('bg-video-sources') !== 'undefined') {
				var bg_video_sources = $(this).data('bg-video-sources');							// get comma separated list of sources
				var bg_video_sources_array = bg_video_sources.split(',');							// split the sources into array
				var bg_video_outputs = "";															// establish <source> output array
				var bg_video_extension_regex = /(?:\.([^.]+))?$/;									// file extension regex
				
				// for each source, find the type and output a <source> element
				$.each(bg_video_sources_array, function (index, value) {							// foreach source in array
					var bg_video_source_file_extension = bg_video_extension_regex.exec(value)[1];	// get file extension for video type
					bg_video_outputs += '<source src="' + value + '" type="video/' + bg_video_source_file_extension + '">';
				});
				
				// once window has loaded, inject video player elements, delay 1 second, then fade in
				$(window).bind('load', function() {
					$('.bg-video-wrapper').html('<span class="bg-video-glass" style="opacity:'+bg_video_glassopacity+';background:'+bg_video_glass_final+'"></span><video autoplay playsinline loop muted poster="' + bg_video_poster + '" width="100%" height="100%" class="bg-video-player">' + bg_video_outputs + '</video>').delay(1000).fadeIn(800);	
				});
				
				$(this).removeAttr('data-bg-video-sources').removeData('bg-video-sources');
				$(this).removeAttr('data-bg-video-poster').removeData('bg-video-poster');
			} // endif sources are set
		
		});
	}
}
