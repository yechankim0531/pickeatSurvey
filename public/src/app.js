



// const {load5choice} = require('./load5choice.js')
// const {loadMultiplechoice} = require('./loadMultiplechoice.js')

// const { text } = require("express");


const startButton = document.getElementById('startSurvey');
const next = document.getElementById('next');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');




// const { performance } = require('perf_hooks');

let currentQuestion = 0;
let paginationIndex = -1;
let startTime;
let endTime;
let questions = [];

document.addEventListener('DOMContentLoaded', async function () {
    
    
    
    // Only fetch questions and load the current question if relevant elements are present
    if (document.getElementById('answerChoice')) {
        await fetchQuestions();

        fetchQuestions().then(() => {
            //console.log(questions);
            // Parse URL to get initial question index
            const urlParams = new URLSearchParams(window.location.search);
            currentQuestion = parseInt(urlParams.get('p')) - 1 || 0;
            console.log
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
        const answerChoices = document.querySelector('form');
        if(cookiemap['name']){
            next.style.backgroundColor = '#EA185E';
            next.style.color = '#fff';
        }
        answerChoices.addEventListener('change', function() {
            console.log('changed')
            if(isAnswered()){
                next.style.backgroundColor = '#EA185E';
                next.style.color = '#fff';
            }
            else{
                next.style.backgroundColor = '#EDEFF2';
                next.style.color = '#AEB4BA';
            }
            
        });
        next.addEventListener('click', function () {
            if (isAnswered()){
            setCookie(7)
            
            window.location.href = 'question.html';
            }
            
        });
    }

    
    
   
    
    if (nextBtn) {
        if (currentQuestion===0){
            startTime=new Date();
        }




        const answerChoices = document.querySelector('form');
        
    
            answerChoices.addEventListener('change', function() {
                if(isAnswered()){
                    
                    nextBtn.style.backgroundColor = '#EA185E';
                    nextBtn.style.color = '#fff';
                }
                else{
                    nextBtn.style.backgroundColor = '#EDEFF2';
                    nextBtn.style.color = '#AEB4BA';
                }
                
            });
        
        
        
        
        nextBtn.addEventListener('click', function () {
            
         
            if (isAnswered()){
                
                if(currentQuestion == questions.length-1){
                    endTime=new Date();
                    setTime(7)
                    sendData()
                    window.location.href = 'end.html';
    
                }
                else{
                    endTime=new Date();
                    setTime(7)
                    setCookie(7)
                    currentQuestion++;
                   
                      
                    if (currentQuestion < questions.length) {
                        updateURL();
                        loadCurrentQuestion();
                        
                    } 
        
                    if(currentQuestion == questions.length-1){
                        nextBtn.innerText = 'Submit'
        
                    }
                    
                    
                 
                    startTime=new Date();
                }
               
            }

           
            
            
        });
        
        }
        

    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            setCookie(7)
            if (currentQuestion === 0) {
                window.location.href = 'user.html';
            }
            
            else {
               
                currentQuestion--;
                updateURL();
                loadCurrentQuestion();
                nextBtn.innerText = 'Next';
                
            }
        });
    }


    
    
    
            
        
    


    
   
});

function loadCurrentQuestion() {
    
    if (!questions[currentQuestion]) {
        return;
    }
    //console.log(questions[currentQuestion]);
    if (questions[currentQuestion].type === "health" || questions[currentQuestion].type === "restriction") {
        loadMultiplechoice(questions, currentQuestion);
    } else if (questions[currentQuestion].type === "BMI") {
        loadBMI(questions, currentQuestion);
    } else if (questions[currentQuestion].type === "habit") {
        loadHabit(questions, currentQuestion);
    } else {
        load5choice(questions, currentQuestion);
    }
    loadExtra();
    adjustLabelFontSize();
    updateProgress()
    if(cookiemap[currentQuestion+1]||cookiemap['height']){
        nextBtn.style.backgroundColor = '#EA185E';
        nextBtn.style.color = '#fff';
    }
    else{
        nextBtn.style.backgroundColor = '#EDEFF2';
        nextBtn.style.color = '#AEB4BA';
    }

    handleNone()
    
    
}

function updateURL() {
    const newUrl = `${window.location.pathname}?p=${currentQuestion + 1}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
}
function updateProgress(){
    const progressbar = document.getElementById('progress-bar');
    let progress = ((currentQuestion+1)/questions.length)*100
    //console.log(progress)
    progressbar.style.width = `${progress}%`
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

function sendData(){
     const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cookiemap)
     }
    fetch('/api/form/sendData', options)
}


function isAnswered(){
    const form = document.querySelector('form')
    const fd = new FormData(form)
    let answered = false;
    fd.forEach((value, key) => {
        if(value===''){
            answered=false
        }
        else{
            answered = true
        }
    
    })
    return answered
}

function handleNone(){
    
    const none = document.getElementById('None')
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (none) {
        
        none.addEventListener('change', function() {
            const otherDiv =  document.getElementById('otherdiv');
            const hDiv =  document.getElementById('hypertensiondiv');
            const dDiv =  document.getElementById('diabetesdiv');

            
            if (this.checked) {
                if(otherDiv){
                    otherDiv.remove();
                    eraseCookie('otherAllergies');
                    cookiemap['otherAllergies']=""
                }

                if(hDiv){
                    hDiv.remove();
                    eraseCookie('bloodPressure');
                    cookiemap['bloodPressure']=""
                    eraseCookie('heartRate');
                    cookiemap['heartRate']=""
                }

                if(dDiv){
                    dDiv.remove();
                    eraseCookie('diabetesValue');
                    cookiemap['bloodPressure']=""
                    
                }
            
            
                
                checkboxes.forEach(checkbox => {
                    
                    if (checkbox.id !== 'None') {
                        checkbox.checked = false;
                    }
                });
            }
        });

        checkboxes.forEach(checkbox => {
            if (checkbox.id !== 'None') {
                checkbox.addEventListener('change', function() {
                    if (this.checked) {
                        none.checked = false;
                    }
                });
            }
        });
    }
}

function adjustLabelFontSize() {
    const labels = document.querySelectorAll('.mChoice label');
    labels.forEach(label => {
        let fontSize = parseInt(window.getComputedStyle(label).fontSize);
        
        while (label.scrollWidth > label.offsetWidth && fontSize > 10) { // 10px is the minimum font size you allow
            
            fontSize-=1.5;
            
            label.style.fontSize = `${fontSize}px`;
            
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    adjustLabelFontSize(); // Adjust on initial load
    window.addEventListener('resize', adjustLabelFontSize); // Adjust on window resize
});