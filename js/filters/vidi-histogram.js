(function(){

var r=0,g=0,b=0, incr = 10;

document.onkeydown = function(e) {
    switch(e.which) {
        case 37: // left

					r += incr;
					g-= incr;
					b+= incr;
					console.log("Left r:" + r + " g:" + g + " b:" + b);
        break;

        case 38: // up
				r+=incr;
				g+=incr;
				b+=incr;
				console.log("Up r:" + r + " g:" + g + " b:" + b);
        break;

        case 39: // right
					r-=incr;
					g+=incr;
					b-=incr;
					console.log("Right r:" + r + " g:" + g + " b:" + b);
        break;

        case 40: // down
				r-=incr;
				g-=incr;
				b-=incr;
				console.log("Down r:" + r + " g:" + g + " b:" + b);
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

window.filters.push({
	name : 'inverse',
	author : 'patcat',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data, timeInMs = Date.now();

        // ---------- Apply filter --------- //
				for (var i = 0; i < data.length; i += 4) {
					var red = data[i],
		          green = data[i + 1],
		          blue = data[i + 2],
							aux,
							colors = [red, green, blue],
							highExtreme = Math.max.apply(Math, colors),
							lowExtreme =  Math.min.apply(Math, colors),
							sum = red + green + blue;

							data[i] = red + r;
							data[i+1] = green + g;
							data[i+2] = blue + b;

							// data[i] = 255 - red;
							// data[i+1] = 255 - green;
							// data[i+2] = 255 - blue;
							// data[data.length - i] = data[i];
							// data[data.length - i + 1] = data[i+1];
							// data[data.length - i + 2] = data[i+2];

				}

        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});



}());
