const channels = [
  '<iframe src="https://www.youtube.com/embed/UrPRe_PT1uA?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
  '<iframe src="https://www.youtube.com/embed/HZFBWSxJVW8?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
];
const screenEl = document.getElementById('screen-content');
const powerBtnEl = document.getElementById('power-btn');
const prevBtnEl = document.getElementById('prev-btn');
const nextBtnEl = document.getElementById('next-btn');
let currentChannel = 0;
let on = false;
const next = () => {
    if (on) {
        if (currentChannel === channels.length - 1) currentChannel = 0;
        else currentChannel++;
        renderScreen();
    }
}

const prev = () => {
    if (on) {
        if (currentChannel === 0) currentChannel = channels.length - 1;
        else currentChannel--;
        renderScreen();
    }
}

const togglePower = () => {
    on = !on;
    renderScreen();
}

const renderScreen = () => {
    if (!on) screenEl.innerHTML = '';
    else screenEl.innerHTML = channels[currentChannel];
}

powerBtnEl.addEventListener('click', togglePower)
prevBtnEl.addEventListener('click', prev)
nextBtnEl.addEventListener('click', next)
