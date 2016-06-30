themes.push({
	name : 'sepia',
	author : 'patcat',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

        // ---------- Apply filter --------- //
		for (var i = 0; i < data.length; i += 4) {
			var red = data[i],
                green = data[i + 1],
                blue = data[i + 2];

			var sepiaRed = (red * 0.393) + (green * 0.769) + (blue * 0.189);
			var sepiaGreen = (red * 0.349) + (green * 0.686) + (blue * 0.168);
			var sepiaBlue = (red * 0.272) + (green * 0.534) + (blue * 0.131);

			var randomNoise = Math.random() * 50;

			sepiaRed += randomNoise;
			sepiaGreen += randomNoise;
			sepiaBlue += randomNoise;

			sepiaRed = sepiaRed > 255 ? 255 : sepiaRed;
			sepiaGreen = sepiaGreen > 255 ? 255 : sepiaGreen;
			sepiaBlue = sepiaBlue > 255 ? 255 : sepiaBlue;

			data[i] = sepiaRed;
			data[i + 1] = sepiaGreen;
			data[i + 2] = sepiaBlue;
		}


        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});