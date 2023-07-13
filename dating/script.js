'use strict';

const allHeadBtns = document.querySelectorAll('nav > div');
const allPages = document.querySelectorAll('main > div');
allHeadBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        allPages.forEach(page => { page.setAttribute("hidden", true) });
        allPages[index].removeAttribute("hidden");
        allHeadBtns.forEach(b => { b.classList.remove("activeBtn") });
        btn.classList.add("activeBtn");
    })
})

for (let age = 18; age < 100; age++) {
    document.querySelector("#userAge").innerHTML +=
        `<option value="${age}">${age}</option>`
}

document.querySelector("#id").innerHTML = WebAppUser.id;