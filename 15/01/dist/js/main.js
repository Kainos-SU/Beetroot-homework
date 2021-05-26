function BurgerMenu (id) {
    this.menu = document.getElementById(id);
    this.burger = this.menu.getElementsByClassName("burger")[0];
    this.anchorList = this.menu.getElementsByClassName("anchors-nav__list")[0];
    this.anchorList.style.paddingTop = this.burger.offsetParent.offsetHeight + "px";
}

BurgerMenu.prototype.open_menu = function () {
    this.anchorList.classList.add("anchors-nav__list--click");
}

BurgerMenu.prototype.close_menu = function () {
    this.anchorList.classList.remove("anchors-nav__list--click");
}

const menu = new BurgerMenu("header_nav");

menu.burger.addEventListener("click", e => {
    menu.burger.classList.toggle("burger--click");
    if (menu.burger.classList.contains("burger--click")) {
        menu.open_menu();
    } else {
        menu.close_menu();
    }
});