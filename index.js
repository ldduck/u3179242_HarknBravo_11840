// document.getElementById('listenButton').addEventListener('click', function() {
//    alert('Button clicked!');
// });


const listenButton = document.getElementById('listenButton');
const statusState = document.getElementById('status');
const userText = document.getElementById('userOutput');
const globalLoader = document.getElementById('globalLoader');

// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    listenButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onstart = () => {
        statusState.textContent = "Listening...";
        if (globalLoader) globalLoader.classList.remove('hidden');
    };

    // When the browser recognises something
    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        userText.textContent = `You said: "${spokenText}"`;

        // For now, it gives a simple, hard-coded reply
        speak("I heard you say " + spokenText + ". Damn, that's crazy.");
    };

    recognition.onend = () => {
        statusState.textContent = "Status: Idle";
        if (globalLoader) globalLoader.classList.add('hidden');
    };

} else {
    alert("Sorry, your browser does not support Speech Recognition!");
}

// Function to make the browser speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Tutorial panel functions

function openPanel() {
    document.getElementById('tutorialPanelMode').style.width = '300px';
}
function closePanel() {
    document.getElementById('tutorialPanelMode').style.width = '0px';
}