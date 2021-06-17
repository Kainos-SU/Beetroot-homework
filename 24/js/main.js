function StandartSection(sectionId) {
    this.section = document.getElementById(sectionId);
    if (!this.section) {
        throw `Error!\nSection ${sectionId} is not found!`;
    }
    this.input = this.section.getElementsByClassName("form__input-line");
    this.output = this.section.getElementsByClassName("exercise__output-field")[0];
    this.btn = this.section.getElementsByClassName("btn")[0];
}


StandartSection.prototype.writeOutput = function (message, overwrite=true) {
    if (overwrite) {
        this.output.innerHTML="";
        this.output.innerHTML=message;
    } else {
        this.output.innerHTML = `${this.output.innerHTML}<br>${message}`;
    }
}

function getRangeSum (a, b) {
    if (a > b) {
        [a, b] = [b, a];
    }

    let result = 0;

    for (let i = a; i <= b; ++i) {
        result += i;
    }

    return result;
}

function gcd (first, second) {
    if (first < second) {
        [first, second] = [second, first];
    }

    while (0 !== second) {
        let temp = first % second;
        first = second;
        second = temp;
    }

    return first;
}

function* allDividers (number) {
    if (!Number.isInteger(number)) {
        throw "Error!\nThe number is floating point number, can not calculate dividers";
    }

    const endPoint = Math.floor(number / 2) + 1;

    for (let i = 1; i <= endPoint; ++i) {
        if (number % i === 0)
            yield i;
    }
}

const exercise1 = new StandartSection("exercise1");
exercise1.btn.addEventListener("click", e=>{
    e.preventDefault();

    const begin = parseInt(exercise1.input[0].value);
    const end = parseInt(exercise1.input[1].value);

    if (isNaN(begin) || isNaN(end)) {
        exercise1.writeOutput("Введіть числа. Просто числа, порядок не важливий, сам розберусь.");
        return;
    }

    exercise1.writeOutput(getRangeSum(begin, end));
});

const exercise2 = new StandartSection("exercise2");
exercise2.btn.addEventListener("click", e=>{
    e.preventDefault();

    const first = parseInt(exercise2.input[0].value);
    const second = parseInt(exercise2.input[1].value);

    if (isNaN(first) || isNaN(second)) {
        exercise2.writeOutput("Ти шо, самий умний? Просять же ж тебе, введи число.");
        return;
    }

    exercise2.writeOutput(gcd(first, second));
});

const exercise3 = new StandartSection("exercise3");
exercise3.btn.addEventListener("click", e=>{
    e.preventDefault();

    exercise3.writeOutput("");

    const input = parseInt(exercise3.input[0].value);
    if (isNaN(input)) {
        exercise3.writeOutput("Число! Введи, довбане число.");
        return;
    }else if (input === 0) {
        exercise3.writeOutput("І шо ти пропонуєш з нульом робити?");
        return;
    }

    for (let i of allDividers(Math.abs(input))) {
        exercise3.writeOutput(i, false);
    }
});

const exercise4 = new StandartSection("exercise4");
exercise4.btn.addEventListener("click", e=>{
    e.preventDefault();

    let counter = 0;
    const number = parseInt(exercise4.input[0].value);

    if (isNaN(number)) {
        exercise4.writeOutput("Введи число!");
        return;
    }
    if (number === 0) {
        exercise4.writeOutput("Нуль він і в Африці нуль. Шо ти хочеш од мене?");
        return;
    }
    let digitSet = Math.abs(number);

    while (digitSet !== 0) {
        digitSet = Math.floor(digitSet / 10);
        ++counter;
    }

    exercise4.writeOutput(`У числі ${number} ${counter} цифр!`);
});


const exercise5 = new StandartSection("exercise5");
exercise5.btn.addEventListener("click", e=>{
    e.preventDefault();
    const antiMagicNumber = 10;
    let positives = 0;
    let negatives = 0;
    let zeroes = 0;
    let even = 0;
    let odd = 0;
    for (let i = 0; i < antiMagicNumber; ++i) {
        let input;
        if (!i) {
            input = parseInt(prompt("Введіть перше із десяти чисел:"));
        }else if (i === antiMagicNumber - 1){
            input = parseInt(prompt("Останнє"));
        } else {
            input = parseInt(prompt(`Лишилось ${10 - i} чисел`));
        }

        if (isNaN(input)) {
            alert("Введи число!");
            // Викуси Python зі своїми for через range()
            --i;
            continue;
        }

        if (input % 2) {
            ++odd;
        }else {
            ++even;
        }

        if (input > 0) 
            ++positives;
        else if (input < 0)
            ++negatives;
        else
            ++zeroes; 
    }

    exercise5.writeOutput(`Коротка статистика того шо ти наштрикав:<br>-Кількість позитивних чисел - ${positives}<br>-Кількість негативних чисел - ${negatives}<br>-Кількість нулів - ${zeroes}<br>Кількість парних чисел - ${even}<br>Кількість непарних чисел - ${odd}`);
});


const exercise6 = new StandartSection("exercise6");
exercise6.btn.addEventListener("click", e=>{
    e.preventDefault();

    while(true) {
        let firstNumber, secondNumber;
        do{
            firstNumber = parseInt(prompt("Введіть перше число:"));
            secondNumber = parseInt(prompt("Введіть друге число:"));
            if (isNaN(firstNumber) || isNaN(secondNumber))
                alert("Введи числа!");
        } while (isNaN(firstNumber) || isNaN(secondNumber))

        let operand = prompt("Введіть одну із можливих операцій ('+', '-', '/', '*', '**')");
        switch (operand) {
            case '+':
                alert(`Сума введених чисел ${firstNumber + secondNumber}`);
                break;
            case '-':
                alert(`Різниця введених чисел ${firstNumber - secondNumber}`);
                break;
            case '*':
                alert(`Добуток введених чисел ${firstNumber * secondNumber}`);
                break;
            case '/':
                alert(`Частка ${secondNumber} від ${firstNumber} становить ${firstNumber / secondNumber}`);
                break;
            case '**':
                alert(`${firstNumber} в степені ${secondNumber} дорівнює ${firstNumber ** secondNumber}`);
                break;
            default:
                alert(`Помилка! ${operand} не є корректним операндом. Спробуй ще раз!`);
                continue;
        }

        if (!(confirm("Бажаеш продовжити?"))) {
            break;
        }
    }
});



const exercise7 = new StandartSection("exercise7");
exercise7.checkbox = exercise7.section.querySelector("input[name=right_shift]");
exercise7.btn.addEventListener("click", e=>{
    e.preventDefault();

    let number = parseInt(exercise7.input[0].value); 
    const shift = parseInt(exercise7.input[1].value);
    if (isNaN(number) || isNaN(shift)){
        exercise7.writeOutput("Введіть цілі числа");
        return;
    }

    let temp = number;
    let counter = 0;
    while (temp) {
        ++counter;
        temp = Math.floor(temp / 10);
    }
    --counter;

    if (exercise7.checkbox.checked) {
        for (let i = 0; i < shift; ++i) {
            number = (number % 10) * (10 ** counter) + Math.floor(number / 10);
        }
    }else {
        for (let i = 0; i < shift; ++i) {
            number = Math.floor(number / (10 **counter)) + ((number % (10 ** counter)) * 10);
        }
    }
    exercise7.writeOutput(number);
});


const exercise8 = new StandartSection("exercise8");
exercise8.btn.addEventListener("click", e=>{
    e.preventDefault();

    let now = new Date();
    const option = {weekday: "long"};
    let str;
    while(true) {
        const dateString = new Intl.DateTimeFormat("uk", option).format(now); 
        if (!confirm(`${dateString[0].toUpperCase() + dateString.substring(1)}. Хочеш продовжити?`))
            return;
        now.setDate(now.getDate() + 1);
    }
});

const exercise9 = new StandartSection("exercise9");
exercise9.btn.addEventListener("click", e=>{
    e.preventDefault();

    exercise9.writeOutput("");
    const table = document.createElement("table");
    table.setAttribute("class", "exercise__output-table");
    exercise9.output.append(table);
    const tbody = document.createElement("tbody");

    let tr = document.createElement("tr");
    
    for (let i = 0; i < 8; ++i) {
        if (i % 4 === 0) {
            tbody.append(tr);
            tr = document.createElement("tr");
        }
        let td = document.createElement("td");
        for (let j = 1; j <= 10; ++j){
            let p = document.createElement("p");
            p.innerText = `${i+2} * ${j} = ${(i + 2) * j}`;
            td.append(p);
        }
        tr.append(td);
    }
    tbody.append(tr);
    table.append(tbody);
});


const exercise10 = new StandartSection("exercise10");
exercise10.btn.addEventListener("click", e=>{
    e.preventDefault();

    let beginRange = parseInt(exercise10.input[0].value);
    let endRange = parseInt(exercise10.input[1].value);
    if (isNaN(beginRange) || isNaN(endRange)) {
        exercise10.writeOutput("Введи числа!");
        return;
    }
    if (beginRange > endRange) {
        [beginRange, endRange] = [endRange, beginRange];
    }

    while(true) {
        let guess = Math.floor((endRange - beginRange) / 2) + beginRange;
        let t = prompt(`Ти загадав ${guess}?\nЯкщо це так введи "=", якщо загадане тобою число більше, введи "+", якщо менше "-".`);

        switch(t) {
            case "+":
                beginRange = guess;
                break;
            case "-":
                endRange = guess;
                break;
            case "=":
                exercise10.writeOutput(`Загадане тобою число ${guess}`);
                return;
            case "":
            case null:
                return;
            default:
                alert("Неправильний вибір!");
        }
    }
});
