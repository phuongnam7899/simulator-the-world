const lightContainerEl = document.getElementById('light-container');
const timeContainerEl = document.getElementById('time-container');
let lightData = {
    red: {
        colorCode: '#bd2f2f',
        time: 5000,
        next: 'green'
    },
    yellow: {
        colorCode: '#fabe46',
        time: 2000,
        next: 'red'
    },
    green: {
        colorCode: '#32a852',
        time: 7000,
        next: 'yellow'
    }
};
let activeLight = 'red';

function renderLight() {
    lightContainerEl.innerHTML = '';
    for (light in lightData) {
        const { colorCode } = lightData[light];
        lightContainerEl.innerHTML += `
            <div class='light-item ${activeLight === light ? '' : 'inActive'}' style='background-color: ${colorCode};'>
            </div>
        `
    }
}
function runLight() {
    const currentLight = lightData[activeLight];
    setTimeout(() => {
        activeLight = currentLight.next;
        loop();
        currentTime = lightData[currentLight.next].time;
    }, currentLight.time);
}
function loop() {
    renderLight();
    runLight();
}
loop();
