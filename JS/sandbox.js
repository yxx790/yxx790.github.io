"use strict";

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
weatherRequest();
setInterval(weatherRequest, 60000);
function weatherRequest() {
    const xhr = new XMLHttpRequest();
    // xhttp.open("GET", "https://api.tomorrow.io/v4/timelines?location=60.9386,76.58192&fields=temperature&timesteps=current&units=metric&apikey=2dEuNJ3O2NYIQIWUAxQiCM88xUNQoJ8E", true);
    xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?lat=60.9386&lon=76.58192&units=metric&appid=635e4bb4a2d55584188f0d4900c2bfbb`, true);
    //xhttp.setRequestHeader("","") 
    xhr.onload = function () {
        if (xhr.status == 200) {
            const response = JSON.parse(this.response)
            console.log(response);
            // let tempC = response["data"]["timelines"][0].intervals[0].values.temperature
            // let tempC = response["main"].temp
            document.querySelector("#p5").innerHTML =
                response.name + " " + response.main.temp.toFixed(1) + " C " + "<br>" +
                "humidity: " + response.main.humidity + "<br>" +
                response.weather[0].description + "<br>" +
                response.wind.deg + " deg " + response.wind.speed + " m/c";
        }
    }
    xhr.send();
}
