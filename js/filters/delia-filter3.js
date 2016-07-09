/**
 * Created by Admin on 7/9/2016.
 */
(function(){

    var tempCanvas = document.createElement('canvas');
    tempCanvas.width=1000;
    tempCanvas.height=1000;
    var tempContext = tempCanvas.getContext('2d');
    var createdGif = false;

    window.filters.push({
        name : 'trippin',
        author : 'vidi',
        draw : function (canvas, context) {
            // get the raw image data
            var imageData = Filters.getPixels(canvas);
            var data = imageData.data, width = data.length / imageData.height;

            var	otherImageData = Filters.brightnessContrast(imageData, -0.3, 0.4);
            var tempData = tempContext.getImageData(0,0,imageData.width, imageData.height);

            tempData = Filters.sobel(tempData);
           // tempData = Filters.screenBlend(tempData, otherImageData);

            tempContext.putImageData(tempData, 0, 0);
            //imageData = Filters.gaussianBlur(imageData, 10);
           // imageData = Filters.sobel(imageData);
            imageData = Filters.brightnessContrast(imageData, -0.3, 0.4);
            var lut = Filters.invertLUT();
            imageData = Filters.applyLUT(imageData, {r:lut, g:lut, b:lut, a:Filters.identityLUT()});

            // paint the new data
            imageData.data = data;
            if(!createdGif) {
                createdGif = true;
                gifshot.createGIF({'interval': 0.5,
                        'numFrames': 10,
                        'gifWidth': 400,
                        'gifHeight': 400
                    }
                    , function(imageData) {
                        console.log("enter....");
                        var animatedImage = document.createElement('img');
                        animatedImage.src = imageData.image;
                        document.getElementById("gif").appendChild(animatedImage);
                    });

            }

            context.putImageData(imageData, 0, 0);
        }
    });

}());