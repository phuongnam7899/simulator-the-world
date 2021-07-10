let isOn = true;
const lightBulbEl = document.getElementById('light-bulb');
const switchEl = document.getElementById('switch');
function render() {
    if (isOn) {
        lightBulbEl.classList.add('on');
        switchEl.innerHTML = `<i class="fas fa-toggle-on"></i>`
    } else {
        lightBulbEl.classList.remove('on');
        switchEl.innerHTML = `<i class="fas fa-toggle-off"></i>`
    }
}
render();
switchEl.addEventListener('click', () => {
    isOn = !isOn;
    render();
})