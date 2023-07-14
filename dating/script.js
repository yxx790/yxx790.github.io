'use strict';
const tg = window.Telegram.WebApp; //Initializes the TELEGRAM BOT and
// screen.orientation.lock(ORIENTATION);

  //Gets the user's Telegram ID from the Telegram API
tg.expand(); //Expands the app on the users' phone to 100% height




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



document.querySelector("#colorScheme").innerHTML +=
    tg.colorScheme;
document.querySelector("#id").innerHTML +=
    tg.initDataUnsafe.user.id;

// window.Telegram.WebApp.expand();