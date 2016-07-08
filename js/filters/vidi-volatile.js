(function(){

var x = 0.4, y=-0.3, xmultiplier = 0.01, ymultiplier = -0.005;

setInterval(function(){
	x += xmultiplier;
	if (x > 0.6 || x < 0.2) {
		xmultiplier = (-1) * xmultiplier;
	}
}, 20);

setInterval(function(){
	y += ymultiplier;
	if (y < -0.5 || y  > -0.1) {
		ymultiplier = (-1) * ymultiplier;
	}
}, 20);


window.filters.push({
	name : 'volatile',
	author : 'vidi',
	draw : function (canvas, context) {
	    // get the raw image data
		var imageData = Filters.getPixels(canvas);
		var data = imageData.data, width = data.length / imageData.height;

		imageData = Filters.distortSine(imageData, x, y);
        // paint the new data
		imageData.data = data;
		context.putImageData(imageData, 0, 0);
	}
});

}());
