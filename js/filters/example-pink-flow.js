(function(){

var pinkCanvas = document.createElement('canvas');
// TODO: remove hardcoded values
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

function randn_bm() {
    var u = 1 - Math.random(); // Subtraction to flip [0, 1) to (0, 1].
    var v = 1 - Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function rnd2() {
    return ((Math.random() + Math.random() + Math.random() + Math.random() + Math.random() + Math.random()) - 3) / 3;
}

var Filters = {};

Filters.tmpCanvas = document.createElement('canvas');
      Filters.tmpCtx = Filters.tmpCanvas.getContext('2d');

      Filters.createImageData = function(w,h) {
        return Filters.tmpCtx.createImageData(w,h);
      };

      Filters.convolute = function(pixels, weights, opaque) {
        var side = Math.round(Math.sqrt(weights.length));
        var halfSide = Math.floor(side/2);
        var src = pixels.data;
        var sw = pixels.width;
        var sh = pixels.height;
        // pad output by the convolution matrix
        var w = sw;
        var h = sh;
        var output = Filters.createImageData(w, h);
        var dst = output.data;
        // go through the destination image pixels
        var alphaFac = opaque ? 1 : 0;
        for (var y=0; y<h; y++) {
          for (var x=0; x<w; x++) {
            var sy = y;
            var sx = x;
            var dstOff = (y*w+x)*4;
            // calculate the weighed sum of the source image pixels that
            // fall under the convolution matrix
            var r=0, g=0, b=0, a=0;
            for (var cy=0; cy<side; cy++) {
              for (var cx=0; cx<side; cx++) {
                var scy = sy + cy - halfSide;
                var scx = sx + cx - halfSide;
                if (scy >= 0 && scy < sh && scx >= 0 && scx < sw) {
                  var srcOff = (scy*sw+scx)*4;
                  var wt = weights[cy*side+cx];
                  r += src[srcOff] * wt;
                  g += src[srcOff+1] * wt;
                  b += src[srcOff+2] * wt;
                  a += src[srcOff+3] * wt;
                }
              }
            }
            dst[dstOff] = r;
            dst[dstOff+1] = g;
            dst[dstOff+2] = b;
            dst[dstOff+3] = a + alphaFac*(255-a);
          }
        }
        return output;
      };





window.filters.push({
	name : 'pink flow',
	author : 'danmana',
	draw : function (canvas, context) {

	    // get the raw image data
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;



		var pinkImageData = pinkContext.getImageData(0, 0, canvas.width, canvas.height);
		var pinkData = pinkImageData.data, dx, dy;
		var startThreshold = 0.15, j;

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
                if (Math.random() < startThreshold) {
                    dx = Math.floor(rnd2()*20);
                    dy = Math.floor(rnd2()*20);
                    j = i + (dx + dy * canvas.width)*4;
                    if (j+3 < data.length){
                    saturate(pinkData, j, red, green, blue);
//                    pinkData[j] = red;
//                    pinkData[j+1] = green;
//                    pinkData[j+2] = blue;
                    pinkData[j+3] = 150;
                    }
                }


            } else {
                // fade it out
                 pinkData[i+3] = Math.floor(alpha * 0.95);
            }


		}

		pinkImageData = Convolution.applyMatrix(pinkImageData, Convolution.M.blur);

		pinkContext.putImageData(pinkImageData, 0, 0);
		context.drawImage(pinkCanvas, 0, 0);

	}
});



}());