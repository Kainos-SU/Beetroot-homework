class OMDAPI {
    constructor (key) {
        this.key = key;
        this.url = `https://www.omdbapi.com/?apikey=${this.key}`;
        this.query = null;
        this.pages = 1;
        this.page = 1;
        this.type;
    }

    filmById (id, callback) {
        if (!id) {
            return;
        }
        const apiUrl = this.url + `&i=${id}&plot=full`;
        console.log(apiUrl);
        fetch (apiUrl)
            .then(responce=>responce.json())
            .then(callback)
            .catch(err=>console.warn(err));
    }

    search (query, callback, type, page=this.page) {
        if (query !== this.query) {
            this.query = query;
            this.page = 1;
            page = this.page;
        }
        if (type !== undefined) {
            this.type = type;
        } else {
            this.type = undefined;
        }
        if (page) {
            this.page = page;
        }

        let apiUrl = this.url + `&s="${query}"&page=${page}`;
        if (this.type !== undefined) {
            apiUrl += `&type=${this.type}`;
        }
        fetch(apiUrl)
            .then(responce=>responce.json())
            .then(json=>{
                this.pages = Math.ceil(json.totalResults / 10);
                console.log(json.totalResults, this.pages);
                callback(json.Search);
                this.page++;
            })
            .catch(err=>console.warn(err));
    }

    setFavorite (id) {
        const array = [];
        const value = window.localStorage.getItem("favoriteMovie");
        if (value !== null) {
            array.push(...JSON.parse(value));
        }
        array.push(String(id));
        console.log(array);
        window.localStorage.setItem("favoriteMovie", JSON.stringify(array));
    }

    removeFromFavorite(id) {
        const array = JSON.parse(window.localStorage.getItem("favoriteMovie"));
        array.splice(array.indexOf(id + ""), 1);
        window.localStorage.setItem("favoriteMovie", JSON.stringify(array));
    }

    getFavoriteId() {
        return JSON.parse(window.localStorage.getItem("favoriteMovie"));
    }


    async getFavorite (callback) {
        const array = window.localStorage.getItem("favoriteMovie");
        if (array === null) {
            callback(null);
            return;
        }

        const filmArray = [];
        for (const id of JSON.parse(array)) {
            const movie = await fetch(this.url + `&i=${id}`).then(response=>response.json());
            filmArray.push(movie);
        }
        callback(filmArray);
    }
}

"373a25c9"
