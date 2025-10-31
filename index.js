// document.getElementById('listenButton').addEventListener('click', function() {
//    alert('Button clicked!');
// });


const listenButton = document.getElementById('listenButton');
const statusState = document.getElementById('status');
const userText = document.getElementById('userOutput');
const speechIcon = document.getElementById('speechIcon');

// Check if the browser supports Speech Recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();

    listenButton.addEventListener('click', () => {
        recognition.start();
    });

    recognition.onstart = () => {
        statusState.textContent = "Listening...";
        if (speechIcon) speechIcon.classList.remove('hidden');
    };

    // When the browser recognises something
    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        userText.textContent = `You said: "${spokenText}"`;

        // For now, it gives a simple, hard-coded reply
        speak("I heard you say " + spokenText);

        if (spokenText.includes("open tutorial") || spokenText.includes("show tutorial")) {
            openPanel(); 
            speak("Sure thing, it's open now!");
        }
        if (spokenText.includes("close tutorial") || spokenText.includes("hide tutorial")) {
            closePanel();
            speak("Can do, I've closed it!");
        } else if (spokenText.includes("status")) {
            speak("The tutorial is currently " + (document.getElementById('tutorialPanelMode').classList.contains('open') ? "open" : "closed") + ".");
        }


    };

    recognition.onend = () => {
        statusState.textContent = "Status: Idle";
        if (speechIcon) speechIcon.classList.add('hidden');
    };
} else {
    alert("Sorry, your browser does not support Speech Recognition!");
}

// Function to make the browser speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// Core event listener that listens for the user's voice input and triggers the relevant functions.



// Tutorial panel functions

function openPanel() {
    const panel = document.getElementById('tutorialPanelMode');
    panel.classList.toggle('open');
}
function closePanel() {
    document.getElementById('tutorialPanelMode').classList.remove('open');
}