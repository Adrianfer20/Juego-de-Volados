

const context = new AudioContext();
const playAudio = function (buffer) {
  const sourceBuffer = context.createBufferSource();

  sourceBuffer.buffer = buffer;
  sourceBuffer.connect(context.destination);

  sourceBuffer.start(context.currentTime);
};

class Sound {

    gameSound = function () {
        const request = new XMLHttpRequest();
      
        request.open("GET", "./sound/donkey-kong-country.mp3", true);
        request.responseType = "arraybuffer";
      
        request.onload = function () {
          const undecodedAudio = request.response;
      
          context.decodeAudioData(undecodedAudio, function (buffer) {
            playAudio(buffer);
          });
        };
      
        request.send();
      };
}


export {Sound}
