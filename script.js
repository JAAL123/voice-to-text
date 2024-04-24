const resultElement = document.getElementById("result");
let recognition;

const startConverting = () => {
  if ("webkitSpeechRecognition" in window) {
    recognition = new webkitSpeechRecognition();
    setUpRecognition(recognition);

    recognition.start();
  }
};

const setUpRecognition = (recognition) => {
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "es-MX";
  recognition.onresult = (event) => {
    const { finalTranscript, interTranscript } = processResult(event.results);
    resultElement.innerHTML = finalTranscript + "<span style='color: #eee'>" + interTranscript + "</span>";
  };
};

const processResult = (results) => {
  let finalTranscript = "";
  let interTranscript = "";
  for (let i = 0; i < results.length; i++) {
    let transcript = results[i][0].transcript;
    transcript.replace("\n", "<br>");
    if (results[i].isFinal) {
      finalTranscript += transcript;
    } else {
      interTranscript += transcript;
    }
  }
  return { finalTranscript, interTranscript };
};

const stopConverting = () => {
    recognition.stop();
    recognition = null;
    resultElement.innerHTML = "";
};
