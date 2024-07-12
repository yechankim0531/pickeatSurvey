



// const {load5choice} = require('./load5choice.js')
// const {loadMultiplechoice} = require('./loadMultiplechoice.js')

// const { text } = require("express");


const startButton = document.getElementById('startSurvey');
const next = document.getElementById('next');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let currentQuestion = 0;
let questions = [];


async function fetchQuestions() {
    try {
        let response = await fetch('/api/data/questions');
        questions = await response.json();
    } catch (err) {
        console.log('Error Fetching Questions');
        console.log(err);
    }
}






function load5choice(questions, currentQuestion) {
    const form = document.getElementById('answerChoice')
    const foodPic = document.getElementById('foodPic')
    form.innerHTML = '';
    foodPic.innerHTML='';

    for(let i=1; i<6; i++){
        const container = document.createElement('div')
        container.className = "radio-container"

        const radioInput = document.createElement('input');
        radioInput.type = 'radio'
        radioInput.name = "answer"
        radioInput.id = `choice${i}`
        radioInput.value=`${i}`

        const label = document.createElement('label')
        label.setAttribute('for', radioInput.id)
        label.id = `a${i}`
        

        container.append(radioInput, label)
        form.append(container)
    }
    if(questions[currentQuestion].type==="taste"){
        const image = document.createElement('img');
        image.id="foodimg"
        image.src = "https://target.scene7.com/is/image/Target/GUEST_1c812756-196e-4286-bce3-5f6f2a9a4067?wid=488&hei=488&fmt=pjpeg"
        foodPic.append(image)
        
    }

    
            
    
    document.getElementById("question").innerText = questions[currentQuestion].question;
    const choice = questions[currentQuestion].choices
    console.log(choice)
    document.getElementById("a1").innerText = choice[0];
    document.getElementById("a2").innerText = choice[1]
    document.getElementById("a3").innerText = choice[2]
    document.getElementById("a4").innerText = choice[3]
    document.getElementById("a5").innerText = choice[4]


}

function loadMultiplechoice(questions, currentQuestion) {
    const choice = questions[currentQuestion].choices
    const form = document.getElementById('answerChoice')
    form.innerHTML = '';
    

    for(let i=0; i<choice.length; i+=2){
        
        const container = document.createElement('div')
        container.className = "mChoice"
        for(let j=i; j<i+2; j++){
        if (j >= choice.length) {
            break;
        }    
        const option = document.createElement('input');
        option.type = 'checkbox'
        option.name = choice[j]
        option.id = choice[j]
        option.value= choice[j]

        const label = document.createElement('label')
        label.setAttribute('for', choice[j])
        label.id = `O${j}`
        label.innerText = choice[j]
        

        container.append(option, label)
        
        
    }
    form.append(container)
    
}
document.getElementById("question").innerText = questions[currentQuestion].question;
}


function loadBMI(questions, currentQuestion) {
    const form = document.getElementById('answerChoice');
    document.getElementById("question").innerText = questions[currentQuestion].question;
    
    form.innerHTML = `
        <div class="input-data">
            <input type="text" required id="height">
            <div class="underline"></div>
            <label for="height">Height</label>
        </div>
        <div class="input-data">
            <input type="text" required id="weight">
            <div class="underline"></div>
            <label for="weight">Weight</label>
        </div>`;
}




document.addEventListener('DOMContentLoaded', async  function () {
    await fetchQuestions();
    fetchQuestions().then(() => {
        console.log(questions)
    });

    if (startButton) {
        startButton.addEventListener('click', function () {
            
            window.location.href = 'user.html';


        });
    }

    if (next) {
        next.addEventListener('click', function () {

            window.location.href = 'question.html';

        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            currentQuestion++;
            if (currentQuestion < questions.length) {
                console.log(questions[currentQuestion])
                
                if(questions[currentQuestion].type==="health" || questions[currentQuestion].type==="restriction"){
                    loadMultiplechoice(questions,currentQuestion);
                }
                else if(questions[currentQuestion].type==="BMI"){
                    loadBMI(questions, currentQuestion)
                }
                else{
                    load5choice(questions,currentQuestion);
                }
                
            }
            else {
                window.location.href = 'end.html';
                
            }
        });
       

    }


    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            
            if (currentQuestion == 0) {
                window.location.href = 'user.html';
            }
            else if (currentQuestion == 1) {
                window.location.href = 'question.html';
            }
            else {

                currentQuestion--;

                if(questions[currentQuestion].type==="health"){
                    loadMultiplechoice(questions,currentQuestion);
                }
                else{
                    load5choice(questions,currentQuestion);
                }
            }

        });




    }


});








