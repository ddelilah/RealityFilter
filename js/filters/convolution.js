(function(){

var Convolution = {};




Convolution.tmpCanvas = document.createElement('canvas');
Convolution.tmpCtx = Convolution.tmpCanvas.getContext('2d');

Convolution.createImageData = function (w,h) {
    return Convolution.tmpCtx.createImageData(w,h);
};

// example matrixes:
Convolution.M = {};
Convolution.M.blur = [ 1/9, 1/9, 1/9,
                       1/9, 1/9, 1/9,
                       1/9, 1/9, 1/9 ];

Convolution.M.sharpen = [  0, -1,  0,
                        -1,  5, -1,
                         0, -1,  0 ];

Convolution.applyMatrix = function(imageData, matrix, opaque){
    var side = Math.round(Math.sqrt(matrix.length));
    var halfSide = Math.floor(side/2);
    var src = imageData.data;
    var sw = imageData.width;
    var sh = imageData.height;
    // pad output by the convolution matrix
    var w = sw;
    var h = sh;
    var output = Convolution.createImageData(w, h);
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
              var wt = matrix[cy*side+cx];
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

window.Convolution = Convolution;

}());