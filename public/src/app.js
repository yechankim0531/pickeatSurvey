const startButton = document.getElementById('startSurvey');
const next = document.getElementById('next');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');



const type = ["pref", "taste", "pref", "health","aroma", "texture", ]
const questions = ["How much do you like sweet", "How sweet do you find Skippy Peanut Butter","How much do you like saltiness", "Do you have allergies?"];
const a1 = ["Prefer Less", "Barley Sweet", "Prefer Less"];
const a2 = ["Neutral", "Just right", "Neutral"];
const a3 = ["Slightly Like", "Slightly Sweet", "Slightly Like"];
const a4 = ["Moderatly Like", "Sweet", "Moderatly Like"];
const a5 = ["Strongly Like", "Very Sweet", "Strongly Like"];

let currentQuestion = -1;

function load5choice() {
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
    if(type[currentQuestion]==="taste"){
        const image = document.createElement('img');
        image.id="foodimg"
        image.src = "https://target.scene7.com/is/image/Target/GUEST_1c812756-196e-4286-bce3-5f6f2a9a4067?wid=488&hei=488&fmt=pjpeg"
        foodPic.append(image)
        
    }

    
            
    
    document.getElementById("question").innerText = questions[currentQuestion];
    document.getElementById("a1").innerText = a1[currentQuestion];
    document.getElementById("a2").innerText = a2[currentQuestion];
    document.getElementById("a3").innerText = a3[currentQuestion];
    document.getElementById("a4").innerText = a4[currentQuestion];
    document.getElementById("a5").innerText = a5[currentQuestion];


}




const choice= ["None", "Shells", "Milk", "Peanuts", "Walnuts", "Fish", "Pork"]

function loadMultiplechoice() {
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
document.getElementById("question").innerText = questions[currentQuestion];
}








document.addEventListener('DOMContentLoaded', function () {
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
                console.log(type[currentQuestion])
                if(type[currentQuestion]==="health"){
                    loadMultiplechoice();
                }
                else{
                    load5choice();
                }
                
            }
            else {
                window.location.href = 'end.html';
            }
        });
       

    }


    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentQuestion == -1) {
                window.location.href = 'user.html';
            }
            else if (currentQuestion == 0) {
                window.location.href = 'question.html';
            }
            else {

                currentQuestion--;

                if(type[currentQuestion]==="Health"){
                    loadMultiplechoice();
                }
                else{
                    load5choice();
                }
            }

        });




    }


});








