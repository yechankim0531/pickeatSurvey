function load5choice(questions, currentQuestion) {
    const form = document.getElementById('answerChoice')
    const foodPic = document.getElementById('foodPic')
    form.innerHTML = ' ';
    foodPic.innerHTML=' ';
   
    

    for(let i=1; i<6; i++){
        const container = document.createElement('div')
        container.className = "radio-container"

        const radioInput = document.createElement('input');
        radioInput.type = 'radio'
        radioInput.name = `q${currentQuestion+1}`
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

    
    const value = getCookie(`q${currentQuestion+1}`)
    const answer = document.getElementById(`choice${value}`) 
    answer.checked = true;
    

}

function loadMultiplechoice(questions, currentQuestion) {
    const choice = questions[currentQuestion].choices
    const form = document.getElementById('answerChoice')
    form.innerHTML = ' ';
    

    for(let i=0; i<choice.length; i+=2){
        
        const container = document.createElement('div')
        container.className = "mChoice"
        for(let j=i; j<i+2; j++){
        if (j >= choice.length) {
            break;
        }    
        const option = document.createElement('input');
        option.type = 'checkbox'
        option.name = `q${currentQuestion+1}`
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

function loadHabit(questions, currentQuestion){
    const choice = questions[currentQuestion].choices
    const form = document.getElementById('answerChoice')
    document.getElementById("question").innerText = questions[currentQuestion].question;
    form.innerHTML = '';
    
    const container = document.createElement('div')
    container.className = "mChoice"
    for(let i=0; i<choice.length; i+=1){
        
     
        
        const option = document.createElement('input');
        option.type = 'radio'
        option.name = `q${currentQuestion+1}`
        option.id = choice[i]
        option.value= choice[i]

        const label = document.createElement('label')
        label.setAttribute('for', choice[i])
        label.id = `Choice${i}`
        label.innerText = choice[i]
        

        container.append(option, label)
        
        
    }
    form.append(container)

    const value = getCookie(`q${currentQuestion+1}`)
    const answer = document.getElementById(value) 
    answer.checked = true;
    
}


function loadUser() {
    const form = document.querySelector('form');
    Array.from(form.elements).forEach((input) => {
        if (input.name) {
            
            const cookieValue = getCookie(input.name);
            
            if (cookieValue) {
                input.value = cookieValue;
            }
        }
    });
}