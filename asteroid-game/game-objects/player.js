class Player extends GameObject {
  constructor() {
    super();
    // Add  object to specific layer (for render) and setup renderer
    GameObject.midLayer.push(this);
    this.renderer = new SingleImageRenderer(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR);

    // Setup box colider (for physics handle)
    this.boxColider = new BoxColider(this, PLAYER_WIDTH, PLAYER_HEIGHT);

    // Setup moving props
    this.position = new Vector2D(200, 200);
    this.velocity = new Vector2D(0, 0);

    // Setup counters
    this.velocityCounter = new FrameCounter(100);
  }
  run() {
    super.run();
    this.move();
    this.limitPosition();
  }
  limitPosition() {
    const anchorToLeftRight = PLAYER_WIDTH * this.anchor.x;
    const anchorToBotTop = PLAYER_HEIGHT * this.anchor.y;
    if (this.position.x > CANVAS_WIDTH + anchorToLeftRight)
      this.position.x = -anchorToLeftRight;
    if (this.position.x < -anchorToLeftRight)
      this.position.x = CANVAS_WIDTH + anchorToLeftRight;
    if (this.position.y < -anchorToBotTop)
      this.position.y = CANVAS_HEIGHT + anchorToBotTop;
    if (this.position.y > CANVAS_HEIGHT + anchorToBotTop)
      this.position.y = -anchorToBotTop;
  }
  move() {
    if (keysPressing.includes("w")) this.velocity.y = -PLAYER_INIT_MOVING_SPEED;
    else if (keysPressing.includes("s"))
      this.velocity.y = PLAYER_INIT_MOVING_SPEED;
    else this.velocity.y = 0;
    if (keysPressing.includes("a")) this.velocity.x = -PLAYER_INIT_MOVING_SPEED;
    else if (keysPressing.includes("d"))
      this.velocity.x = PLAYER_INIT_MOVING_SPEED;
    else this.velocity.x = 0;
    if (this.velocity.x !== 0 && this.velocity.y !== 0)
      this.velocity = this.velocity.setLength(PLAYER_INIT_MOVING_SPEED);
    this.velocityCounter.reset();
  }
}
