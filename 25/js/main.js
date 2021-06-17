//Оголошую конструктор для об'єкта для зручного доступу до
//DOM елементів секцій сторінки
function SimpleSection (sectionId) {
    this.section = document.getElementById(sectionId);
    this.input = this.section.querySelectorAll("input[type=text]");
    this.output = this.section.getElementsByClassName("exercise__output-field")[0];
    this.btn = this.section.getElementsByClassName("btn")[0];
}

//Присвоюю екземплярам прототипу метод для виведення данних в вихідний div секції
SimpleSection.prototype.print = function (message, owerwrite=true) {
    if (owerwrite) {
        this.output.innerHTML = message;
    } else {
        this.output.innerHTML = this.output.innerHTML + `<br>${message}`;
    }
}


//===================================Exercise 1=================
//Вирішення першого завдання
const exercise_1 = new SimpleSection("exercise1");
function numberCompair (number1, number2) {
    if (number1 > number2) {
        return 1;
    }
    if (number2 > number1) {
        return -1;
    }

    return 0;
}
//Присвоюю eventListener для кнопки на натиснення і передію йому анонімну функцію,
//в якій я викликаю функцію порівняння чисел
exercise_1.btn.addEventListener("click", e=>{
    e.preventDefault();

    const number1 = parseInt(exercise_1.input[0].value);
    const number2 = parseInt(exercise_1.input[1].value);

    if (isNaN(number1) || isNaN(number2)) {
        exercise_1.print("Введи число!");
        return;
    }

    exercise_1.print(numberCompair(number1, number2));
});


//=====================Exercise 2==================================

//Вирішення другого завдання
const exercise_2 = new SimpleSection("exercise2");

//Рекурсивна функція знаходження факторіалу
function fact(number) {
    
    if (number === 1 || number === 0) {
        return number;
    }
    
    return number * fact(Math.abs(number) - 1)
}

//Знову івентЛісенер
exercise_2.btn.addEventListener("click", e=>{
    e.preventDefault();

    const number = parseInt(exercise_2.input[0].value);

    if (isNaN(number)) {
        exercise_2.print("Введи число!");
        return;
    }

    exercise_2.print(fact(number));
});



//================================Exercise 3======================
//Вирішення третьої задачі
const exercise_3 = new SimpleSection("exercise3");


function numberConcat (number1, number2, number3) {
    if (number1 > 9 || number2 > 9 || number3 > 9)
        throw "Error! Function accepts only digits!";

    return number3 + number2 * 10 + number1 * 100;
}

exercise_3.btn.addEventListener("click", e=>{
    e.preventDefault();

    const num1 = parseInt(exercise_3.input[0].value);
    const num2 = parseInt(exercise_3.input[1].value);
    const num3 = parseInt(exercise_3.input[2].value);

    if (isNaN(num1) || isNaN(num2) || isNaN(num3)) {
        exercise_3.print("Очікується введення цифр!");
        return;
    }

    exercise_3.print(numberConcat(num1, num2, num3));
});


//========================Exercise 4===============================

const exercise_4 = new SimpleSection("exercise4");
exercise_4.square = exercise_4.section.querySelector(".exercise__output-square");

function area (width, height) {
    if (isNaN(width)){
        throw `Expected 'width' as number, get '${width}'`;
    }

    if (height === undefined){
        height = width;
    } else if (isNaN(height)){
        throw `Expected 'height' as number, get '${height}'`;
    }
    return width * height;
}

exercise_4.btn.addEventListener("click", e=>{
    e.preventDefault();

    const width = exercise_4.input[0].value;
    const height = exercise_4.input[1].value;
    
    let someArea;
    if (width === "" && height !== "") {
        try {
            someArea = area(height);
        } catch (error) {
            exercise_4.print("Введіть число!");
            return;
        }
    } else if (height === "" && width !== "") {
        try {
            someArea = area(width);
        } catch (error) {
            exercise_4.print("Введіть число!");
            return;
        }
    } else if (Number(width) !== NaN && Number(height) !== NaN) {
        someArea = area(width, height);
    } else {
        exercise_4.print("Введіть число!");
        return;
    }

    exercise_4.square.style.width = width + "px";
    exercise_4.square.style.height = (height === "" ? width : height) + "px";
    exercise_4.square.style.border = "2px solid black";
    exercise_4.square.style.display = "flex";
    exercise_4.square.style.textAlign = "center";
    exercise_4.square.style.alignItems = "center";

    exercise_4.print(`Площа прямокутника = "${someArea}"`);


});


//======================Exercise 5==================================
const exercise_5 = new SimpleSection("exercise5");
function perfectNumber (num) {
    if (num === 1) {
        return false;
    }
    let sum = 1;
    for (let i = 2; i < num; ++i) {
        if (num % i === 0) {
            sum += i;
        }
    }

    if(sum === num) {
        return true;
    }
    return false;
}

exercise_5.btn.addEventListener("click", e=>{
    e.preventDefault();

    const num = parseInt(exercise_5.input[0].value);
    
    if (isNaN(num)){
        exercise_5.print("Введи число.");
        return;
    }

    if (perfectNumber(num)) {
        exercise_5.print(`${num} - являється ідеальним`);
    } else {
        exercise_5.print(`${num} - НЕ являється ідеальним`);
    }
});



//===========================Exercise 6=================================
const exercise_6 = new SimpleSection("exercise6");
/*
Я не зміг придумати нічого краще, ніж використати функцію генератор,
шоб вирішити цю задачу не використовючи масиви
(виправдання слабака, да я знаю, однак я не зміг
придумати як зробити функцію універсальною)
 */
function* perfectRange(start, end) {
    if (start > end) {
        [start, end] = [end, start];
    }

    for (let i = start; i <= end; ++i) {
        if (perfectNumber(i)) {
            yield i;
        }
    }
}

exercise_6.btn.addEventListener("click", e=>{
    e.preventDefault();

    const num1 = parseInt(exercise_6.input[0].value);
    const num2 = parseInt(exercise_6.input[1].value);

    if (isNaN(num1) || isNaN(num2)) {
        exercise_6.print("Введи число!");
        return;
    }

    const gen = perfectRange(num1, num2);
    result = "";
    //DRY вийшов в покурити
    for (let {value, done} = gen.next(); !done; {done, value} = gen.next()) {
        console.log(value + "\t" + done);
        result += (value + "<br>");
    }

    if (result.lenght === 0) {
        exercise_6.print("У вказаному діапазоні відсутні ІДЕАЛЬНІ ЧИСЛА!");
    } else {
        exercise_6.print("У вказаному діапазоні є наступні ідеальні числа:<br>" + result);
        exercise_6.output.style.textAlign = "center";
    }
});


//==========================Exercise 7===================================

const exercise_7 = new SimpleSection("exercise7");
function timeString (hours, minutes, seconds) {
    if (minutes === undefined) { minutes = "00"; }
    if (seconds === undefined) { seconds = "00"; }

    let temp;
    //DRY там з уголка привіт передавав
    if (seconds >= 60) {
        temp = Math.floor(seconds / 60);
        seconds = seconds % 60;
        minutes = +minutes + temp;
    }
    if (minutes >= 60) {
        temp = Math.floor(minutes / 60);
        minutes = minutes % 60;
        hours = +hours + temp;
    }

    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;

    return `${hours}:${minutes}:${seconds}`;
}

exercise_7.btn.addEventListener("click", e=>{
    e.preventDefault();

    const hours = parseInt(exercise_7.input[0].value);
    const minutes = parseInt(exercise_7.input[1].value);
    const seconds = parseInt(exercise_7.input[2].value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        exercise_7.print("Введіть числа!");
        return;
    }

    exercise_7.print(timeString(hours, minutes, seconds));
});


//=========================Exercise 8=================
const exercise_8 = new SimpleSection("exercise8");
function secondsFromString(hours, minutes, seconds) {
    //Да-да-да, я лінива жопа
    [hours, minutes, seconds] = timeString(hours, minutes, seconds).split(":");

    //Індійський код в усій його красі
    let result = 0;
    result = +hours * 60;
    result += +minutes;
    result *= 60;
    result += +seconds;

    return result;
}

exercise_8.btn.addEventListener("click", e=>{
    e.preventDefault();

    const hours = parseInt(exercise_8.input[0].value);
    const minutes = parseInt(exercise_8.input[1].value);
    const seconds = parseInt(exercise_8.input[2].value);

    if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        exercise_8.print("Введіть числа!");
        return;
    }

    exercise_8.print(`У часі ${timeString(hours, minutes,seconds)} ${secondsFromString(hours, minutes, seconds)} секунд`)
})


//========================Exercise 9========================
const exercise_9 = new SimpleSection("exercise9");

function secondsToTime (seconds) {
    let strSeconds = seconds % 60;
    let strMinutes = ((seconds - strSeconds) / 60);
    let strHours = Math.floor(strMinutes / 60);
    strMinutes = strMinutes % 60;

    return timeString(strHours, strMinutes, strSeconds);
}

exercise_9.btn.addEventListener("click", e=>{
    e.preventDefault();

    const seconds = parseInt(exercise_9.input[0].value);

    if (isNaN(seconds)) {
        exercise_9.print("Введіть число!");
        return;
    }

    exercise_9.print(`${seconds} секунд це ${secondsToTime(seconds)}`);
});


//====================Exercise 10====================================

const exercise_10 = new SimpleSection("exercise10");

function timeDiff(hours1, minutes1, seconds1, hours2, minutes2, seconds2) {
    let totalSeconds1 = secondsFromString(hours1, minutes1, seconds1);
    let totalSeconds2 = secondsFromString(hours2, minutes2, seconds2);

    let timeDifference = Math.abs(totalSeconds1 - totalSeconds2);

    return secondsToTime(timeDifference);
}

exercise_10.btn.addEventListener('click', e=>{
    e.preventDefault();

    const hours1 = parseInt(exercise_10.input[0].value);
    const minutes1 = parseInt(exercise_10.input[1].value);
    const seconds1 = parseInt(exercise_10.input[2].value);

    if (isNaN(hours1) || isNaN(minutes1) || isNaN(seconds1)) {
        exercise_10.print("В першому часі є помилкові дані, будь-ласка перевірте введені данні!");
        return;
    }

    const hours2 = parseInt(exercise_10.input[3].value);
    const minutes2 = parseInt(exercise_10.input[4].value);
    const seconds2 = parseInt(exercise_10.input[5].value);

    if (isNaN(hours2) || isNaN(minutes2) || isNaN(seconds2)) {
        exercise_10.print("В другому часі є помилкові дані, будь-ласка перевірте введені данні!");
        return;
    }

    const insertedTime1 = timeString(hours1, minutes1, seconds1);
    const insertedTime2 = timeString(hours2, minutes2, seconds2);
    const insertedSeconds1 = secondsFromString(hours1, minutes1, seconds1);
    const insertedSeconds2 = secondsFromString(hours2, minutes2, seconds2);
    const timeDifference = timeDiff(hours1, minutes1, seconds1, hours2, minutes2, seconds2);

    exercise_10.print(`Перший введений час: ${insertedTime1}, і в секуднах ${insertedSeconds1}<br>
                        Другий введений час: ${insertedTime2}, і в секуднах ${insertedSeconds2}<br>
                        Різниця в часі в секундах ${Math.abs(insertedSeconds1 - insertedSeconds2)} і в звіичному форматі: ${timeDifference}`);


});