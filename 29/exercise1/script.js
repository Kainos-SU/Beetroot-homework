// import playlist from "./playlist.js";
fetch("playlist.json")
    .then(response=>response.json())
    .then(json=>insertPlaylist(json))
    .catch(error=>console.warn(error));

function insertPlaylist (json, element) {
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
    
    element = element || document.body;

    const firstElement = element.firstElement;

    if (firstElement === null) {
        element.append(list);
        return;
    }
    element.insertBefore(list, firstElement);

    
}

// export default insertPlaylist;

// insertPlaylist(playlist);