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

function CartItem (name, price) {
    this.name = name;
    price = parseFloat(price);
    if (isNaN(price)){
        throw TypeError("Price need to be a number!");
    }
    this.price = price;
}

function Cart (element) {
    this.cart = [];
    if (element !== undefined) {
        this.addElement(element);
    }
}

Cart.prototype.addElement = function (element) {
    const el = {
        ...element,
        count: 1,
        totalSum: element.price
    };
    const index = this.cart.findIndex(e => e.name === element.name && e.price === element.price);
    if (index === -1) {
        this.cart.push(el);
        return el;
    }
    this.cart[index].count += 1;
    this.cart[index].totalSum += element.price;
    return this.cart[index];
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



    let added = cart.addElement(new CartItem(name, price));
    vadimsExercise.print(`Додано ${added.name} вартістю ${added.price}$`);
});