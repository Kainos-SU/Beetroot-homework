let circle_wrapper = document.getElementsByClassName("circle-wrapper")[0];
let circle = document.getElementsByClassName("circle")[0];
let [radius, diametr] = circle.children;

class Circle {
    constructor (radius) {
        this.radius = radius;
    }

    set insertRadius (radius) {
        if (Number.isNaN(+radius)) {
            throw ("Error, need to be a number");
        }

        this.radius = Math.abs(+radius);
    }

    get diametr() {
        return this.radius * 2;
    }

    get getRadius () {
        return this.radius;
    }

    get area () {
        return Math.PI * this.radius * this.radius;
    }

    get perimetr () {
        return 2 * this.radius * Math.PI;
    }
}

let myCircle = new Circle(40);

function circle_test () {
    let r = parseInt(document.getElementById("circle_radius").value);
    myCircle.insertRadius = r;

    circle_wrapper.style.width = myCircle.getRadius + "px";
    circle_wrapper.style.height = myCircle.getRadius + "px";
    radius.innerText = "" + myCircle.getRadius;
    diametr.innerText = "" + myCircle.diametr;
    circle_wrapper.children[circle_wrapper.children.length-1].innerHTML = `<p>Diametr = ${myCircle.diametr}</p><p>Perimetr = ${myCircle.perimetr}</p><p>Area = ${myCircle.area}</p>`;

}


let animal = {
    sayHi(){
        console.log("I am animal");
    }
};

let rabbit = {
    __proto__: animal,
    sayHi(){
        super.sayHi();
    }
};

let plant = {
    sayHi(){
        console.log("I am plant");
    }
};

let tree = {
    __proto__: plant,
    sayHi(){
        super.sayHi()
    }
};

tree.sayHi();