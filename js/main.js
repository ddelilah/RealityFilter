var
  container,
  video,
  canvas,
  context,
  filters = [],
  currentFilter = 0,
  MOCK_VIDEO = '/videos/Shopping Mall - 1887.mp4';

init();

function init() {
container = document.getElementById('webglviewer');

setInterval(function(){
    currentFilter = (filters.length > currentFilter+1) ? currentFilter+1 : 0;
}, 6000);
document.addEventListener('click', fullscreen, false);
window.addEventListener('resize', resize, false);

video = document.createElement('video');
video.setAttribute('autoplay', true);

var options = {
  video: {
    optional: [{facingMode: "environment"}]
  }
};

navigator.getUserMedia = navigator.getUserMedia ||
navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (typeof MediaStreamTrack === 'undefined' && navigator.getUserMedia) {
  console.error('This browser doesn\'t support this demo :(');
  initVideo(MOCK_VIDEO);
} else {
  MediaStreamTrack.getSources(function(sources) {
    for (var i = 0; i !== sources.length; ++i) {
      var source = sources[i];
      if (source.kind === 'video') {
        if (source.facing && source.facing == "environment") {
          options.video.optional.push({'sourceId': source.id});
        }
      }
    }

    navigator.getUserMedia(options, streamFound, streamError);
  });
}

function streamFound(stream) {
    initVideo(URL.createObjectURL(stream));
}


function initVideo(src) {
  document.body.appendChild(video);
  video.src = src;
  video.style.width = '100vw';
  video.style.height = '100vh';
  video.play();

  canvas = document.createElement('canvas');
  canvas._firstPaint = true;
  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;
  container.appendChild(canvas);

  context = canvas.getContext('2d');
}


function streamError(error) {
  console.log('Stream error: ', error);
  console.log('Using default video as source');
  initVideo(MOCK_VIDEO);
}

animate();

}

function animate() {
    if (context && video.readyState === video.HAVE_ENOUGH_DATA) {
        if (canvas._firstPaint) {
            canvas._firstPaint = false;
            resize();
        }
        try {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            if (filters.length && filters[currentFilter]){
                var filter = filters[currentFilter];
                filter.draw(canvas, context);
            }
        } catch(e){
            console.error(e);
        }

    }

    requestAnimationFrame(animate);
}

function resize() {
    canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;
}



function fullscreen() {
if (container.requestFullscreen) {
  container.requestFullscreen();
} else if (container.msRequestFullscreen) {
  container.msRequestFullscreen();
} else if (container.mozRequestFullScreen) {
  container.mozRequestFullScreen();
} else if (container.webkitRequestFullscreen) {
  container.webkitRequestFullscreen();
}

}