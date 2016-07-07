(function(){

var overlay = document.createElement('canvas');
    overlay.width = 2048;
    overlay.height = 1024;

var overlayContext = overlay.getContext('2d');

var temp = document.createElement('canvas');
    temp.width = 2048;
    temp.height = 1024;

var tempContext = temp.getContext('2d');

function nextPowerOf2(x) {
      return Math.pow(2, Math.ceil(Math.log(x) / Math.log(2)));
  }

function fadeOut(ctx) {
   var imageData = ctx.getImageData(0, 0, overlay.width, overlay.height);
   var data = imageData.data;

   for (var i = 0; i < data.length; i += 4) {
        var red = data[i],
            green = data[i + 1],
            blue = data[i + 2],
            alpha = data[i + 3];

        data[i + 3] = Math.round(0.9 * alpha);
   }
   ctx.putImageData(imageData, 0, 0);
}

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
                blue = data[i + 2],
                alpha = data[i + 3];

            if (red < 200) {
                data[i + 3] = 0;
            }


		}


        // paint the new data
		imageData.data = data;
		tempContext.putImageData(imageData, 0, 0);
		overlayContext.drawImage(temp, 0, 0);
		fadeOut(overlayContext);
		context.drawImage(overlay, 0, 0);

	}
});



}());