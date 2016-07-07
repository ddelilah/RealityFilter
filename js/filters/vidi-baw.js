(function(){

var startTime = Date.now();

window.filters.push({
	name : 'inverse',
	author : 'patcat',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data, timeInMs = Date.now();

        // ---------- Apply filter --------- //

				var high, low, secondsPassed = Math.round((timeInMs - startTime) / 1000);
				if (secondsPassed % 10 < 2) {
					high = 0;
					low = 255;
				} else {
					high = 255;
					low = 0;
				}

				for (var i = 0; i < data.length; i += 4) {
					var red = data[i],
		          green = data[i + 1],
		          blue = data[i + 2],
							aux,
							colors = [red, green, blue],
							highExtreme = Math.max.apply(Math, colors),
							lowExtreme =  Math.min.apply(Math, colors),
							sum = red + green + blue;

							if (sum > 250) {
								data[i] = high;
								data[i+1] = high;
								data[i+2] = high;
							} else {
								data[i] = low;
								data[i+1] = low;
								data[i+2] = low;
							}

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
