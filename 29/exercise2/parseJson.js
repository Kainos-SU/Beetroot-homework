function parseJson (json) {
    /**
     * Function that takes array of JavaScript objects in form like
     * {
     *  author: string,
     *  song: string
     * }
     * and put them in to DOM as ordered list
     */
    const list = document.createElement("ol");
    let listItem = document.createElement("li");
    let band = document.createElement("p");
    let track = document.createElement("p");
    
    for (const i of json) {
        band.innerHTML = `<span>Band</span>: ${i.author}`;
        track.innerHTML = `<span>Track</span>: ${i.song}`;
        listItem.append(band);
        listItem.append(track);
        list.append(listItem);
        listItem = listItem.cloneNode();
        band = band.cloneNode();
        track = track.cloneNode();
    }
    return list;
}

export default parseJson;