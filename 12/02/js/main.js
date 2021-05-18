const sign_in = document.getElementsByClassName("modal-sign-in__sign-in")[0];
const join_us = document.getElementsByClassName("modal-sign-in__join-us")[0];
const block = {'sign': sign_in, 'join': join_us};
const anchors_list = [...document.getElementsByClassName("modal-sign-in__join-or-sign")[0].children];
const anchors = anchors_list.map(e=>e.children[0]);
const active_anchor = 'modal-sign-in__options--active';
const hide_section = 'modal-sign-in--hidden';


for (let i of anchors) {
    i.addEventListener('click', e => {
        for (let j of anchors_list) {
            j.classList.remove(active_anchor);
        }
        e.target.parentNode.classList.add(active_anchor);
        let custom_id = e.target.getAttribute("custom_id");
        for (let j in block) {
            block[j].classList.add(hide_section);
        }
        block[custom_id].classList.remove(hide_section);
    });
}

document.getElementById('join_us_repeat_password').addEventListener('input', e=>{
    if (e.target.value !== document.getElementById('join_us_password').value) {
        e.target.setCustomValidity("Паролі повинні співпадати!");
    }else {
        e.target.setCustomValidity('');
    }
});