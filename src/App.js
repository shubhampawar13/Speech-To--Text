
import './App.scss';
import React, { useState } from 'react'
import useClipboard from "react-use-clipboard";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'



function App() {
  const [textToCopy, setTextToCopy] = useState();

  const[iconstart, seticonStart] = useState(false);
  

  const [isCopied, setCopied] = useClipboard(textToCopy , {
    // `isCopied` will go back to `false` after 1000ms.
    successDuration: 2000,
  });



  const { transcript, browserSupportsSpeechRecognition ,resetTranscript ,isMicrophoneAvailable } = useSpeechRecognition({})
  if (!browserSupportsSpeechRecognition) {
    // Render some fallback content
  }

  if (!isMicrophoneAvailable) {
    alert("Please enable your microphone to proceed.");
  }
  


  const startListning = () => {
    SpeechRecognition.startListening({ continuous: true, language: 'en-IN' })
    seticonStart(true);
  }

  const StopListning = () => {
    SpeechRecognition.stopListening();
    seticonStart(false);
  }



  // Use the transcript to set the message


  const handleCopyText = () => {
    // First, set the 'copied' state to true
    setCopied(true);
    // Then, copy the 'transcript' to the clipboard
    setTextToCopy(transcript);
  };




  return (
    <div className="container">
      
      <div className="h">Speech to Text{iconstart && <iframe src="https://lottie.host/?file=82e02ac6-95b8-41ac-b756-269c655c9602/dz7htxkGJd.json" className='ani'></iframe>}</div>
      
      <p>A React hook that converts speech from the microphone to text and makes it available to your React
        components.</p>
      <div className="maincontent" onClick={() =>  setTextToCopy(transcript)}>
        <span className='Gap'>
        {transcript}</span></div>
      <div className="buttons">
        <button onClick={startListning}> Start Listening </button>
        <button onClick={StopListning}>Stop Listening</button>
        <button onClick={handleCopyText} >Click twice to copy text </button>
        <button onClick={resetTranscript}>Reset</button>

        
      </div>
    </div>
  );
}

export default App;
