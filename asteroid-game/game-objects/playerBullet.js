class PlayerBullet extends GameObject {
  constructor() {
    super();
    // Add  object to specific layer (for render) and setup renderer
    GameObject.botLayer.push(this);
    this.renderer = new SingleImageRenderer(
      PLAYER_BULLET_SIZE,
      PLAYER_BULLET_SIZE,
      PLAYER_BULLET_COLOR,
    );
    // Setup box colider (for physics handle)
    this.boxColider = new BoxColider(this, PLAYER_BULLET_SIZE, PLAYER_BULLET_SIZE);
  }
  run() {
    super.run();
    this.limitPosition();
    this.hit();
  }
  limitPosition() {
    const anchorToLeftRight = PLAYER_WIDTH * this.anchor.x;
    const anchorToBotTop = PLAYER_HEIGHT * this.anchor.y;
    if (
      this.position.x > CANVAS_WIDTH + anchorToLeftRight ||
      this.position.x < -anchorToLeftRight ||
      this.position.y < -anchorToBotTop ||
      this.position.y > CANVAS_HEIGHT + anchorToBotTop
    ) {
      this.deactivate();
    }
  }
  hit() {
      const hittedEnemies = GameObject.findIntersected('Enemy', this);
      if(hittedEnemies.length > 0) {
        this.deactivate();
        GameObject.deactiveSelected(hittedEnemies);
      }
  }
}
