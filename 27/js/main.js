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
    this.cart[index].totalSum = this.cart[index].price * this.cart[index].count;
    return this.cart[index];
}

Cart.prototype.createAndAdd = function (name, price, count) {
    const element = new CartItem(name, price, count);

    return this.addElement(element);
}

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