Make html elements glide across the browser window with your cursor
-------------------------------------------------------------------

**[Example](http://jonoliver.github.com/jqGlide/)** 

Hover on an element. Move the cursor slowly to drag it around, or quickly to fling it and watch it bounce off of the browser walls.

Just for fun. This plugin is completely impractical and somewhat buggy.

Simple usage:
```javascript
$(".some_elements").glide();
```

with options:
```javascript
$(".some_elements").glide({
	randomStart: true, // element automatically starts moving in a random direction
	clickToggle: true // click anywhere on the window to stop/start element moving
});
```	



