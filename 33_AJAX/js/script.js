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
        console.log(e);
        if (e === undefined) {
            filmList.append("<p>Нічого не знайдено</p>")
        }
        for (const i of e) {
            const listItem = new ListItem(i);
            listItem.append(filmList);
        }
    }, type);
});


$("ul.film-container__list").on("click", ".btn", function(e){
    const filmId = $(e.target).parents(".card").data("id");
    omdb.filmById(filmId, json=>{
        modal.parse(json);
        modal.show();
    });
})
