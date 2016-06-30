filters.push({
	name : 'arcade',
	author : 'patcat',
	draw : function (canvas, context) {
	    // get the raw image data
//		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
//		var data = imageData.data;

        // ---------- Apply filter --------- //
        ClosePixelation(canvas, context, [{
            resolution: 6
        }]);


        // paint the new data
//		imageData.data = data;
//		context.putImageData(imageData, 0, 0);
	}
});