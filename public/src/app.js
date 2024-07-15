



// const {load5choice} = require('./load5choice.js')
// const {loadMultiplechoice} = require('./loadMultiplechoice.js')

// const { text } = require("express");


const startButton = document.getElementById('startSurvey');
const next = document.getElementById('next');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentQuestion = 0;
let questions = [];

document.addEventListener('DOMContentLoaded', async function () {
    
    // Only fetch questions and load the current question if relevant elements are present
    if (document.getElementById('answerChoice')) {
        await fetchQuestions();

        fetchQuestions().then(() => {
            console.log(questions);
            // Parse URL to get initial question index
            const urlParams = new URLSearchParams(window.location.search);
            currentQuestion = parseInt(urlParams.get('p')) - 1 || 0;
            loadCurrentQuestion();
        });

        window.addEventListener('popstate', function (event) {
            const urlParams = new URLSearchParams(window.location.search);
            currentQuestion = parseInt(urlParams.get('p')) - 1 || 0;
            loadCurrentQuestion();
        });
    }

    if (startButton) {

        startButton.addEventListener('click', function () {
            window.location.href = 'user.html';
        });
    }

    if (next) {
        loadUser();
        next.addEventListener('click', function () {
            setCookie(7)
            
            window.location.href = 'question.html';
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            setCookie(7)
            currentQuestion++;
            if (currentQuestion < questions.length) {
                updateURL();
                loadCurrentQuestion();
            } else {
                window.location.href = 'end.html';
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentQuestion === 0) {
                window.location.href = 'user.html';
            } else {
                currentQuestion--;
                updateURL();
                loadCurrentQuestion();
            }
        });
    }
});

function loadCurrentQuestion() {
    if (!questions[currentQuestion]) {
        return;
    }
    console.log(questions[currentQuestion]);
    if (questions[currentQuestion].type === "health" || questions[currentQuestion].type === "restriction") {
        loadMultiplechoice(questions, currentQuestion);
    } else if (questions[currentQuestion].type === "BMI") {
        loadBMI(questions, currentQuestion);
    } else if (questions[currentQuestion].type === "habit") {
        loadHabit(questions, currentQuestion);
    } else {
        load5choice(questions, currentQuestion);
    }
}

function updateURL() {
    const newUrl = `${window.location.pathname}?p=${currentQuestion + 1}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}

async function fetchQuestions() {
    try {
        let response = await fetch('/api/data/questions');
        questions = await response.json();
    } catch (err) {
        console.log('Error Fetching Questions');
        console.log(err);
    }
}

