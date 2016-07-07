(function(){

var pinkCanvas = document.createElement('canvas');

pinkCanvas.width = 1000;
		pinkCanvas.height = 1000;
		var pinkContext = pinkCanvas.getContext('2d');

function isMagenta(r,g,b) {
    var threshold = 20,
      dx = r - 255,
      dy = g - 0,
      dz = b - 255;

    if ((r - g) >= threshold && (b - g) >= threshold) {
      return true;
    }
    return dx * dx + dy * dy + dz * dz < 19600;
}

function saturate(d,i,r,g,b) {
    var value = 1.75;
    var gray = 0.2989*r + 0.5870*g + 0.1140*b; //weights from CCIR 601 spec
    d[i] = clamp(-gray * value + r * (1+value));
    d[i+1] = clamp(-gray * value + g * (1+value));
    d[i+2] = clamp(-gray * value + b * (1+value));
}

function clamp(color) {
    return Math.min(Math.max(Math.floor(color),0),255)
}

window.filters.push({
	name : 'pink flow',
	author : 'danmana',
	draw : function (canvas, context) {

	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;



		var pinkImageData = pinkContext.getImageData(0, 0, canvas.width, canvas.height);
		var pinkData = pinkImageData.data;

        // ---------- Apply filter --------- //
		for (var i = 0; i < data.length; i += 4) {
			var red = data[i],
                green = data[i + 1],
                blue = data[i + 2],
                alpha = pinkData[i + 3];

            // pink like
            if (isMagenta(red,green,blue)) {
                saturate(pinkData, i, red, green, blue);
//                pinkData[i] = red;
//                pinkData[i+1] = green;
//                pinkData[i+2] = blue;
                pinkData[i+3] = 255;
            } else {
                // fade it out
                 pinkData[i+3] = Math.floor(alpha * 0.95);
            }


		}


        // paint the new data
        pinkImageData.data = pinkData;
		pinkContext.putImageData(pinkImageData, 0, 0);
		context.drawImage(pinkCanvas, 0, 0);

	}
});



}());