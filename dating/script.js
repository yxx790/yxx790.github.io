'use strict';
const tg = window?.Telegram?.WebApp; //Initializes the TELEGRAM BOT and
//Gets the user's Telegram ID from the Telegram API
// screen.orientation.lock(ORIENTATION);
tg?.expand(); //Expands the app on the users' phone to 100% height

const consol = document.querySelector("#consol");
consol.textContent +="colorScheme = " + tg?.colorScheme + "\r\n";
consol.textContent +="initDataUnsafe.user.id = " + tg?.initDataUnsafe?.user?.id + "\r\n";
consol.textContent +="initData = " + tg?.initData + "\r\n";



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




