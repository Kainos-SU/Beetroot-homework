const exercise1 = document.getElementById("exercise1");

function writeOutput (div, text, owerwrite=true) {
    if (owerwrite) {
        div.innerText = text;
    } else {
        div.innerHTML = div.innerHTML + text + "<br>";
    }

    //retrun div.innerHTML;
}

function yearIsLeep (year) {
    let div400 = (year % 400) === 0;
    let div4 = (year % 4) === 0 && (year % 100) !== 0;

    if (div400 || div4) {
        return true;
    }
    return false;
}

let exercise1obj = {};
exercise1obj.outputField = exercise1.getElementsByClassName("exercise__output-field")[0];
exercise1obj.inputField = exercise1.getElementsByClassName("exercise__input-line")[0];
exercise1obj.btn = exercise1.getElementsByClassName("btn")[0];

exercise1obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
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


exercise2obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
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

/*exercise3obj.btn.addEventListener("click", ()=>{
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
});*/

exercise3obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
    let number = parseInt(exercise3obj.inputField.value);
    if (isNaN(number)) {
        writeOutput(exercise3obj.outputField, "Необхідно ввести число!");
        return;
    }
    if (number >= 1000 || number < 100) {
        writeOutput(exercise3obj.outputField, `Необхідно ввести трицифрове число. Введено ${number}`);
        return;
    }

    let temp = number;
    do {
        console.log(temp);
        let digit = temp % 10;
        temp = Math.floor(temp / 10);
        let temp2 = temp;

        while (0 !== temp2) {
            if (digit === temp2 % 10) {
                writeOutput(exercise3obj.outputField, "Цифри в числі повторюються!");
                return;
            }
            temp2 = Math.floor(temp2 / 10);
        }
    } while (0 !== temp);

    writeOutput(exercise3obj.outputField, "Цифри в числі унікальні.");
});


const exercise4 = document.getElementById("exercise4");
const exercise4obj = {
    "inputField" : exercise4.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise4.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise4.getElementsByClassName("exercise__btn")[0]
};

exercise4obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
    const year = parseInt(exercise4obj.inputField.value);
    if (isNaN(year)) {
        writeOutput(exercise4obj.outputField, `Необхідно ввести рік в форматі числа (2005, 1994, тощо). Введено ${year}`);
        return;
    }

    div400 = (year % 400) === 0;
    div4 = (year % 4) === 0 && (year % 100) !== 0;

    if (div400 || div4) {
        writeOutput(exercise4obj.outputField, `${year} - високосний`);
        return;
    }
    writeOutput(exercise4obj.outputField, `${year} - не високосний`);
});


const exercise5 = document.getElementById("exercise5");
const exercise5obj = {
    "inputField" : exercise5.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise5.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise5.getElementsByClassName("exercise__btn")[0]
};

exercise5obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
    const number = parseInt(exercise5obj.inputField.value);

    if (isNaN(number)) {
        writeOutput(exercise5obj.outputField, "Введіть число!");
        return;
    }

    let temp = number;
    let secondOne = 0;

    do {
        secondOne = secondOne * 10 + (temp % 10);
        temp = Math.floor(temp / 10);
    } while (0 !== temp);

    console.log(secondOne + "\t" + number);

    if (secondOne === number) {
        writeOutput(exercise5obj.outputField, `${number} - паліндром!`);
    } else {
        writeOutput(exercise5obj.outputField, `${number} - не паліндром!`);
    }
});


const exercise6 = document.getElementById("exercise6");
const exercise6obj = {
    "inputField" : exercise6.getElementsByClassName("form__input-line")[0],
    "outputField" : exercise6.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise6.getElementsByClassName("form__btn")[0],
    "from": exercise6.querySelectorAll("[name=from]"),
    "to": exercise6.querySelectorAll("[name=to]")
};

fetch("https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json")
    .then(response=>response.json())
    .then(respose=>exercise6obj.exchange = respose);

exercise6obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();
    const sum = parseFloat(exercise6obj.inputField.value);
    if (isNaN(sum)) {
        writeOutput(exercise6obj.outputField, "Необхідно вести число");
        return;
    }

    let from, to;
    for (let i of exercise6obj.from) {
        if (i.checked) {
            from = i.value;
            break;
        }
    }

    for (let i of exercise6obj.to) {
        if (i.checked) {
            to = i.value;
            break;
        }
    }

    let result = 0;
    
    if (from === to && from === "UAH") {
        result = sum;
    } else if (from === "UAH") {
        let to_num = exercise6obj.exchange.find(i=>i.cc === to);
        result = sum / to_num.rate;
    } else if (to === "UAH") {
        let from_num = exercise6obj.exchange.find(i=>i.cc === from);
        result = sum * from_num.rate;
    } else {
        let from_num = exercise6obj.exchange.find(i=>i.cc === from);
        let to_num = exercise6obj.exchange.find(i=>i.cc === to);

        result = sum * (from_num.rate / to_num.rate);
    }
    
    writeOutput(exercise6obj.outputField, `${sum} ${from} = ${result} ${to}`);
});

const exercise7 = document.getElementById("exercise7");
const exercise7obj = {
    "inputField" : exercise7.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise7.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise7.getElementsByClassName("exercise__btn")[0]
};

exercise7obj.btn.addEventListener("click", (e)=>{
    e.preventDefault();

    const sum = parseFloat(exercise7obj.inputField.value);
    if(isNaN(sum)) {
        writeOutput(exercise7obj.outputField, "Введіть число!");
        return;
    }

    let discount = 0;

    if (sum >= 200 && sum < 300) {
        discount = 3;
    }else if (sum >= 300 && sum < 500) {
        discount = 5;
    }else if (sum >= 500) {
        discount = 7;
    }

    writeOutput(exercise7obj.outputField, `Сума покупки - ${sum}, знижка - ${discount}%\n Значення суми зі знижкою ${sum * (1 - discount / 100)}`);
})

const exercise8 = document.getElementById("exercise8");
const exercise8obj = {
    "circle" : exercise8.querySelector("input[name=circle]"),
    "square" : exercise8.querySelector("input[name=square]"),
    "outputField" : exercise8.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise8.getElementsByClassName("form__btn")[0]
};

exercise8obj.btn.addEventListener("click", e=>{
    e.preventDefault();

    const circle_area = parseFloat(exercise8obj.circle.value);
    const square_perimetr = parseFloat(exercise8obj.square.value);
    if (isNaN(circle_area) || isNaN(square_perimetr)) {
        writeOutput(exercise8obj, "Введіть в обидва поля числові значення!");
        return;
    }

    const circle_radius = Math.sqrt(circle_area / Math.PI);
    const square_side = square_perimetr / 4;

    if ((2 * circle_radius) <= square_side) {
        writeOutput(exercise8obj.outputField, `Коло з площою ${circle_area} можна вписати в квадрат з периметром ${square_perimetr}`);
    } else {
        writeOutput(exercise8obj.outputField, `Коло з площою ${circle_area} НЕ можна вписати в квадрат з периметром ${square_perimetr}`);
    }
});


const exercise9 = document.getElementById("exercise9");
const exercise9obj = {
    "outputField" : exercise9.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise9.getElementsByClassName("form__btn")[0],
    "questions" : [
        Array.from(exercise9.querySelectorAll("[name=first_question]")),
        Array.from(exercise9.querySelectorAll("[name=second_question]")),
        Array.from(exercise9.querySelectorAll("[name=third_question]"))
    ]
};

exercise9obj.btn.addEventListener("click", e=>{
    e.preventDefault();

    let score = 0;
    for (let i of exercise9obj.questions) {
        if (i.find(j=>j.checked).value === "true") {
            score += 2;
        }
    }

    writeOutput(exercise9obj.outputField, `Твій рахунок ${score}`);
})


const exercise10 = document.getElementById("exercise10");
const exercise10obj = {
    "inputField" : exercise10.getElementsByClassName("exercise__input-line")[0],
    "outputField" : exercise10.getElementsByClassName("exercise__output-field")[0],
    "btn" : exercise10.getElementsByClassName("exercise__btn")[0]
};

exercise10obj.btn.addEventListener("click", e=>{
    e.preventDefault();

    let date = exercise10obj.inputField.value;
    let regexpdate = /^[0-9]{1,2}.[0-9]{1,2}.[0-9]{4}$/;

    let day, month, year;
    [day, month, year] = date.split(".");
    if (!(date.match(regexpdate))) {
        writeOutput(exercise10obj.outputField, `Очікується дата в форматі дд.мм.рррр. Введено ${date}`);
        return;
    }

    day -= 1;
    if (day == 0) {
        month -= 1;
        if (month == 0) {
            year -= 1;
            month = 12;
        }
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                day = 31;
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                day = 30;
                break;
            case 2:
                if (yearIsLeep(year)){
                    day = 29;
                }
                else
                    day = 28;
        }
    }

    writeOutput(exercise10obj.outputField, `${day}.${month}.${year}`);

});