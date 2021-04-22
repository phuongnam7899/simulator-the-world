function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}
const keysPressing = [];
function initGameObjects() {
    GameObject.recycle('Player');
    GameObject.recycle('EnemySummoner');
}
initGameObjects();
function draw() {
  background('#000');
  GameObject.runAll();
  GameObject.renderAll();
}
function keyPressed() {
  if (!keysPressing.includes(key)) keysPressing.push(key);
}
function keyReleased() {
    if (keysPressing.includes(key)) {
        const keyIndex = keysPressing.indexOf(key);
        keysPressing.splice(keyIndex, 1);
    }
}
