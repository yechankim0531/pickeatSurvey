
const cookiemap={}

function populateCookieMap() {
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        const [name, ...value] = c.split('=');
        cookiemap[name] = value.join('=');
    }
}
populateCookieMap();

function getInput(){
    const form = document.querySelector('form')
    //console.log(form.id)
    const fd = new FormData(form)
    const obj = {}
    fd.forEach((value, key) => {
        if (obj[key]) {
            if (!Array.isArray(obj[key])) {
                obj[key] = [obj[key]]
            }
            obj[key].push(value)
        } else {
            obj[key] = value
        }
    })
    //console.log(obj)
    const json = JSON.stringify(obj)
    //console.log(json)
    return json
}

//function setCookie()

function setCookie(days) { 
    let json = getInput();
    json = JSON.parse(json)
    

    for(input in json){
        
        if(input){
            
            const value = json[input]
            const date = new Date();
            date.setTime(date.getTime() + (days*24*60*60*1000));
            let expires = "expires="+ date.toUTCString();
            document.cookie = input+ "=" + value + ";" + expires + ";path=/";
            cookiemap[input] = value
        }
      
        
    }
    
   
  }
function setTime(days) {
    const time = endTime - startTime
    
    const set = (value) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        let expires = "expires=" + date.toUTCString();
        document.cookie = "time" + "=" + value + ";" + expires + ";path=/";
        cookiemap["time"] = value
        
    }

    if (!cookiemap["time"]) {
        cookiemap["time"] = []
        cookiemap["time"][currentQuestion] = time
        
    }
    else {
        if(!cookiemap["time"][currentQuestion]){
            cookiemap["time"][currentQuestion]=time
            console.log(time)
        }
       
    }
    set(cookiemap["time"]);

}
   




function getCookie(name) {
    return cookiemap[name] || null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}