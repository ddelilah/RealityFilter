(function(){

var blur = 1;

	leapController.on("gesture", function(gesture) {
	    // change filters by swiping
	    if (gesture.type == "circle" && blur < 30) {
					blur = blur + 5;
	    }
	});

var tempCanvas = document.createElement('canvas');
tempCanvas.width=1000;
tempCanvas.height=1000;
var tempContext = tempCanvas.getContext('2d');

window.filters.push({
	name : 'blurspin',
	author : 'vidi',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = Filters.getPixels(canvas);
		var data = imageData.data, width = data.length / imageData.height;


		imageData = Filters.gaussianBlur(imageData, blur);

        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);

		if (blur >= 10) {
			blur = blur - 10;
		} else {
			blur = 0;
		}
	}
});

}());
