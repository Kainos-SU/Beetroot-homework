(function(){
    function getBaseStructure(opt) {
        if (opt===undefined || opt.suit===undefined || opt.value===undefined) {
            throw "Expected parametr object with fields suits and value";
        }
        var flipable = document.createElement("span");
        flipable.className = "playing-card__flipable";
        var wrapper = document.createElement("span");
        wrapper.className = "playing-card__wrapper";
        var suit = document.createElement("span");
        flipable.append(wrapper);
        suit.className = "playing-card__suit";
        var suit_content = document.createElement("span");
        var i;
        if (opt.suit === "spades" || opt.suit === "hearts") {
            suit_content.className = "heart";
            suit.append(suit_content);
        } else if (opt.suit === "clubs") {
            suit_content.className = "circle";
            for (i = 0; i < 3; ++i) {
                suit.appendChild(suit_content.cloneNode());
            }
        }

        var fields = document.createElement("span");
        fields.className = "playing-card__fields";
        fields.innerHTML = '<span class="playing-card__value">' + (opt.value==1?"A":(opt.value+"").toUpperCase()) + '</span>';
        
        fields.appendChild(suit.cloneNode(true));

        wrapper.appendChild(fields.cloneNode(true));
        wrapper.appendChild(fields.cloneNode(true));
        wrapper.insertBefore(fields, wrapper.lastChild);
        fields.innerHTML = "";

        var suitFields = [];
        for (i = 0; i < 3; ++i) {
            suitFields.push(document.createElement("span"));
            suitFields[suitFields.length - 1].className = "playing-card__suit-fields";
            fields.append(suitFields[suitFields.length - 1]);
        }

        if (opt.value <= 3) {
            for (i = 0; i < opt.value; i++){
                suitFields[1].appendChild(suit.cloneNode(true));
            }
        } else if (opt.value > 3 && opt.value < 10) {
            for (i = 0; i < Math.floor(opt.value / 2); ++i){
                suitFields[0].appendChild(suit.cloneNode(true));
                suitFields[2].appendChild(suit.cloneNode(true));
            }
            for (i = 0; i < opt.value % 2; ++i) {
                suitFields[1].appendChild(suit.cloneNode(true));
            }
        } else if (opt.value == 10) {
            for (i = 0; i < 4; ++i){
                suitFields[0].appendChild(suit.cloneNode(true));
                suitFields[2].appendChild(suit.cloneNode(true));
            }
            for (i = 0; i < 2; ++i) {
                suitFields[1].appendChild(suit.cloneNode(true));
            }
        } else {
            suitFields[1].innerHTML = "<span>" + (opt.value+"").toUpperCase() + "</span>";
        }

        return flipable;
    }

    function getCards() {
        var cards = document.getElementsByClassName("playing-card");
        var i;
        for (i = 0; i < cards.length; ++i) {
            if (cards[i].hasAttribute("data-changed")===false || cards[i].getAttribute("data-changed")=="false") {
                var sv = cards[i].className.match(/(?<=--)\w+/gm);
                if (sv.length !== 2) {
                    console.warn("Incorect number of classes" + sv);
                    continue;
                }
                cards[i].innerHTML = "";
                var opt = {};
                var j;
                for (j = 0; j < sv.length; ++j) {
                    if (sv[j].length > 2) {opt.suit = sv[j]}
                    else {opt.value = isNaN(sv[j])?sv[j]:(+sv[j])}
                }
                cards[i].append(getBaseStructure(opt));
                cards[i].setAttribute("data-changed", true);
            }
        }
        requestAnimationFrame(getCards);
    }

    getCards();    
})()
