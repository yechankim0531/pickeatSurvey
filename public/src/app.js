const startButton = document.getElementById('startSurvey');
const nextBtn = document.getElementById('nextBtn');



const prevBtn = document.getElementById('prevBtn');
const questions = ["How much do you like sweet", "How much do you like saltiness"];
const a1 = ["Prefer Less", "Barley Sweet"];
const a2 = ["Neutral", "Just right"];
const a3 = ["Slightly Like", "Slightly Sweet"];
const a4 = ["Moderatly Like", "Sweet"];
const a5 = ["Strongly Like", "Very Sweet"];
let currentQuestion=0;

function loadNewPage(question, option1, option2, option3, option4, option5){
    const q = document.getElementById("question")
    const a1 = document.getElementById("a1")
    const a2 = document.getElementById("a2")
    const a3 = document.getElementById("a3")
    const a4 = document.getElementById("a4")
    const a5 = document.getElementById("a5")
    
    q.innerText = question
    console.log(q.innerText)
    a1.innerText= option1
    a2.innerText= option2
    a3.innerText= option3
    a4.innerText= option4
    a5.innerText= option5
    window.location.href = 'question.html';
    
}
document.addEventListener('DOMContentLoaded', function() {
    if(startButton){
        startButton.addEventListener('click', function() {
            // Redirect to the survey.html page when the button is clicked
            console.log("BH")
            window.location.href = 'user.html';
            
            
        });
    }
    
    if(nextBtn){
        nextBtn.addEventListener('click', function() {
            window.location.href = 'question.html';
            //console.log(questions[currentQuestion],a1[currentQuestion],a2[currentQuestion],a3[currentQuestion],a4[currentQuestion],a5[currentQuestion])
            window.onload = loadNewPage(questions[currentQuestion],a1[currentQuestion],a2[currentQuestion],a3[currentQuestion],a4[currentQuestion],a5[currentQuestion]);
            currentQuestion++;
            
        });
    }

    if(prevBtn){
        prevBtn.addEventListener('click', function() {
            window.location.href = 'user.html';
        });
    }

});

   

   
    
   
    

