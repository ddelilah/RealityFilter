(function(){

window.filters.push({
	name : 'mirror',
	author : 'vidi',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		var initialWidth = data.length / imageData.height;
		var initialMiddle =  initialWidth / 2;
		var width = initialWidth;
		var middle = initialMiddle;
		var rowStart = 0;
        // ---------- Apply filter --------- //
		for (var i = rowStart; i < data.length; i += 4) {
				var red = data[i],
        	green = data[i + 1],
          blue = data[i + 2];

				if (i > width) {
					middle = middle + initialWidth;
					width += initialWidth;
					rowStart = i;

				}

				if (i > middle) {
					data[width - i + rowStart] = data[i];
					data[width - i + rowStart + 1] = data[i+1];
					data[width - i + rowStart + 2] = data[i+2];
				}
		}


        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});



}());
