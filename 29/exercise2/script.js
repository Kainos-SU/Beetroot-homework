import ModalWindow from "./createModal.js";
import parseJson from "./parseJson.js";

const modal = new ModalWindow();

fetch("playlist.json")
    .then(response=>response.json())
    .then(json=>modal.add(parseJson(json)))
    .catch(error=>console.warn(error));

document.getElementById("showModal").addEventListener("click", e=>{
    e.preventDefault();
    modal.show();
})