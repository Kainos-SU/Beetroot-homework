class Card {
    constructor (json) {
        this.main = $(`<div class="card" data-id="${json.imdbID}"></div>`);
        this.main.css({
            maxWidth: "300px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingBottom: "5px",
            border: "1px solid #000",
            margin: "0 auto"
        });
        this.poster = $(`<div class="card__poster"></div>`);
        this.poster.css ({
            width: "100%",
            position: "relative",
            overflow: "hidden",
            marginBottom: "5px"
        });
        this.img = $(`<img class="card__img" src="${json.Poster}" alt="Movie poster">`);
        this.img.css({
            width: "100%",
        });
        this.star = $('<svg class="favorite" viewBox="0 -10 511.98685 511" xmlns="http://www.w3.org/2000/svg"><use href="./svg/star.svg#golden_star"></use></svg>')
        this.star.css ({
            position: "absolute",
            top: "5%",
            right: "5%",
            width: "40px",
            height: "40px",
            fillOpacity: "0.3",
            fill:"#F8D64E",
            stroke: "black",
            strokeWidth: "3",
            transition: "fill-opacity 0.15s"
        });
        this.poster.on("click", ".favorite", (e)=>{
            const value = $(e.target).parents(".favorite").css("fillOpacity");
            $(e.target).parents(".favorite").css("fillOpacity", value==="0.3"?"1":"0.3");
        });
        this.poster.append(this.img, this.star);
        this.description = $(`<div class="card__description"></div>`);
        this.description.css ({
            width: "100%",
            textAlign: "center"
        });
        this.title = $(`<h2 class="card__title" title="${json.Title}">${json.Title}</h2>`);
        this.title.css ({
            fontSize: "2rem",
            fontWeight: "800",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            marginBottom: "5px"
        });
        this.year = $(`<p class="card__year">${json.Year}</p>`);
        this.year.css({
            fontSize: "1.35rem",
            marginBottom: "5px"
        });
        this.type = $(`<p class="card__type">${json.Type}</p>`);
        this.type.css ({
            textTransform: "capitalize",
            fontSize: '1.25rem',
            marginBottom: '10px'
        });
        this.description.append(this.title, this.year, this.type);
        this.button = $(`<button class="card__button btn">Детальніше</button>`);
        this.main.append(this.poster, this.description, this.button);
    }

    append(el) {
        $(el).append(this.main);
    }
}

class ListItem extends Card {
    constructor (el) {
        super(el);
        this.listItem = $(`<li class="film-container__item"></li>`);
        this.listItem.append(this.main);
    }

    append(el) {
        $(el).append(this.listItem)
    }

}

class Movie extends ListItem {
    constructor (el, list) {
        super(el);
        if (list !== null && list.includes(el.imdbID + "")) {
            this.star.css("fillOpacity", "1");
            this.main.data("isFavorite", "true");
        } else {
            this.main.data("isFavorite", "false");
        }
    }
}

const el = {
    "Title": "Batman Begins",
    "Year": "2005",
    "imdbID": "tt0372784",
    "Type": "movie",
    "Poster": "https://m.media-amazon.com/images/M/MV5BOTY4YjI2N2MtYmFlMC00ZjcyLTg3YjEtMDQyM2ZjYzQ5YWFkXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg"
}