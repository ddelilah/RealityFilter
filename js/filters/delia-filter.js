(function(){

    var tempCanvas = document.createElement('canvas');
tempCanvas.width=1000;
tempCanvas.height=1000;
var tempContext = tempCanvas.getContext('2d');

window.filters.push({
    name : 'inverse',
    author : 'patcat',
    draw : function (canvas, context) {
        // get the raw image data
        var imageData = Filters.getPixels(canvas);
        var data = imageData.data, width = data.length / imageData.height;

        var	otherImageData = Filters.sobel(Filters.horizontalFlip(imageData));
        var tempData = tempContext.getImageData(0,0,imageData.width, imageData.height);
        var tempData2 = tempContext.getImageData(0,0,imageData.width, imageData.height);

        tempData = Filters.distortSine(imageData, 0.5, -0.5);
        imageData = Filters.distortSine(tempData, -0.5, 0.5);
        tempContext.putImageData(tempData, 0, 0);

        // paint the new data
        imageData.data = data;
        context.putImageData(imageData, 0, 0);
    }
});

}());