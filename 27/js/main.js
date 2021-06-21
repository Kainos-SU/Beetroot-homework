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

//=================Vadim's Exercise=========================
const vadimsExercise = new SimpleSection("exercise0");
vadimsExercise.btn = Array.from(vadimsExercise.section.querySelectorAll(".btn"));

//==============CartItem=================================================
function CartItem (name, price, count) {
    this.name = name;
    price = parseFloat(price);
    if (isNaN(price)){
        throw TypeError("Price need to be a number!");
    }

    if (isNaN(count) && (count !== undefined)) {
        throw TypeError("Count need to be a number!");
    }

    this.price = price;
    this.count = 1;
    if (count !== undefined) {
        this.count = count;
    }
    this.totalPrice = this.price * this.count;
}

CartItem.prototype.add = function (count) {
    if (count === undefined) {
        this.count++;
    } else {
        this.count += count;
    }

    this.totalPrice = this.price * this.count;

    return this;
}

CartItem.prototype.updatePrice = function (number) {
    if (number === undefined || isNaN(parseFloat(number))) {
        throw "Inbalid value of number!";
    }
    this.price = number;
    this.totalPrice = this.price * this.count;

    return this;
}

CartItem.prototype.removeItem = function (number) {
    if (isNaN(parseInt(number)) && number !== undefined) {
        throw TypeError("Ivalid value");
    }
    if (number === undefined) {
        this.count--;
    } else {
        this.count -= Math.abs(number);
    }
    if (this.count <= 0) {
        this.count = 0
    }

    this.totalPrice = this.price * this.count;

    return this.count;
}

CartItem.prototype.equal = function (item) {
    const lowerName = this.name.toLowerCase();
    if (lowerName !== item.name.toLowerCase()) {
        return -1;
    }
    if (this.price !== item.price) {
        return 1;
    }
    return 0;
}


//=========================Cart======================================

function Cart (...elements) {
    this.cart = [];
    if (elements !== undefined) {
        for (let element of elements){
            this.addElement(element);
        }
    }
}

Cart.prototype.addElement = function (element) {
    const index = this.cart.findIndex(e => e.equal(element) >= 0);
    if (index === -1) {
        this.cart.push(element);
        return element;
    }
    if (this.cart[index].equal(element) === 1) {
        this.cart[index].price = element.price;
    }
    this.cart[index].count += element.count;
    this.cart[index].totalPrice = this.cart[index].price * this.cart[index].count;
    return this.cart[index];
}

Cart.prototype.createAndAdd = function (name, price, count) {
    const element = new CartItem(name, price, count);

    return this.addElement(element);
}

Cart.prototype.remove = function (name, count) {
    const index = this.cart.findIndex(e => e.name.toLowerCase() === name.toLowerCase());

    if (index === -1) {
        return null;
    }

    if (count === undefined) {
        return this.cart.splice(index, 1)[0];
    }

    count = parseInt(count);
    if (isNaN(count)) {
        throw TypeError("Count value is invalid!");
    }

    this.cart[index].removeItem(parseInt(count));

    if (this.cart[index].count === 0) {
        return this.cart.splice(index, 1);
    }

    return this.cart[index];
}

Cart.prototype.countStatistic = function() {
    const unicItems = this.cart.length;
    if (unicItems === 0) {
        return null;
    }

    const totalItems = this.cart.reduce((acc=0, item)=> acc + item.count, 0);
    console.log(totalItems);
    const totalCost = this.cart.reduce((acc, item) => acc + item.totalPrice, 0);

    const result =  {
        unicItems,
        totalItems,
        totalCost,
        itemsList: []
    };

    for (let i of this.cart) {
        const item = {
            name: i.name,
            cost: i.price,
            count: i.count
        };
        result.itemsList.push(item);
    }

    return result;
}


//============Вирішення задачі========================================
 
const cart = new Cart();

vadimsExercise.btn[0].addEventListener('click', e=>{
    e.preventDefault();

    const name = vadimsExercise.input[0].value;
    const price = parseFloat(vadimsExercise.input[1].value);

    if (isNaN(price)) {
        vadimsExercise.print("Значення ціни повинно бути числом.");
        return;
    }



    let added = cart.createAndAdd(name, price);
    vadimsExercise.print(`Додано ${added.name} вартістю ${added.price}$<br>Кількість ${added.count}`);
});

vadimsExercise.btn[1].addEventListener("click", e => {
    e.preventDefault();

    const input = vadimsExercise.input[2].value;

    if (input === "") {
        vadimsExercise.print("Введіть назву елемента для видалення!");
        return;
    }
    const deletedItem = cart.remove(input);
    if (deletedItem !== null) {
        vadimsExercise.print(`${deletedItem.name} видалено.`);
    } else {
        vadimsExercise.print(`${input[0].toUpperCase() + input.slice(1)} відсутній в корзині`);
    }
});

vadimsExercise.btn[2].addEventListener("click", e=>{
    e.preventDefault();

    const statistic = cart.countStatistic();
    if (statistic === null) {
        vadimsExercise.print("Корзина порожня");
        return;
    }

    vadimsExercise.print(`Кількість унікальних елементів - ${statistic.unicItems}<br>
                          Загальна кількість елементів - ${statistic.totalItems}<br>
                          Загальна вартість елементів - ${statistic.totalCost}`);

    const table = document.createElement("table");
    const thead = document.createElement("thead");
    table.append(thead);
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    td.innerText = "Список продуктів"
    tr.append(td);
    thead.append(tr);
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerText = "Назва"
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "Ціна"
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "Кількість"
    tr.append(td);
    thead.append(tr);

    const tbody = document.createElement("tbody");
    table.append(tbody);

    for (let i of statistic.itemsList) {
        tr = document.createElement("tr");
        tr.innerHTML = `<td>${i.name}</td><td>${i.cost}</td><td>${i.count}</td>`;
        tbody.append(tr);
    }

    vadimsExercise.output.append(table);
});

//===============Exercise 1=============================
const exercise1 = new SimpleSection("exercise1");
exercise1.btn = Array.from(exercise1.section.querySelectorAll(".btn"));

function Product (name, count=1) {
    this.name = name;
    this.count = count;
    this.check = false;
}

const cart1 = [];

cart1.push(new Product("Coffe", 2));
cart1.push(new Product("Milk", 1));
cart1.push(new Product("Juice", 3));

function addItem (name, arr) {
    const index = arr.findIndex(i=>i.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        arr.push(new Product(name));
        return;
    }

    arr[index].count++;
    return arr[index];
}

function formList (arr) {
    arr.sort((i,j)=>{
        if(i.check) {
            return -1;
        }
        if (j.check) {
            return 1;
        }

        if (i.check === j.check) {
            if (i.name > j.name) {
                return 1
            }
            if (i.name < j.name) {
                return -1;
            }
            return 0;
        }
    });
    let result = "";
    for (let i of arr) {
        result += `<p><span>${i.name}</span><span>${i.count}</span><span>${i.check ? "✓" : "x"}</span></p>`
    }

    return result;
}

function buy (item, arr) {
    const index = arr.findIndex(i=>i.name.toLowerCase() === item.toLowerCase());
    if (index === -1) {
        return null;
    }

    arr[index].check = true;
    return index;
}


exercise1.btn[0].addEventListener("click", e=>{
    e.preventDefault();

    const input = exercise1.input[0].value;
    if (input === "") {
        exercise1.print("Введіть назву продукта!");
        return;
    }

    addItem(input, cart1);

    exercise1.print(formList(cart1));
});

exercise1.btn[1].addEventListener("click", e=>{
    e.preventDefault();

    const input = exercise1.input[1].value;
    if (input === "") {
        exercise1.print("Введіть назву продукта!");
        return;
    }

    buy(input, cart1);

    exercise1.print(formList(cart1));
});

exercise1.btn[2].addEventListener("click", e=>{
    e.preventDefault();

    exercise1.print(formList(cart1));
});


//=================Exercise 2================================
const exercise2 = new SimpleSection("exercise2");
function CheckItem(name, price, count=1) {
    this.name = name;
    this.price = parseFloat(price);
    if (isNaN(this.price)) {
        throw TypeError("Price has invalid value!");
    }
    this.count = parseInt(count);
    if (isNaN(this.count)) {
        throw TypeError("Count has invalid value!");
    }
}

const checkList = [];
checkList.push(new CheckItem("Milk", 5, 5));
checkList.push(new CheckItem("Coffe", 2, 10));
checkList.push(new CheckItem("Meat", 5));
checkList.push(new CheckItem("Potato", 20, 5));

function checkSum (arr) {
    let result = 0;
    for (let i of arr) {
        result += i.price * i.count;
    }

    return result;
}

function checkAvarege (arr) {
    let sum = 0;
    let counter = 0;
    for (let i of arr) {
        sum += i.price * i.count;
        counter += i.count;
    }

    return sum / counter;
}

function formCheckList (arr) {
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);
    let tr = document.createElement("tr");
    let td = document.createElement("td");
    for (let i of ["Назва", "Кількість", "Вартість", "Сумарна вартість"]) {
        td.innerText = i;
        tr.append(td);
        td = document.createElement("td");
    }
    thead.append(tr);
    tr = document.createElement("tr");
    td = document.createElement("td");

    for (let i of arr) {
        for (let j of ["name", "price", "count"]) {
            td.innerText = i[j];
            tr.append(td);
            td = document.createElement("td");
        }
        td.innerText = `${i.price * i.count}`;
        tr.append(td);
        tbody.append(tr);
        td = document.createElement("td");
        tr = document.createElement("tr");
    }


    td.innerText = "Сумарна вартість товарів";
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "" + checkSum(arr);
    tr.append(td);
    tbody.append(tr);
    tr = document.createElement("tr");
    td = document.createElement("td");
    td.innerText = "Середня вартість товару";
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "" + checkAvarege(arr);
    tr.append(td);
    tbody.append(tr);

    return table;
}

function findMostExpencive (arr) {
    const result = arr[0];
    for (let i = 1; arr.length < i; i++) {
        if (result.price * result.count > arr[i].price * arr[i].count) {
            result = arr[i];
        }
    }

    return result;
}

exercise2.btn.addEventListener("click", e=>{
    e.preventDefault();

    exercise2.output.append(formCheckList(checkList));
    const expencive = findMostExpencive(checkList);
    exercise2.print(
        `<p>Найдорожча покупка
            <span>${expencive.name}</span>
            <span>${expencive.count}</span>
            <span>${expencive.price}$</span>
            <span>${expencive.price * expencive.count}$</span>
        </p>`,
        false
    );
});


//==================Exercise 3==================
const exercise_3 = new SimpleSection("exercise3");
exercise_3.btn1 = exercise_3.section.querySelectorAll(".btn")[1];

const styles = [
    {
        name: "text-align",
        value: "center"
    },
    {
        name: "font-size",
        value: "2rem"
    },
    {
        name: "font-family",
        value: "monospace"
    },
    {
        name: "background-color",
        value: "#f00"
    }
];

function styledOutput (style, message) {
    let result = '<p style="';
    for (let i of style) {
        result += `${i.name}:${i.value};`;
    }
    result += '">' + message + "</p>";
    return result;
}

function addStyle (name, value, arr) {
    const index = arr.findIndex(i=>i.name.toLowerCase() === name.toLowerCase());
    if (index === -1) {
        arr.push({name, value});
        return arr[-1];
    }
    arr[index].value = value;
    return arr[index];
}

exercise_3.btn.addEventListener("click", e=>{
    e.preventDefault();

    const input = exercise_3.input[0].value;
    const result = styledOutput(styles, input);
    exercise_3.print(result);
});

exercise_3.btn1.addEventListener ("click", e=>{
    e.preventDefault();

    const styleName = exercise_3.input[1].value;
    const styleValue = exercise_3.input[2].value;

    addStyle(styleName, styleValue, styles);
});

//=================Exercise 4=============================
let section = document.getElementById("exercise4");

const exercise_4 = {
    section: section,
    inputsSelect: Array.from(section.querySelectorAll("select.form__select")),
    btn: Array.from(section.querySelectorAll(".btn")),
    output: section.querySelector(".exercise__output-field"),
};

//=================Constructors=============================
function Audience (name, space, faculty) {
    this.name = name;
    space = parseInt(space);
    if (isNaN(space)) {
        throw TypeError("Space has incorect value!");
    }
    this.space = space;
    this.faculty = faculty;
}

function StudentGroops (name, studentCount, faculty) {
    studentCount = parseInt(studentCount);
    if (isNaN(studentCount)) {
        throw TypeError("studentCount has invalid value!");
    }
    this.studentCount = studentCount;
    this.name = name;
    this.faculty = faculty;
}

//================Arrays====================================
const groopName = [
    "Embeded Development",
    "FrontEnd",
    "Електротехнічні системи автоматизації",
    "Агрокультури"
];

const facultyName = [
    "Прогамування",
    "Сільське господарство",
    "Електротехніка"
];

let option = document.createElement("option");
for (let i of facultyName) {
    option.innerText = i;
    option.setAttribute("value", i);
    exercise_4.inputsSelect[0].append(option);
    option = document.createElement("option");
}

const audienceName = [
    "Філософські питання електроніки",
    "Цікавинки в полі",
    "Аудиторія вивчення способів відстрілу кінцівок",
    "Веб технології",
    "Е-е-ем, та клас по БЕМ-у легше придумати ніж цю фігню"
];

function getRandomNumber(min, max) {
    if (min > max) {
        [min, max] = [max, min];
    }
    return Math.floor(Math.random() * (max - min) + min);
}

const audienceList = [
    new Audience(audienceName[1], getRandomNumber(10, 20), facultyName[1]),
    new Audience(audienceName[0], getRandomNumber(10, 20), facultyName[2]),
    new Audience(audienceName[4], getRandomNumber(10, 20), facultyName[1]),
    new Audience(audienceName[2], getRandomNumber(10, 20), facultyName[0]),
    new Audience(audienceName[3], getRandomNumber(10, 20), facultyName[0])
    
];

const groopList = [
    new StudentGroops(groopName[1], getRandomNumber(10, 20), facultyName[0]),
    new StudentGroops(groopName[2], getRandomNumber(10, 20), facultyName[2]),
    new StudentGroops(groopName[3], getRandomNumber(10, 20), facultyName[1]),
    new StudentGroops(groopName[0], getRandomNumber(10, 20), facultyName[0]),
];

for (let i of groopList) {
    option.innerText = i.name;
    option.setAttribute("value", i.name);
    exercise_4.inputsSelect[1].append(option);
    option = document.createElement("option");
}

//==============Implementation===============================================

const parsedAudience = {
    list: [],
    faculty: "none",
    groop: undefined,
    sortByName: true,
    sortGrow: true,
};

function printAudience (arr) {
    exercise_4.output.innerHTML = "";
    const table = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");
    table.append(thead);
    table.append(tbody);

    let tr = document.createElement("tr");
    thead.append(tr);
    let td = document.createElement("td");
    td.innerText = "Назва аудиторії";
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "Факультет аудиторії";
    tr.append(td);
    td = document.createElement("td");
    td.innerText = "Кількість місць";
    tr.append(td);
    tr = document.createElement("tr");
    td = document.createElement("td");


    for (let i of arr) {
        td.innerText = i.name;
        tr.append(td);
        td = document.createElement("td");
        td.innerText = i.faculty;
        tr.append(td);
        td = document.createElement("td");
        td.innerText = i.space;
        tr.append(td);
        tbody.append(tr);
        td = document.createElement("td");
        tr = document.createElement("tr");
    }
    
    return table;
}

function facultyFilter (arr, faculty) {
    if (faculty !== "none") {
        const newArr = arr.filter(aud=>aud.faculty.toLowerCase() === faculty.toLowerCase());
        return newArr;
    }
    return arr;
}

function groopFilter (arr, groopObj) {
    if (groopObj === undefined) {
        return arr;
    }

    const newArr = arr.filter(aud=>aud.faculty === groopObj.faculty && aud.space >= groopObj.studentCount);
    return newArr;
}

function sortByKey (array, grow, key) {
    if (grow) {
        array.sort((a,b)=>{
            if (a[key] > b[key]) {
                return 1;
            }
            if (a[key] < b[key]) {
                return -1;
            }
            return 0;
        });
    } else {
        array.sort((a,b)=>{
            if (a[key] > b[key]) {
                return -1;
            }
            if (a[key] < b[key]) {
                return 1;
            }
            return 0;
        });
    }
}

function parseAndPrint(parseObj) {
    parseObj.list = [...audienceList];
    if (parseObj.faculty !== "none") {
        parseObj.list = facultyFilter(parseObj.list, parseObj.faculty);
    }
    if (parseObj.groop !== undefined) {
        parseObj.list = groopFilter(parseObj.list, parseObj.groop);
    }
    if (parseObj.sortByName) {
        sortByKey(parseObj.list, parseObj.sortGrow, "name");
    }else {
        sortByKey(parseObj.list, parseObj.sortGrow, "space");
    }

    return printAudience(parseObj.list);
}

//========EventListeners==========================================
exercise_4.inputsSelect.forEach(e=>{
    e.addEventListener("change", e=>{
        if (e.target.getAttribute("name") === "audience") {
            parsedAudience.faculty = e.target.value;
        }
        if (e.target.getAttribute("name") === "groops") {
            
            parsedAudience.groop = groopList.find(element=>element.name === e.target.value);
        }

        exercise_4.output.append(parseAndPrint(parsedAudience));
    });
})