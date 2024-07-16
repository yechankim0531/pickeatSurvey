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
    //console.log(choice)
    document.getElementById("a1").innerText = choice[0];
    document.getElementById("a2").innerText = choice[1]
    document.getElementById("a3").innerText = choice[2]
    document.getElementById("a4").innerText = choice[3]
    document.getElementById("a5").innerText = choice[4]

    
    const value = getCookie(`q${currentQuestion+1}`)
    if(value){
        const answer = document.getElementById(`choice${value}`) 
        answer.checked = "checked";
    }
    
    

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

const values = getCookie(`q${currentQuestion+1}`)

//console.log(typeof values)
//console.log(values)


if (values) {
    let valArray;
    if (typeof values === 'object') {
        valArray = values;
    } else {
        valArray = values.split(",")
    }
    valArray.forEach(val=>{
        const answer = document.getElementById(val) 
        answer.checked = "checked";
        })
}

}



function loadBMI(questions, currentQuestion) {
    const form = document.getElementById('answerChoice');
    document.getElementById("question").innerText = questions[currentQuestion].question;
    
    form.innerHTML = `
        <div class="input-data">
            <input type="text" placeholder="Height"required id="height" name= "height">
            <div class="underline"></div>
        </div>
        <label for="height">CM</label>
        <div class="input-data">
            <input type="text" placeholder="Weight" required id="weight" name= "weight">
            <div class="underline"></div>
            
        </div>
        
        <label for="weight">KG</label>
        `;
    
    loadUser();
    

    
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
    answer.checked = "checked";
    
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

function loadExtra(){
    
    const otherCheckbox = document.getElementById('Other');
    const diabetes = document.getElementById('Diabetes');
    const form = document.getElementById('answerChoice');

    if (otherCheckbox || diabetes) {
        // This function will handle both adding and removing the additional input
        const toggleOtherInput = () => {
            const otherDiv = document.getElementById('otherdiv');
            if (otherCheckbox.checked) {
                if (!otherDiv) {  // Check if the div doesn't already exist
                    
                    const html = `
                        <div id="otherdiv">
                            <label for="otherValue">Other:</label>
                            <input type="text" name="otherValue" id="otherValue">
                        </div>`;
                    form.insertAdjacentHTML('beforeend', html);
                }
            } else {
                if (otherDiv) {  // Check if the div exists
                    otherDiv.remove();
                }
            }
        };

        // Attach event listener to handle clicks
        otherCheckbox.addEventListener('click', toggleOtherInput);

        // Call the function to set the correct initial state based on the checkbox state when the page loads
        toggleOtherInput();
    }
}
