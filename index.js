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

    // Core functionality to handle recognised speech
    recognition.onresult = (event) => {
        const spokenText = event.results[0][0].transcript;
        userText.textContent = `'${spokenText}'`;

        // Listens and responds to specific keywords.
        speak();

        if (spokenText.includes("open tutorial") || spokenText.includes("show tutorial") || spokenText.includes("open the tutorial")) {
            openPanel(); 
            speak("Sure thing, it's open now!");
        } else if (spokenText.includes("close tutorial") || spokenText.includes("hide tutorial") || spokenText.includes("close the tutorial")) {
            closePanel();
            speak("Can do, I've closed it!");
        } else if (spokenText.includes("status")) {
            speak("The tutorial is currently " + (document.getElementById('tutorialPanelMode').classList.contains('open') ? "open" : "closed"));
        } else if (spokenText.includes("hello")) {
            speak("Hello! How can I assist you today?");
        } else if (spokenText.includes("what can you do") || spokenText.includes("what are your capabilities") || spokenText.includes("what do you do") || spokenText.includes("help")) {
            speak("I can assist you with a variety of tasks, including answering questions, providing information, and helping you navigate this interface.");
        } else if (spokenText.includes("thank you") || spokenText.includes("thanks")) {
            speak("You're welcome! If you have any more questions, feel free to ask.");
        } else if (spokenText.includes ("weather") || spokenText.includes ("forecast") || spokenText.includes ("temperature")) {
            speak("If I could find that for you, I would say: I can provide you with the current weather information for your location. Just let me know the city or area you're interested in.");
        }


    };

    recognition.onend = () => {
        statusState.textContent = "Status: Idle";
        if (speechIcon) speechIcon.classList.add('hidden');
    };
}

// Function to make the browser speak
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}


// Tutorial panel functions
function openPanel() {
    document.getElementById('tutorialPanelMode').classList.add('open');
}
function closePanel() {
    document.getElementById('tutorialPanelMode').classList.remove('open');
}