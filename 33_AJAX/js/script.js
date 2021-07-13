const modal = new FilmModal();
const omdb = new OMDAPI("373a25c9");
modal.add();


$(".search__button").first().on("click", e=>{
    e.preventDefault();
    const text = $(e.target).siblings(".search__input").first().val();
    let type = $(e.target).siblings(".search__select").children("input").first().val();
    console.log(text, type);
    $(".loader").show();

    if (text === "") {
        throw TypeError("Expected text");
    }

    if (type === "any") {
        type = undefined;
    }

    const favorites = omdb.getFavoriteId();
    const filmList = $("ul.film-container__list").first().empty();

    omdb.search(text, e=>{
        $(".loader").hide();
        if (e === undefined) {
            filmList.append("<p>Нічого не знайдено</p>")
        }
        for (const i of e) {
            $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "flex");
            const listItem = new Movie(i, favorites);
            listItem.append(filmList);
            if (omdb.page >= omdb.pages) {
                $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "none");
            }
        }
    }, type, 1);
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
    $(".loader").show();
    const filmList = $("ul.film-container__list").first();
    omdb.search(omdb.query, json=>{
        $(".loader").hide();
        for (const i of json) {
            $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "flex");
            const listItem = new Movie(i, omdb.getFavoriteId());
            listItem.append(filmList);
            if (omdb.page >= omdb.pages) {
                $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "none");
            }
        }
    });
});

$(".film-container__list").on('click', '.card .favorite', e=>{
    const card = $(e.target).parents(".card").first();

    console.log(card.data("isFavorite"));
    if (card.data("isFavorite") === "true") {
        omdb.removeFromFavorite(card.data("id"));
        card.data("isFavorite", "false");
    } else {
        omdb.setFavorite(card.data("id"));
        card.data("isFavorite", "true");
    }
});

(()=>{
    omdb.search("batman", (e)=>{
        const list = $("ul.film-container__list").first().empty();
        for (const i of e) {
            $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "flex");
            const listItem = new Movie(i, omdb.getFavoriteId());
            listItem.append(list);
            if (omdb.page >= omdb.pages) {
                $(".film-container__wrapper").children(".film-container__load-more.btn").css("display", "none");
            }
        }
    });
})();
