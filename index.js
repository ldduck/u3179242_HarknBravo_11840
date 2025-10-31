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

        // Keywords
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
            speak("I can provide weather updates. Please specify the location you want the weather for.");
            
        } else if (spokenText.includes("atm voice") || spokenText.includes("atm help") || spokenText.includes("atm assistance") || spokenText.includes("assistance")) {
            speak("I can help with ATM voice tasks: check balance, withdraw cash, deposit funds, transfer money, change PIN, or get a mini statement. Tell me which action you'd like to perform.");
        } else if (spokenText.includes("check balance") || spokenText.includes("balance") || spokenText.includes("account balance")) {
            
            speak("To check your balance, please insert your card and say 'enter PIN', or choose the account type: checking or savings.");
        } else if (spokenText.includes("withdraw") || spokenText.includes("take out cash") || spokenText.includes("cash")) {
            
            speak("What amount would you like to withdraw? You can say amounts like fifty dollars or one hundred.");
        } else if (spokenText.includes("deposit") || spokenText.includes("deposit check") || spokenText.includes("cash deposit")) {
            
            speak("To deposit, insert cash or checks into the deposit slot and confirm the amount when prompted. Do you want to deposit cash or a check?");
        } else if (spokenText.includes("transfer") || spokenText.includes("send money") || spokenText.includes("move funds")) {
            
            speak("I can transfer funds between your accounts. Which account do you want to transfer from and to, and what amount?");
        } else if (spokenText.includes("mini statement") || spokenText.includes("statement") || spokenText.includes("recent transactions")) {
            
            speak("I can provide a mini statement showing recent transactions. Would you like the last 5 or 10 transactions?");
        } else if (spokenText.includes("change pin") || spokenText.includes("update pin") || spokenText.includes("reset pin")) {
            
            speak("To change your PIN, you'll need to verify your identity. Say 'start PIN change' to begin the secure process.");
        } else if (spokenText.includes("forgot pin") || spokenText.includes("can't remember pin") || spokenText.includes("blocked")) {
            
            speak("If your PIN is forgotten or your card is blocked, please contact customer support or use the bank app to unfreeze the card. Would you like the support number?");
        } else if (spokenText.includes("receipt") || spokenText.includes("print receipt") || spokenText.includes("email receipt")) {
            
            speak("Do you want a printed receipt or to receive the receipt by email/SMS? Say 'print' or 'send receipt'.");
        } else if (spokenText.includes("cardless withdrawal") || spokenText.includes("code withdrawal") || spokenText.includes("qr withdraw")) {
            
            speak("For cardless withdrawal, choose 'Cardless' on the screen or say 'Cardless' and enter the one-time code from your banking app when prompted.");
        } else if (spokenText.includes("cancel") || spokenText.includes("stop") || spokenText.includes("abort")) {
            
            speak("Cancelling the current operation. Your session will return to the main menu. Do you need anything else?");
        } else if (spokenText.includes("help") || spokenText.includes("assistance") || spokenText.includes("what can you do")) {
            
            speak("I can guide you through ATM tasks: balance, withdrawals, deposits, transfers, and receipts. Which task should I walk you through?");
        } else if (spokenText.includes("atm locations") || spokenText.includes("nearest atm") || spokenText.includes("where is an atm")) {
            
            speak("Please insert your card into the slot now. After your transaction, don't forget to take your card when it is ejected.");
        } else if (spokenText.includes("security") || spokenText.includes("safety") || spokenText.includes("fraud")) {
            
            speak("For security concerns, never share your PIN. If you suspect fraud, choose 'Report' on the screen, say 'Report' to me, or contact support immediately.");
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
