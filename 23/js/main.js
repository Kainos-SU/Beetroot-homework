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


const exercise2 = document.getElementById("exercise2");
const exercise2obj = {
    "inputField" : exercise2.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise2.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise2.getElementsByClassName("exercise__btn")[0]
};


exercise2obj.btn.addEventListener("click", ()=>{
    let number = parseInt(exercise2obj.inputField.value);
    if (isNaN(number)){
        writeOutput(exercise2obj.outputField, "Введи число.");
        return;
    }
    if (number >= 10) {
        writeOutput(exercise2obj.outputField, `Необхідно ввести цифру. Введено ${number}`);
        return;
    }

    let output;
    switch(number){
        case 0:
            output = ')';
            break;
        case 1:
            output = '!';
            break;
        case 2:
            output = '@';
            break;
        case 3:
            output = '#';
            break;
        case 4:
            output = '$';
            break;
        case 5:
            output = '%';
            break;
        case 6:
            output = '^';
            break;
        case 7:
            output = '&';
            break;
        case 8:
            output = '*';
            break;
        case 9:
            output = '(';
    }
    writeOutput(exercise2obj.outputField, output);
});

const exercise3 = document.getElementById("exercise3");
const exercise3obj = {
    "inputField" : exercise3.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise3.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise3.getElementsByClassName("exercise__btn")[0]
};

exercise3obj.btn.addEventListener("click", ()=>{
    let number = parseInt(exercise3obj.inputField.value);
    if (isNaN(number)) {
        writeOutput(exercise3obj.outputField, "Введи число!");
        return;
    }

    let temp = number;
    let repeted = new Set();
    while (temp) {
        let digit = temp % 10;
        temp = Math.floor(temp / 10);
        let temp1 = temp;
        while(temp1){
            if (temp1 % 10 === digit)
                repeted.add(digit);
            temp1 = Math.floor(temp1 / 10);
        }
    }

    if(repeted.size === 0) {
        writeOutput(exercise3obj.outputField, "Цифри в числі унікальні.");
    }else {
        writeOutput(exercise3obj.outputField, "В числі повторюються цифри <br>");
        for (let i of repeted) {
            writeOutput(exercise3obj.outputField, ` ${i} `, false);
        }
    }
});
