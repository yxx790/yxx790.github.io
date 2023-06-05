"use strict";
let usedDeck=[],
    yourPack=[],
    catsPack=[],
    yourScore=0,
    catsScore=0,
    yourWins=0,
    catsWins=0,
    random,
    realValye;
// console.log(typeof usedDeck);
// console.log(navigator.cookieEnabled);

function getCookies(){
    const cDecoded = decodeURIComponent(Document.cookie);
    console.log(cDecoded);
}
getCookies();

// document.querySelector("#takecard").style.display="none";
// document.querySelector("#pass").style.display="none";

// const preloadIMG = () =>{
    for (var i = 1; i < 53; i++){
        let preloadcard = document.createElement("img");
        preloadcard.src = `Images/blackjack/${i}.jpg`;
        document.querySelector("#imgpreload").append(preloadcard);
    }
        // if (i = 52){
            youTakeCard();
            catTakeCard();
            // document.querySelector("#takecard").style.display="inline";
            // document.querySelector("#pass").style.display="inline";
        // }
// }
// preloadIMG();

function youTakeCard() {
    random = getRandom ();
    usedDeck.push(random);
    usedDeck.sort((a , b) => (a - b));
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

    document.getElementById("yourScore").textContent = `${yourScore} (${yourPack})`;
    
    if(yourScore>21){
        catWin();
        // document.getElementById("tablo").innerHTML = "You lost";
        // document.getElementById("tablo").style.color = "red";
        // document.getElementById("takecard").style.display ="none";
        // document.getElementById("pass").style.display = "none";
        // document.getElementById("catsWins").innerHTML ++;
        // setTimeout(() => {resetAll(); }, 2000);
    }
    if (yourScore == 21) pass();
    // if(yourScore == 21){
    //     pass();
    // }
};

function pass(){
    document.getElementById("tablo").innerHTML = "Wait cat";
    document.getElementById("takecard").style.display ="none";
    document.getElementById("pass").style.display ="none";
    if (catsScore <= yourScore && catsScore != 21){
            setTimeout(() =>
            {
                catTakeCard();
                pass();
            }, 800);
        }
    else if(catsScore>21){
        youWin();
        // document.getElementById("tablo").innerHTML = "You WIN!";
        // document.getElementById("yourWins").innerHTML ++;
        // setTimeout(() => {resetAll(); }, 2000);
        }
    else if(catsScore <=21 && catsScore > yourScore){
        catWin();
        // document.getElementById("tablo").innerHTML = "You lost";
        // document.getElementById("tablo").style.color = "red";
        // document.getElementById("catsWins").innerHTML ++;
        // setTimeout(() => {resetAll(); }, 2000);
        }
    else{
        document.getElementById("tablo").innerHTML = "Draw";
        document.getElementById("tablo").style.color = "yellow";
        setTimeout(() => {resetAll(); }, 2000);
        }
}

function catTakeCard() {
    random = getRandom ();
    usedDeck.push(random);
    usedDeck.sort((a , b) => (a - b));
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
    document.getElementById("catsScore").innerHTML = `${catsScore} (${catsPack})`;
    
};

function resetAll(){
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
    youTakeCard();
    catTakeCard();
}

function youWin(){
    document.getElementById("tablo").innerHTML = "You WIN!";
    yourWins ++;
    document.getElementById("yourWins").innerHTML = yourWins;
    document.getElementById("yourWins2").innerHTML =yourWins;
    setCookies();
    setTimeout(() => {resetAll(); }, 2000);
}

function catWin(){
    document.getElementById("tablo").innerHTML = "You lost";
    document.getElementById("tablo").style.color = "red";
    document.getElementById("takecard").style.display ="none";
    document.getElementById("pass").style.display = "none";
    catsWins ++;
    document.getElementById("catsWins").innerHTML = catsWins;
    document.getElementById("catsWins2").innerHTML = catsWins;
    setCookies();
    setTimeout(() => {resetAll(); }, 2000);
}

function setCookies(){
    const date = new Date();
    const huorsToLive = 1;
    date.setTime(date.getTime() + huorsToLive * 60 * 60 * 1000);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `yourWins=${yourWins}; ${expires}`;
    document.cookie = `catsWins=${catsWins}; ${expires}`;  
    console.log(document.cookie);
}

function getRandom (){
    do{
        random = Math.floor(Math.random() * 52) + 1;
    } while (usedDeck.indexOf(random) != -1)
    return random;
}

function getRealValye (random){
    switch (true) {
        case random <= 4 :
            realValye = 11;
            break;
        case random <= 8 :
            realValye = 2;
            break;
        case random <= 12 :
            realValye = 3;
            break;
        case random <= 16 :
            realValye = 4;
            break;
        case random <= 20 :
            realValye = 5;
            break;
        case random <= 24 :
            realValye = 6;
            break;
        case random <= 28 :
            realValye = 7;
            break;
        case random <= 32 :
            realValye = 8;
            break;
        case random <= 36 :
            realValye = 9;
            break;
        case random <= 52 :
            realValye = 10;
            break;
    }
    return realValye;
}


