"use strict";
//ЗАМЫКАНИЯ  CLOSURES  //смысл в том чтобы
//спрятать переменную A в лексич окружении функции
//и управлять ей через переданную функцию
//после выполн. родительской ф. переменн продолж существовать
function varCreator(){
    let a = 0;
    function innerFunc(){//в лексич окруж фнкц будет
            a++;        //сохранена ссылка на переменную А
            return a    //которая находится внутри функц
        }
    return innerFunc
}
const b = varCreator();//в пер помещ varCreator и запуск, после
const c = varCreator();//в пер присваивается innerFunc
//переменная A будет разная, т.к фнкц b и c это разные функции
console.log("b="+b()); console.log("c="+c()); console.log("b="+b());
console.log("c="+c()); console.log("c="+c()); console.log("b="+b());


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
// console.log(10%3);//выводит остаток от деления
// console.log(2*4 == 8);//true
// console.log(2*4 == "8");//true
// console.log(2*4 === 8);//true
// console.log(2*4 === "8");//false
// %% И     || ИЛИ      ! ОТРИЦАНИЕ
(50 == 59) ? console.log(true) : console.log(false);
//сравнение с использ тернарного оператора 
if ("sdf"){console.log(true)};
//true  это любая цифра, не 0 , строка и тд
//false  это пустая строка, 0, null, NaN, undefined


timeUpdate();
setInterval(timeUpdate, 1000);
function timeUpdate(){
    let date = new Date();
    // let ms = date.getMilliseconds();
    document.querySelector("#p1").textContent = 
        `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`;
}

getWindowSize();
window.addEventListener('resize', getWindowSize);
// window.onresize = getWindowSize;
function getWindowSize(){
    document.querySelector("#p2").textContent = `window.innerHeight = ${window.innerHeight}`;
    document.querySelector("#p3").textContent = `window.innerWidth = ${window.innerWidth}`;
    document.querySelector("#p4").textContent = `window.devicePixelRatio = ${window.devicePixelRatio}`;
    console.log('window was resized');
};

// console.log(navigator);//информация о браузере
document.querySelector("#p5").textContent = `
    ${navigator.appCodeName}
    ${navigator.appName}
    ${navigator.appVersion}
`;

const object1 = {//пример возможносных вариантов описания объекта
    name: 'Igor',
    'surname': "Kryuchkov",
    3: 33,
};
object1.city = 'Nizhnevartovsk';//через точку лучше не использовать
object1['nickname'] = "yxx790";//добавление ключа + значения в существующий объект
document.querySelector("#p6").textContent = `
    ${object1["name"]}
    ${object1.surname}
    ${object1["nickname"]}
    ${object1[3]}y.o.
    ${object1["city"]}
`
let arr = ["массив это частный вид объекта",
    " в котором вместо ключей используется индексы.",
    " И объекты и функции могут содержать в себе любые типы данных в т.ч. функции"
];
document.querySelector("#p7").textContent = arr;
