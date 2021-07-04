const CODE_E = 'KeyE';
const KEY_CODE_E = 69;


const CODE_S = 'KeyS';
const KEY_CODE_S = 83;



window.addEventListener("keydown", e=>{
    
    if (e.ctrlKey === false && e.metaKey === false) {
        return;
    }
    
    
    const isE = e.code === CODE_E || e.keyCode === KEY_CODE_E;
    const isS = e.code === CODE_S || e.keyCode === KEY_CODE_S;
    
    if (isE) {
        e.preventDefault();

        const someDiv = document.getElementById("editable");
        if (someDiv === null) {
            return;
        }
        const textContent = someDiv.innerText;

        const someTextArea = document.createElement("textarea");

        someTextArea.id = "textArea";

        someDiv.parentNode.replaceChild(someTextArea, someDiv);
        someTextArea.value = textContent;
    }

    
    if (isS) {

        e.preventDefault();
        const someTextArea = document.getElementById("textArea");

        if (someTextArea === null) {
            return;
        }
        const text = someTextArea.value;

        const someDiv = document.createElement("div");
        someDiv.id = "editable";

        someDiv.innerText = text;
        someTextArea.parentNode.replaceChild(someDiv, someTextArea);
    }
});