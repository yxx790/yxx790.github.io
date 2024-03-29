"use strict";
const tg = window?.Telegram?.WebApp;
tg?.expand();
if (tg?.initDataUnsafe?.user?.id) {
    document.querySelector("header").remove();
    // const br = document.createElement("br");
    // document.querySelector("#BJ").prepend(br);
    document.querySelector("h3").style.fontSize = "3dvh";
    document.querySelector("h3").style.marginTop ="2dvh";
}
if (tg?.initDataUnsafe?.user?.username) {
    document.querySelector("#yourName").textContent =
        tg.initDataUnsafe.user.username;
}

let usedDeck = [],
    yourPack = [],
    catsPack = [],
    yourScore = 0,
    catsScore = 0,
    yourWins = 0,
    catsWins = 0,
    random,
    realValye;
// console.log(typeof usedDeck);
// console.log(navigator.cookieEnabled);
document.getElementById("takecard").style.display = "none";
document.getElementById("pass").style.display = "none";

const cDecoded = decodeURIComponent(document.cookie);
console.log("cookie get \n" + cDecoded);
let cArray = cDecoded.split("; ");
console.log(cArray);

cArray.forEach(element => {
    if (element.indexOf("yourWins=") == 0) {
        yourWins = element.substring("yourWins=".length);
        // yourWins = 0;
    }
    if (element.indexOf("catsWins=") == 0) {
        catsWins = element.substring("catsWins=".length);
        // catsWins = 0;
    }
})
setCookies();


for (var i = 1; i < 53; i++) {
    let preloadcard = document.createElement("img");
    preloadcard.src = `Images/blackjack/${i}.jpg`;
    document.querySelector("#imgpreload").append(preloadcard);
}


document.addEventListener("DOMContentLoaded", () => {
    console.group(`партия`);
    youTakeCard();
    catTakeCard();
    document.getElementById("takecard").style.display = "inline";
    document.getElementById("pass").style.display = "inline";
    document.querySelector('#takecard').addEventListener('click', youTakeCard);
    document.querySelector('#pass').addEventListener('click', pass);
});


function youTakeCard() {
    random = getRandom();
    usedDeck.push(random);
    usedDeck.sort((a, b) => (a - b));
    yourScore += getRealValye(random);
    yourPack.push(realValye);

    console.log("yourPack ", yourPack.toString());
    console.log("yourScore ", yourScore);
    if (yourScore > 21 && yourPack.indexOf(11) != -1) {
        yourPack[yourPack.indexOf(11)] = 1;
        yourScore -= 10;
        console.log("yourPack ", yourPack.toString());
        console.log("yourScore ", yourScore);
    }
    // document.getElementById("yourCards").innerHTML +=
    // `<img class="cat"src="Images/blackjack/${random}.jpg"alt="">`;
    let newcard = document.createElement("img");
    newcard.src = `Images/blackjack/${random}.jpg`;
    document.querySelector("#yourCards").append(newcard);
    //append в коней/ preppend вставляет в начало в родителя
    // before / after чтобы вставить до или после siblings
    //remove()    replacewith(чтото)
    document.getElementById("yourScore").textContent = `${yourScore} (${yourPack})`.replace(/,/g, " ");
    if (yourScore > 21) { catWin(); };
    if (yourScore == 21) pass();
};

function pass() {
    document.getElementById("tablo").innerHTML = "Wait cat";
    document.getElementById("takecard").style.display = "none";
    document.getElementById("pass").style.display = "none";
    if (catsScore <= yourScore && catsScore != 21) {
        setTimeout(() => { catTakeCard(pass); }, 800);
    }
    else if (catsScore > 21) {
        youWin();
    }
    else if (catsScore <= 21 && catsScore > yourScore) {
        catWin();
    }
    else {
        document.getElementById("tablo").innerHTML = "Draw";
        document.getElementById("tablo").style.color = "yellow";
        console.log("DRAW");
        console.groupEnd();
        setTimeout(() => { resetAll(); }, 2000);
    }
}

function catTakeCard(callbackPass) {
    random = getRandom();
    usedDeck.push(random);
    usedDeck.sort((a, b) => (a - b));
    catsScore += getRealValye(random);
    catsPack.push(realValye);

    console.log("catsPack ", catsPack.toString());
    console.log("catsScore ", catsScore);
    if (catsScore > 21 && catsPack.indexOf(11) != -1) {
        catsPack[catsPack.indexOf(11)] = 1;
        catsScore -= 10;
        console.log("catsPack ", catsPack.toString());
        console.log("catsScore ", catsScore);
    }

    document.getElementById("catsCards").innerHTML +=
        `<img class="cat"src="Images/blackjack/${random}.jpg"alt="">`;
    document.getElementById("catsScore").innerHTML = `${catsScore} (${catsPack})`.replace(/,/g, " ");
    if (callbackPass) callbackPass();
};

function resetAll() {
    usedDeck = [];
    yourPack = [];
    catsPack = [];
    yourScore = 0;
    catsScore = 0;
    document.getElementById("tablo").innerHTML = "Your turn";
    document.getElementById("tablo").style.color = "#4ecf84";
    document.getElementById("takecard").style.display = "inline";
    document.getElementById("pass").style.display = "inline";
    document.getElementById("yourCards").innerHTML = ""
    document.getElementById("yourScore").innerHTML = "0"
    document.getElementById("catsCards").innerHTML = ""
    document.getElementById("catsScore").innerHTML = "0"
    console.group(`партия`);
    youTakeCard();
    catTakeCard();
}

function youWin() {
    document.getElementById("tablo").innerHTML = "You WIN!😎";
    yourWins++;
    // document.getElementById("yourWins").innerHTML = yourWins;
    // document.getElementById("yourWins2").innerHTML = yourWins;
    console.log("YOU WIN");
    console.groupEnd();
    setCookies();
    setTimeout(() => { resetAll(); }, 2000);
}

function catWin() {
    document.getElementById("tablo").innerHTML = "You lost";
    document.getElementById("tablo").style.color = "red";
    document.getElementById("takecard").style.display = "none";
    document.getElementById("pass").style.display = "none";
    catsWins++;
    // document.getElementById("catsWins").innerHTML = catsWins;
    // document.getElementById("catsWins2").innerHTML = catsWins;
    console.log("CAT WIN");
    console.groupEnd();
    setCookies();
    setTimeout(() => { resetAll(); }, 2000);
}

function setCookies() {
    document.getElementById("catsWins").innerHTML = catsWins;
    document.getElementById("catsWins2").innerHTML = catsWins;
    document.getElementById("yourWins").innerHTML = yourWins;
    document.getElementById("yourWins2").innerHTML = yourWins;

    const date = new Date();
    const huorsToLive = 168;//168h = week
    date.setTime(date.getTime() + huorsToLive * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `yourWins=${yourWins}; ${expires}`;
    document.cookie = `catsWins=${catsWins}; ${expires}`;
    console.log("cookie set \n" + document.cookie);
}

function getRandom() {
    do {
        random = Math.floor(Math.random() * 52) + 1;
    } while (usedDeck.indexOf(random) != -1)
    return random;
}

function getRealValye(random) {
    switch (true) {
        case random <= 4:
            realValye = 11;
            break;
        case random <= 8:
            realValye = 2;
            break;
        case random <= 12:
            realValye = 3;
            break;
        case random <= 16:
            realValye = 4;
            break;
        case random <= 20:
            realValye = 5;
            break;
        case random <= 24:
            realValye = 6;
            break;
        case random <= 28:
            realValye = 7;
            break;
        case random <= 32:
            realValye = 8;
            break;
        case random <= 36:
            realValye = 9;
            break;
        case random <= 52:
            realValye = 10;
            break;
    }
    return realValye;
}


