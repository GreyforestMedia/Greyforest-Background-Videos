# Greyforest-Background-Videos
jQuery function for lazy-loading, auto-playing videos that fill the background of their container


## USAGE

Call the function gfBackgroundVideos('element'), passing the element class or ID of the container you wish to use.
```
<script>$(document).ready(function() { gfBackgroundVideos('.bg-video'); });</script>
```

Add data attributes to the container element where video will appear.
```
<div class="bg-video"
data-bg-video-poster="https://www.example.com/image.jpg"
data-bg-video-glass="#000000"
data-bg-video-glassopacity="0.1"
data-bg-video-sources="https://www.example.com/video.mp4,https://www.example.com/video.ogg,https://www.example.com/video.webm"
></div>
```

## OPTIONS

Options are set on the container element via data attributes. Only *bg-video-sources* is required.

* **bg-video-sources:** Comma-separated list of video file source URLs (mp4, ogg, and webm recommended)
* **bg-video-poster:** URL to poster image displayed while video loads (transparent/displays container background if undefined)
* **bg-video-glass:** Hex color code (including #) __or__ URL to image that will be applied as 100% height & width background-image to container (defaults to #000000 if undefined)
* **bg-video-glassopacity:** Opacity for glass section using CSS values of 0 - 1 (defaults to 0.3 if undefined)
