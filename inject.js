// this is the code which will be injected into a given page...

(function() {

    var link = document.createElement('link');
    link.href = "https://fonts.googleapis.com/css?family=Montserrat";
    link.rel = "stylesheet";
    document.body.appendChild(link);
    
	// just place a div at top right
    var div = document.createElement('div');
    div.id = "flyTranslator";
	div.style.position = 'fixed';
	div.style.top = 0;
    div.style.right = 0;
    div.innerText = "injected";
    div.style.backgroundColor = "#E63462";
    div.style.color = "#252525";
    div.style.padding = "10px";
    div.style.visibility = "hidden";
    div.style.width = "fit-content";
    div.style.fontFamily = "Montserrat, sans-serif";
    div.style.borderRadius = "3px";
    div.style.boxShadow = "1px 1px 5px 0px rgba(0,0,0,0.35)";
    document.body.appendChild(div);
    
    
    window.addEventListener("keydown", event => {
        if ((event.isComposing || event.keyCode === 18) && window.getSelection().toString().length > 0) { 
            sendRequest(window.getSelection().toString());
        }
    })

    window.onscroll = function(e) {
        div.style.visibility = "hidden";
    }
})();

function sendRequest(text) {
    const Http = new XMLHttpRequest();
    const url='http://localhost:3000/translate?text=' + text +'&lang=de';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange=(e)=>{
        document.getElementById("flyTranslator").innerText = Http.responseText + "  🧙";
    }

    var selectedTextPos = getSelectedTextPosition();
    var popup = document.getElementById("flyTranslator");
    popup.style.top = (selectedTextPos.y - 50) + "px";
    popup.style.left = selectedTextPos.x + "px";
    popup.style.visibility = "visible";
}

function getSelectedTextPosition() {
    s = window.getSelection();
    oRange = s.getRangeAt(0); //get the text range
    oRect = oRange.getBoundingClientRect();
    return oRect;
}
