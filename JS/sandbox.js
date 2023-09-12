"use strict";

let a = 1
console.log(a.__proto__===Number.prototype)
//prototype есть только у f и class
//__proto__ === prototype функции конструктора

function varCreator() {
    let a = 0;
    function innerFunc() {//в лексич окруж фнкц будет
        a++;        //сохранена ссылка на переменную А
        return a    //которая находится внутри функц
    }
    return innerFunc
}
const b = varCreator();//в пер помещ varCreator и запуск, после
const c = varCreator();//в пер присваивается innerFunc
//переменная A будет разная, т.к фнкц b и c это разные функции
console.log("b=" + b()); console.log("c=" + c()); console.log("b=" + b());
console.log("c=" + c()); console.log("c=" + c()); console.log("b=" + b());

const video = document.querySelector('video');
navigator.mediaDevices.getUserMedia({video:true}).then(mediaStream=>{
    video.srcObject = mediaStream;
}).catch(err => {console.log('err: ', err)})


// const okCancel = confirm("OK or Cancel");//результат true or false
// alert(okCancel);
// const name = prompt("Введите ваше имя","Igor");//результат всегда string
// alert("Привет " + name);
// const age = +prompt("Введите возраст","33");//результат number (плюс перед string)
// alert(age);
// alert('!!!!!!!!!!!!!!');
// let nmbr = 10;
// console.log(nmbr++);//выводит 10, потом прибавляет 1
// let nmbr2 = 10;
// console.log(--nmbr2);//вычитает 1, выводит результат
// console.log(10 % 3);//выводит остаток от деления = 1
// console.log(2*4 == 8);//true
// console.log(2*4 == "8");//true
// console.log(2*4 === 8);//true
// console.log(2*4 === "8");//false
// %% И     || ИЛИ      ! ОТРИЦАНИЕ
// (51 == 50) ? console.log(true) : console.log(false);
//сравнение с использ тернарного оператора 
if ("sdf") { console.log(true) };
//true  это любая цифра, не 0 , строка и тд
//false  это пустая строка, 0, null, NaN, undefined
const s = '123, 3213,4234 2343';
console.log(s.replace(/, /,",").replace(/ /,",").split(','))

var myString = 'Привет 1 мир. Предложение номер 2.';
var splits = myString.split(/(\d)/);
console.log(splits);

var names = 'Гарри Трамп ;Фрэд Барни; Хелен Ригби ; Билл Абель ;Крис Ханд ';
console.log(names);
var re = /\s*;\s*/;
var nameList = names.split(re);
console.log(nameList);


getIP()
function getIP() {
    fetch(`https://geo.ipify.org/api/v2/country?apiKey=at_fviqDW3imjlokWPIJjiFkc8Hf1RoP`)
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            document.querySelector("#p0").innerHTML = "ip: " + obj.ip + 
            "<br>" + obj.as.route +
            "<br>" + obj.isp +
            "<br>" + obj.as.domain +
            "<br>" + obj.as.type+
            "<br>" + obj.location.country +" "+ obj.location.region
        })
}

// timeUpdate();
setInterval(timeUpdate, 100);
function timeUpdate() {
    let date = new Date();
    // let ms = date.getMilliseconds();
    document.querySelector("#p1").textContent =
        `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
}

getWindowSize();
window.addEventListener('resize', getWindowSize);
// window.onresize = getWindowSize;
function getWindowSize() {
    document.querySelector("#p2").textContent = `window.innerHeight = ${window.innerHeight}`;
    document.querySelector("#p3").textContent = `window.innerWidth = ${window.innerWidth}`;
    document.querySelector("#p4").textContent = `window.devicePixelRatio = ${window.devicePixelRatio}`;
    console.log('window was resized');
}

//openweathermap.org    635e4bb4a2d55584188f0d4900c2bfbb
//weatherstack.com    c40920722586a582568c86c1e52e1d10
//api.tomorrow.io   2dEuNJ3O2NYIQIWUAxQiCM88xUNQoJ8E
const appid = "635e4bb4a2d55584188f0d4900c2bfbb";
getGeolocation();
setInterval(getGeolocation, 5*60*1000);
function getGeolocation() {
    navigator.geolocation.getCurrentPosition(success, error, { enableHighAccuracy: true })
    function success({ coords }) {
        const { latitude, longitude } = coords
        console.log('latitude', latitude, 'longitude', longitude)
        document.querySelector("#p5").innerHTML =
            'latitude ' + latitude + '<br>' + 'longitude ' + longitude;
        weatherRequest(latitude, longitude)
        weatherForecast(latitude, longitude)
    }
    function error({ message }) {
        console.log(message)
        document.querySelector("#p5").innerHTML = 'No geolocation info';
        document.querySelector("#p6").innerHTML = 'No geolocation info';
    }
}

function weatherRequest(latitude, longitude) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/\
weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`, true);
    xhr.onload = function () {
        if (xhr.status == 200) {
            const response = JSON.parse(this.response)
            console.log(response);
            document.querySelector("#p6").innerHTML =
                response.name + " " + response.main.temp.toFixed(1) + " C " + "<br>" +
                "humidity: " + response.main.humidity + "<br>" +
                response.weather[0].description + "<br>" +
                "wind " + response.wind.deg + " deg " + response.wind.speed + " m/c";
        }
    }
    xhr.send();
}

function weatherForecast(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/\
forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${appid}`)
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            // obj.list.shift();
            document.querySelector("#p7").innerHTML = "3 hours forecast: ";
            obj.list.forEach(element =>
                document.querySelector("#p7").innerHTML +=
                " " + element.main.temp.toFixed(0));
        })
}


