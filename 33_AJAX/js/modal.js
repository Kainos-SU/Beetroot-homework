class Modal {
    constructor() {
        this.backPlate = $("<div><div>");
        this.backPlate.css({
            position: "fixed",
            top: "0",
            left: "0",
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: "10000"
        });

        this.window = $("<div></div>");
        this.window.css({
            position: "absolute",
            top: "50%",
            left: "50%",
            maxWidth: "500px",
            width: "90%",
            maxHeight: "400px",
            minHeight: "90vh",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "5px",
            overflowY: "scroll"
        });

        this.backPlate.append(this.window);
    }

    show() {
        $("body").append(this.backPlate);
    }

    hide() {
        this.window.empty();
        this.backPlate.remove();
    }
}

class FilmModal extends Modal {
    parse(json) {
        this.title = $(`<h3>${json.Title}</h3>`);
        this.window.css("text-align", "center");
        this.poster = $(`<div><img src="${json.Poster}"></div>`);
        this.poster.children().css("width", "100%");
        this.year = $(`<p>${json.Year}</p>`);
        this.plot = $(`<p>${json.Plot}</p>`);
        this.plot.css("text-align", "justify");

        this.window.append(this.poster, this.title, this.year, this.plot);
    }
}