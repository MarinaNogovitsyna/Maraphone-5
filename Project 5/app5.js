const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let score = 0
const colors = ['#d98989', '#89b7d9', '#d2d989',
'#89cad9', '#b6d989']

// Переход на страницу ниже:
startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})


function startGame(){
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0){
        finishGame()
    } else {
        let curent = --time
    if (curent < 10){
        curent = `0${curent}`
    }
    setTime(curent)
    }
    
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}

function finishGame(){
    // Убираем строку с подсчетом времени:
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}


function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
}



function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length)
   return colors[index]
}

