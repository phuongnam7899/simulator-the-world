const timeValueEl = document.getElementById('time-value');
const cutEl = document.getElementById('cut');
const pauseEl = document.getElementById('pause');
const resetEl = document.getElementById('reset');
const recordsEl = document.getElementById('records');
const pauseIcon = '<i class="fas fa-pause-circle"></i>';
const playIcon = '<i class="fas fa-play"></i>';

let currentSecond = 0;
let isRunning = true;
let records = [];

const twoDigit = (num) => {
    return num < 10 ? `0${num}` : num;
}
const convertSecondToMinuteString = (sec) => {
    const minute = Math.floor(sec / 60);
    const second = sec % 60;
    return `${twoDigit(minute)}:${twoDigit(second)}`
}
const render = () => {
    timeValueEl.innerText = convertSecondToMinuteString(currentSecond)
    pauseEl.innerHTML = isRunning ? pauseIcon : playIcon;
    recordsEl.innerHTML = '';
    records.forEach((record, index) => {
        recordsEl.innerHTML += `
        <div class="record-item">${index + 1}. ${convertSecondToMinuteString(record)}</div>`
    })
}
const togglePause = () => {
    isRunning = !isRunning;
    render()
}

const reset = () => {
    isRunning = false;
    currentSecond = 0;
    records = [];
    render();
}

const record = () => {
    records = [...records, currentSecond];
    render();
}

const timeInterval = setInterval(() => {
    if (isRunning) {
        currentSecond++;
        render();
    }
}, 1000);


pauseEl.addEventListener('click', () => {
    togglePause()
});
resetEl.addEventListener('click', () => {
    reset();
});
cutEl.addEventListener('click', () => {
    record();
})

render();
