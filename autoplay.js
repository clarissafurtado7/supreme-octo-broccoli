function autoplayUnlock(element) {
    var context = new (window.AudioContext || window.webkitAudioContext)();

    return new Promise(function (resolve, reject) {
        if (context.state === 'suspended') {
            var unlock = function unlock() {
                context.resume()
                    .then(function () {
                        window.removeEventListener('keydown', unlock);
                        element.removeEventListener('click', unlock);
                        element.removeEventListener('touchstart', unlock);
                        element.removeEventListener('touchend', unlock);

                        resolve();
                    }).catch(function (error) {
                        reject(error);
                    });
            };

            window.addEventListener('keydown', unlock, false);
            element.addEventListener('click', unlock, false);
            element.addEventListener('touchstart', unlock, false);
            element.addEventListener('touchend', unlock, false);
        } else {
            resolve();
        }
    });
}

var autoplayUnlockElement = document.getElementById('autoplay-unlock-overlay');
var audioElement = document.getElementById('audio-element');
var videoElement = document.getElementById('video-element');

autoplayUnlock(autoplayUnlockElement)
    .then(function() {
        document.body.removeChild(autoplayUnlockElement);
        audioElement.play();
        videoElement.play();        
    })
    .catch(function(error) {
        console.error(error);
    });
