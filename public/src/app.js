const startButton = document.getElementById('startSurvey');
const next = document.getElementById('next');
const nextBtn = document.getElementById('nextBtn');



const prevBtn = document.getElementById('prevBtn');
const questions = ["How much do you like sweet", "How much do you like saltiness"];
const a1 = ["Prefer Less", "Barley Sweet"];
const a2 = ["Neutral", "Just right"];
const a3 = ["Slightly Like", "Slightly Sweet"];
const a4 = ["Moderatly Like", "Sweet"];
const a5 = ["Strongly Like", "Very Sweet"];
let currentQuestion = -1;

function loadNewPage() {
    document.getElementById("question").innerText = questions[currentQuestion];
    document.getElementById("a1").innerText = a1[currentQuestion];
    document.getElementById("a2").innerText = a2[currentQuestion];
    document.getElementById("a3").innerText = a3[currentQuestion];
    document.getElementById("a4").innerText = a4[currentQuestion];
    document.getElementById("a5").innerText = a5[currentQuestion];


}
document.addEventListener('DOMContentLoaded', function () {
    if (startButton) {
        startButton.addEventListener('click', function () {
            // Redirect to the survey.html page when the button is clicked
            console.log("BH")
            window.location.href = 'user.html';


        });
    }

    if (next) {
        next.addEventListener('click', function () {
            
            window.location.href = 'question.html';
          
        });
    }

    if (nextBtn) {
        if (currentQuestion<questions.length){
            nextBtn.addEventListener('click', function () {
                console.log(currentQuestion)
                currentQuestion++;
                loadNewPage();
                
              
            });
        }
        else{
            nextBtn.addEventListener('click', function () {
                window.location.href= 'end.html';
                
              
            });
            
        }
        
    }


    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if(currentQuestion==-1){
                window.location.href = 'user.html';
            }
            else if(currentQuestion==0){
                window.location.href = 'question.html';
            }
            else{
                
                    currentQuestion--;
                    loadNewPage();
                
            }
            
        });

       
        
        
    }
  

});








