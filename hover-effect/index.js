const containerEl = document.getElementById('container');
const maxX = containerEl.getBoundingClientRect().width / 300;
const maxY = containerEl.getBoundingClientRect().height / 300;
for (let y = 0; y < maxY; y++) {
    for (let x = 0; x < maxX; x++) {
        console.log('x', x);
        console.log('y', y);
        containerEl.innerHTML += `
        <div class='item' id="item-${x}-${y}" style='width:300px; height: 300px'></div>
        `
    }
}
const itemEls = document.getElementsByClassName('item');
