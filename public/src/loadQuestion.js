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
        radioInput.name = currentQuestion+1
        radioInput.id = `choice${i}`
        radioInput.value=`${i}`

        const label = document.createElement('label')
        label.setAttribute('for', radioInput.id)
        label.id = `a${i}`
        

        container.append(radioInput, label)
        form.append(container)
    }
    let array = questions[currentQuestion].type.replace(/[\[\]]/g, '')
    array= array.split(',')
    if(array[0]==="taste"){
        
       
        
        const image = document.createElement('img');
        image.id="foodimg"
        image.src = "https://target.scene7.com/is/image/Target/GUEST_1c812756-196e-4286-bce3-5f6f2a9a4067?wid=488&hei=488&fmt=pjpeg"
        foodPic.append(image)


  
        const pagination = document.getElementById('pagination')
        pagination.innerHTML = `<span class="dot active"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>`

        const dots = document.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
       
        dots[array[1]].classList.add('active');
       
        
    }
    else{
        const pagination = document.getElementById('pagination')
        pagination.innerHTML = ``
        
    }

    
            
    
    document.getElementById("question").innerText = questions[currentQuestion].question;
    const choice = questions[currentQuestion].choices
    //console.log(choice)
    document.getElementById("a1").innerText = choice[0];
    document.getElementById("a2").innerText = choice[1]
    document.getElementById("a3").innerText = choice[2]
    document.getElementById("a4").innerText = choice[3]
    document.getElementById("a5").innerText = choice[4]

    
    const value = getCookie(currentQuestion+1)
    if(value){
        const answer = document.getElementById(`choice${value}`) 
        answer.checked = "checked";
    }
    
    

}

function loadMultiplechoice(questions, currentQuestion) {
    const choice = questions[currentQuestion].choices
    const form = document.getElementById('answerChoice')
    document.getElementById("question").innerText = questions[currentQuestion].question;
    form.innerHTML = '';
    
    const container = document.createElement('div')
    container.className = "mChoice"
    for(let i=0; i<choice.length; i+=1){
        
     
        
        const option = document.createElement('input');
        option.type = 'checkbox'
        option.name = currentQuestion+1
        option.id = choice[i]
        option.value= choice[i]

        const label = document.createElement('label')
        label.setAttribute('for', choice[i])
        label.id = `Choice${i}`
        label.innerText = choice[i]
        

        container.append(option, label)
        
        
    }
    form.append(container)
document.getElementById("question").innerText = questions[currentQuestion].question;

const values = getCookie(currentQuestion+1)

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

        <div class="BMI">
            <input type="text" placeholder="000"required id="height" name= "height">

            
        
        <label for="height">cm</label>

        </div>

        <div class="BMI">
            <input type="text" placeholder="000" required id="weight" name= "weight">

             <label for="weight">kg</label>
           </div>
        
       

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
        option.name = currentQuestion+1
        option.id = choice[i]
        option.value= choice[i]

        const label = document.createElement('label')
        label.setAttribute('for', choice[i])
        label.id = `Choice${i}`
        label.innerText = choice[i]
        

        container.append(option, label)
        
        
    }
    form.append(container)

    const value = getCookie(currentQuestion+1)

    if(value){
        const answer = document.getElementById(`${value}`) 
        answer.checked = "checked";
    }
    
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
    const hypertension = document.getElementById('Hypertension');
    const form = document.getElementById('answerChoice');

   

        // This function will handle both adding and removing the additional input
        const toggleOtherInput = (input, div, html) => {
            return function(){
                const otherDiv = document.getElementById(div);
                if (input.checked) {
                    if (!otherDiv) {  // Check if the div doesn't already exist
                        form.insertAdjacentHTML('beforeend', html);
                        const allElement = document.getElementById(div).querySelectorAll('input')
                        
                        allElement.forEach((element)=>{
                            const cookieValue = getCookie(element.name);
                            //console.log(cookieValue)
                            if(cookieValue){
                            element.value = cookieValue
                        }
                        })
                        
                    }
                } else {
                    if (otherDiv) {  // Check if the div exists
                        
                        const allElement = otherDiv.querySelectorAll('input')
                        
                        allElement.forEach((element)=>{
                            
                            eraseCookie(element.name);
                            cookiemap[element.name]=""
                            // cookiemap.delete(element.name)
                            
                        })

                        otherDiv.remove();
                        
                    }
                }
            }
        }
            
        

        // Attach event listener to handle clicks
        const otherAllergies = `
                        <div id="otherdiv" class = "extra">
                            <label for="otherAllergies" >Other: </label>
                            <input type="text"  name="otherAllergies" id="otherAllergies">
                        </div>`;

        const otherReligion = `
                        <div id="otherdiv" class = "extra">
                            <label for="otherReligion" >Other: </label>
                            <input type="text"  name="otherReligion" id="otherReligion">
                        </div>`;
        

        const diabetesHTML = `
                        <div id="diabetesdiv" class = "extra">
                            <label for="diabetesValue" >Recent Fasting Blood Sugar: </label>
                            <input type="text" name="diabetesValue"  id="diabetesValue">
                            <div class='unit'> mg/dL </div>
                        </div>`;
        const hypertensionHTML = `
                        <div id="hypertensiondiv" >
                         <div class = "extra">
                            <label for="bloodPressure" >Recent Systolic/Diastolic Blood Pressure: </label>
                            <input type="text" name="bloodPressure" id="bloodPressure">
                            <div class='unit'> mgHg </div>
                             </div>
                             <div class = "extra">
                            <label for="heartRate" >Recent Heart Rate:</label>
                            <input type="text" name="heartRate" id="heartRate">
                            <div class='unit'> bpm </div>
                        </div>`;
        if(otherCheckbox){
            if(currentQuestion==37){
                otherCheckbox.addEventListener('click', toggleOtherInput(otherCheckbox,"otherdiv",otherAllergies));
                toggleOtherInput(otherCheckbox,"otherdiv",otherAllergies)()
            }
            if(currentQuestion==41){
                otherCheckbox.addEventListener('click', toggleOtherInput(otherCheckbox,"otherdiv",otherReligion));
                toggleOtherInput(otherCheckbox,"otherdiv",otherReligion)()
            }
            

           
        }
        if(diabetes){
            diabetes.addEventListener('click', toggleOtherInput(diabetes,"diabetesdiv",diabetesHTML));
            toggleOtherInput(diabetes,"diabetesdiv",diabetesHTML)()
        }
        if(hypertension){
            hypertension.addEventListener('click', toggleOtherInput(hypertension,"hypertensiondiv",hypertensionHTML));
            toggleOtherInput(hypertension,"hypertensiondiv",hypertensionHTML)()
        }
        
        


        toggleOtherInput();
    }

