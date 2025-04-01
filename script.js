let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

function speak(text) {
    window.speechSynthesis.cancel(); // Ensure only one speech at a time
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "hi-IN"; // Corrected language
    window.speechSynthesis.speak(text_speak);
}

// Ensure voices are available
window.speechSynthesis.onvoiceschanged = () => {
    let voices = window.speechSynthesis.getVoices();
    console.log("Available Voices:", voices);
};

function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon Sir");
    } else {
        speak("Good Evening Sir");
    }
}

// Check if speech recognition is available
let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (!speechRecognition) {
    alert("Speech recognition is not supported in this browser.");
} else {
    let recognition = new speechRecognition();
    recognition.onresult = (event) => {
        let transcript = event.results[event.resultIndex][0].transcript;
        content.innerText = transcript;
        takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener("click", () => {
        recognition.start();
        voice.style.display = "block";
        btn.style.display = "none";
    });
}

function openWebsite(url, siteName) {
    speak(`Opening ${siteName}...`);
    window.open(url, "_blank");
}

function takeCommand(message) {
    voice.style.display = "none";
    btn.style.display = "flex";

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you with?");
    } else if (message.includes("who are you")) {
        speak("I am a virtual assistant, created by Priyam Sir.");
    } else if (message.includes("open youtube")) {
        openWebsite("https://youtube.com", "YouTube");
    } else if (message.includes("open google")) {
        openWebsite("https://google.com", "Google");
    } else if (message.includes("open facebook")) {
        openWebsite("https://facebook.com", "Facebook");
    } else if (message.includes("open instagram")) {
        openWebsite("https://instagram.com", "Instagram");
    } else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
    } else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("https://web.whatsapp.com/");
    } else if (message.includes("time")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak("The current time is " + time);
    } else if (message.includes("date")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak("Today's date is " + date);
    } else {
        let searchQuery = message.replace("shipra", "").replace("shifra", "").trim();
        let finalText = "This is what I found on the internet regarding " + searchQuery;
        speak(finalText);
        window.open(`https://www.google.com/search?q=${searchQuery}`, "_blank");
    }
}
