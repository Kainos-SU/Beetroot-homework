

function ModalWindow (data) {
    this.backPlate = document.createElement("div");
    this.backPlate.style.cssText = 
        "width: 100vw; height: 100vh; background-color: rgba(10, 10, 10, 0.35); transition: opacity 0.25s;\
         position: fixed; top: 0; left: 0; z-index: 1000; opacity: 0; overflow: hidden;";
    this.backPlate.classList.add("modal");
    this.modal = document.createElement("div");
    this.modal.classList.add("modal__window");
    this.modal.style.cssText = 
        "width: 70%; height: 70%; overflow-y: auto; background-color: #fff; position: absolute;\
         top: -100%; left: 50%; transform: translate(-50%, -50%); padding: 45px 0 0; transition: all 0.25s";
    this.cross = document.createElement("span");
    this.cross.classList.add("modal__close");
    this.cross.innerText = "X";
    this.cross.style.cssText = 
        "font-family: sans-serif; font-size: 40px; position: absolute; top: 5px; right: 10px; cursor: pointer;";
    this.cross.addEventListener("click", function (e) {
        e.preventDefault;
        this.close();
    }.bind(this));
    this.container = document.createElement("div");
    this.container.style.cssText = 
        "width: 95%; margin: 0 auto;";
    this.container.classList.add = "modal__container";
    this.backPlate.append(this.modal);
    this.modal.append(this.cross);
    this.modal.append(this.container);

    if (data !== undefined) {
        this.container.append(data);
    }
}

ModalWindow.prototype.inject = function (element) {
    if (element !== undefined) {
        element.append(this.backPlate);
        return element;
    }

    document.body.append(this.backPlate);
    return this.backPlate;
}


ModalWindow.prototype.close = function () {

    const animate = ()=>{
        console.log(this);
        this.backPlate.style.opacity = "0";
        let id;
        if (parseInt(this.modal.style.top) > -100) {
            this.modal.style.top = (parseFloat(this.modal.style.top) - 20) + "%";
            console.log(parseFloat(this.modal.style.top));
            requestAnimationFrame(animate)
            console.log(id);
        }
        if (parseInt(this.modal.style.top) < -100) {
            console.log("Bye " + id);
            this.backPlate.style.display = "none";
        }
    }

    animate();
}

ModalWindow.prototype.show = function (element) {
    element = element || document.body;

    if (!element.contains(this.backPlate)) {
        this.inject(element);
    } else {
        this.backPlate.style.display = "block";
    }

    const id = requestAnimationFrame(()=>{
        this.backPlate.style.opacity = "1";
        this.modal.style.top = "50%";
        cancelAnimationFrame(id);
    });
}

ModalWindow.prototype.remove = function () {
    this.close();
    return this.backPlate.parentNode.removeChild(this.backPlate);
}

ModalWindow.prototype.add = function (element) {
    this.container.append(element);
}

export default ModalWindow;