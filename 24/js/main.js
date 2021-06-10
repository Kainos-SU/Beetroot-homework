function StandartSection(sectionId) {
    this.section = document.getElementById(sectionId);
    if (!this.section) {
        throw `Error!\nSection ${sectionId} is not found!`;
    }
    this.input = this.section.getElementsByClassName("form__input-line");
    this.output = this.section.getElementsByClassName("exercise__output-field")[0];
    this.btn = this.section.getElementsByClassName("btn")[0];
}

StandartSection.prototype.test = function() {
    console.log(this);
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

        if (input > 0) 
            ++positives;
        else if (input < 0)
            ++negatives;
        else
            ++zeroes; 
    }

    exercise5.writeOutput(`Коротка статистика того шо ти наштрикав:<br>-Кількість позитивних чисел - ${positives}<br>-Кількість негативних чисел - ${negatives}<br>-Кількість нулів - ${zeroes}`);
});
