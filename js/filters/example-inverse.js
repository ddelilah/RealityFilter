(function(){

window.filters.push({
	name : 'inverse',
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

            data[i] = 255 - red;
            data[i+1] = 255 - green;
            data[i+2] = 255 - blue;
		}


        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});



}());