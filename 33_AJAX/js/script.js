const modal = new FilmModal();
const omdb = new OMDAPI("373a25c9");
modal.add();

$(".search__button").first().on("click", e=>{
    e.preventDefault();
    const text = $(e.target).siblings(".search__input").first().val();
    let type = $(e.target).siblings(".search__select").children("input").first().val();
    console.log(text, type);

    if (text === "") {
        throw TypeError("Expected text");
    }

    if (type === "any") {
        type = undefined;
    }

    const filmList = $("ul.film-container__list").first().empty();

    omdb.search(text, e=>{
        if (e === undefined) {
            filmList.append("<p>Нічого не знайдено</p>")
        }
        for (const i of e) {
            $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "flex");
            const listItem = new ListItem(i);
            listItem.append(filmList);
            if (omdb.page >= omdb.pages) {
                $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "none");
            }
        }
    }, type);
});


$("ul.film-container__list").on("click", ".btn", function(e){
    const filmId = $(e.target).parents(".card").data("id");
    omdb.filmById(filmId, json=>{
        console.log(json);
        modal.parse(json);
        modal.show();
    });
});


$(".film-container__wrapper").children(".film-container__load-more.btn").first().on("click", e=>{
    e.preventDefault();
    const filmList = $("ul.film-container__list").first();
    omdb.search(omdb.query, json=>{
        for (const i of json) {
            $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "flex");
            const listItem = new ListItem(i);
            listItem.append(filmList);
            if (omdb.page >= omdb.pages) {
                $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "none");
            }
        }
    });
});
