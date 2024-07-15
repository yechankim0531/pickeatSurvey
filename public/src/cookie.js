
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
    const fd = new FormData(form)
    const obj = Object.fromEntries(fd)
    const json = JSON.stringify(obj)
    console.log(json)
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

function getCookie(name) {
    return cookiemap[name] || null;
}

