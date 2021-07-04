$("html").on("click", function (e) {
    if (!($(e.target).hasClass("select"))) {
        $(".select__list").slideUp(250);
        $(".select").removeClass("select--clicked");
    }
});

$("body").on("click", ".select", function (e) {
    if ($(e.target).hasClass("select__items")) {
        return;
    }
    $(e.target).toggleClass("select--clicked");
    const list = $(e.target).children(".select__list");
    if (list.css("display") === "none") {
        list.slideDown(250);
    } else {
        list.slideUp(250);
    }
});


$("body").on("click", ".select__items", function (e) {
    const text = e.target.textContent;
    const parentSelect = $(e.target).parents(".select");
    parentSelect.children("#select").text(text);
    parentSelect.children("input[type=hidden]").attr("value", text.toLowerCase().replace(" ", "_"));


});


$(".select__list .select__items:first-child").click();