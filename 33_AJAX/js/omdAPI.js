class OMDAPI {
    constructor (key) {
        this.key = key;
        this.url = `http://www.omdbapi.com/?apikey=${this.key}`;
        this.query = null;
        this.pages = 1;
        this.page = 1;
    }

    filmById (id, callback) {
        if (!id) {
            return;
        }
        const apiUrl = this.url + `&i=${id}&plot=full`;
        fetch (apiUrl)
            .then(responce=>responce.json())
            .then(callback)
            .catch(err=>console.warn(err));
    }

    search (query, callback, type, page=this.page) {
        if (query !== this.query) {
            this.query = query;
            this.page = 1;
        }
        let apiUrl = this.url + `&s="${query}"&page=${page}`;
        if (type !== undefined) {
            apiUrl += `&type=${type}`;
        }
        console.log(apiUrl);
        fetch(apiUrl)
            .then(responce=>responce.json())
            .then(json=>{
                if (query !== this.query) {
                    this.pages = Math.ceil(json.totalResults / 10);
                }
                callback(json.Search);
                this.page++;
            })
            .catch(err=>console.warn(err));
    }
}

"373a25c9"