const cursorSelectEl = document.getElementById('cursor-select');
const bodyEl = document.getElementById('container');
const cursorLinks = [
    './images/cursor1.png',
    './images/cursor2.png',
    './images/cursor3.png',
    './images/cursor4.png',
];
for (let link of cursorLinks) {
    cursorSelectEl.innerHTML += `
        <img src="${link}" class='select-item' style="cursor: url(${link}), auto"/>
    `
}
const selectItemEls = document.getElementsByClassName('select-item');
for (let selectItemEl of selectItemEls) {
    console.log(selectItemEl);
    selectItemEl.addEventListener('click', () => {
        bodyEl.style.cursor = selectItemEl.style.cursor;
    });
}
