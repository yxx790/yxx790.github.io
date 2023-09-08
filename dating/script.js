'use strict';
const tg = window?.Telegram?.WebApp;
// screen.orientation.lock(ORIENTATION);
tg?.expand();

const consol = document.querySelector("#consol");
function print(data){consol.innerHTML += data +'<br>'};

//print('colorScheme = ' + tg?.colorScheme)
print('initDataUnsafe.user.id = ' + tg?.initDataUnsafe?.user?.id)
print('initData = ' + tg?.initData)
if (tg?.colorScheme == "dark"){
    document.documentElement.style.setProperty('--background', '#252550');
    document.documentElement.style.setProperty('--text', '#e0e0e0');
    print('Dark theme enabled');
    // document.querySelector(":root");
}

document.querySelector('#profile').addEventListener('click', () => {
    consol.toggleAttribute('hidden')});

const allHeadBtns = document.querySelectorAll('nav > div');
const allPages = document.querySelectorAll('main > div');
allHeadBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        allPages.forEach(page => { page.setAttribute("hidden", true) });
        allPages[index].removeAttribute("hidden");
        allHeadBtns.forEach(b => { b.classList.remove("activeBtn") });
        btn.classList.add("activeBtn");
        // print(`${btn.id} activated`);
    })
})

const video = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video:true}).then(mediaStream=>{
    video.srcObject = mediaStream;
}).catch(err => {print('err: ', err)})

for (let age = 18; age < 100; age++) {
    document.querySelector("#userAge").innerHTML +=
        `<option value="${age}">${age}</option>`
}