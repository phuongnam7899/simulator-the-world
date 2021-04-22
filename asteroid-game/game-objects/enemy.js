class Enemy extends GameObject {
  constructor() {
    super();
    // Add  object to specific layer (for render) and setup renderer
    GameObject.midLayer.push(this);
    this.renderer = new SingleImageRenderer(
      ENEMY_WIDTH,
      ENEMY_HEIGHT,
      generateRandomHexColor()
    );
    // Setup moving props
    this.position = new Vector2D(50, 50);
    this.velocity = new Vector2D(4, 4);

    // Setup box colider (for physics handle)
    this.boxColider = new BoxColider(this, ENEMY_WIDTH, ENEMY_HEIGHT);

  }
  run() {
    super.run();
    this.wallBound();
    this.hitPlayer();
  }
  wallBound() {
    const anchorToLeftRight = ENEMY_WIDTH * this.anchor.x;
    const anchorToBotTop = ENEMY_HEIGHT * this.anchor.y;
    if (
      this.position.x > CANVAS_WIDTH - anchorToLeftRight ||
      this.position.x < anchorToLeftRight
    ) {
      this.velocity = this.velocity.symetryY();
    }
    if (
      this.position.y < anchorToBotTop ||
      this.position.y > CANVAS_HEIGHT - anchorToBotTop
    ) {
      this.velocity = this.velocity.symetryX();
    }
  }
  hitPlayer() {
    const hittedPlayer = GameObject.findIntersected("Player", this);
    if (hittedPlayer.length > 0) {
      this.deactivate();
      GameObject.deactiveSelected(hittedPlayer);
    }
  }
}
