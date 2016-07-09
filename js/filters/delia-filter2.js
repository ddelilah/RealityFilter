(function(){

    var x = 0.5;
    var y = -0.5;

    leapController.on("gesture", function(gesture) {
        // change filters by swiping
        if (gesture.type == "circle" && x > -0.5 && y < 0.5) {
            x -= 0.1;
            y += 0.1;
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
            var imageData = Filters.getPixels(canvas);
            var data = imageData.data, width = data.length / imageData.height;

            var	otherImageData = Filters.sobel(Filters.horizontalFlip(imageData));
            var tempData = tempContext.getImageData(0,0,imageData.width, imageData.height);
            var tempData2 = tempContext.getImageData(0,0,imageData.width, imageData.height);

            tempData = Filters.distortSine(imageData, x, y);
          //  imageData = Filters.distortSine(tempData, -0.5, 0.5);
            tempContext.putImageData(tempData, 0, 0);

            // paint the new data
            imageData.data = data;
            context.putImageData(imageData, 0, 0);

/*            if (blur >= 10) {
                blur = blur - 10;
            } else {
                blur = 0;
            }*/
        }
    });

}());