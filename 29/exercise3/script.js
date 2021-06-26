const lights = Array.from(document.querySelectorAll(".trafic-light__light"));

let counter = 0;

document.getElementById("button").addEventListener("click", e=>{
    // debugger;
    e.preventDefault();

    for (let el of lights) {
        el.style.backgroundColor = "currentColor";
    }

    switch(counter) {
        case 0:
            lights[counter].style.backgroundColor = "red";
            break;
        case 1:
            lights[counter].style.backgroundColor = "yellow";
            break;
        case 2:
            lights[counter].style.backgroundColor = "green";
            break;
        default:
            counter = -1;
    }

    counter++;
});