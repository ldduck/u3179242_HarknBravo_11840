// document.getElementById('listenButton').addEventListener('click', function() {
//    alert('Button clicked!');
// });


const listenButton = document.getElementById('listenButton');
const statusState = document.getElementById('status');
const userText = document.getElementById('userOutput');

// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    listenButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onstart = () => {
        statusState.textContent = "Listening...";
    };

    // When the browser recognises something
    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        userText.textContent = `You said: "${spokenText}"`;

        // For now, it gives a simple, hard-coded reply
        speak("I heard you say " + spokenText + ". Damn, that's crazy. Why would you say that?");
    };

    recognition.onend = () => {
        statusState.textContent = "Status: Idle";
    };

} else {
    alert("Sorry, your browser does not support Speech Recognition.");
}

// Function to make the browser speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}