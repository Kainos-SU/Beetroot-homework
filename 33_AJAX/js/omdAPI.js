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
}

"373a25c9"
