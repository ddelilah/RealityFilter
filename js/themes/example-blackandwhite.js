themes.push({
	name : 'blackandwhite',
	author : 'patcat',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

        // ---------- Apply filter --------- //
		for (var i = 0; i < data.length; i += 4) {
			var red = data[i],
                green = data[i + 1],
                blue = data[i + 2],
                luminance = ((red * 299) + (green * 587) + (blue * 114)) / 1000; // Gives a value from 0 - 255

            if (luminance > 175) {
                red = 255;
                green = 255;
                blue = 255;
            } else if (luminance >= 100 && luminance <= 175) {
                red = 190;
                green = 190;
                blue = 190;
            } else if (luminance < 100) {
                red = 0;
                green = 0;
                blue = 0;
            }

            data[i] = red;
            data[i+1] = green;
            data[i+2] = blue;
		}


        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});