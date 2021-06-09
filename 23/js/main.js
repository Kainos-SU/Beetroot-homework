const exercise1 = document.getElementById("exercise1");

function writeOutput (div, text, owerwrite=true) {
    if (owerwrite) {
        div.innerText = text;
    } else {
        div.innerHTML = div.innerHTML + text + "<br>";
    }

    //retrun div.innerHTML;
}

let exercise1obj = {};
exercise1obj.outputField = exercise1.getElementsByClassName("exercise__output-field")[0];
exercise1obj.inputField = exercise1.getElementsByClassName("exercise__input-line")[0];
exercise1obj.btn = exercise1.getElementsByClassName("btn")[0];

exercise1obj.btn.addEventListener("click", ()=>{
    let input = parseInt(exercise1obj.inputField.value);
    if (isNaN(input)) {
        writeOutput(exercise1obj.outputField, "Це не число. Якшо це дійсно твій вік - задумайся, можливо ти не правильно живеш.");
        return;
    }
    if (input <= 12 && input >= 0)
        writeOutput(exercise1obj.outputField, "Ти дитина. Витри молоко під носом!");
    else if (input > 12 && input <= 18)
        writeOutput(exercise1obj.outputField, "Мої вітання. Ти переріс стадію людської личинки і став підлітком");
    else if (input > 18 && input < 60)
        writeOutput(exercise1obj.outputField, "Ого, нічого собі, ти доріс до повноцінного, ДОРОСЛОГО члена соціуму. Можеш пишатись собою.");
    else if (input >= 60)
        writeOutput(exercise1obj.outputField, "Ну шо, кляча пенсійна, годинник тікає, час іде.");
    else
        writeOutput (exercise1obj.outputField, "Серйозно? Ти ввів від`ємний вік? думаєш самий розумний?");
});
