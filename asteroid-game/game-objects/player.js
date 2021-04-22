class Player extends GameObject {
  constructor() {
    super();
    // Add  object to specific layer (for render) and setup renderer
    GameObject.midLayer.push(this);
    this.renderer = new SingleImageRenderer(PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_COLOR);

    
    // Setup moving props
    this.position = new Vector2D(200, 200);
    this.velocity = new Vector2D(0, 0);
    this.accelerate = new Vector2D(0, 0);
    this.friction = 1;

    // Setup counters
    this.fireCounter = new FrameCounter(5);
    // Setup box colider (for physics handle)
    this.boxColider = new BoxColider(this, PLAYER_WIDTH, PLAYER_HEIGHT);
  }
  run() {
    super.run();
    this.move();
    this.fire();
    this.limitPosition();
    this.limitVelocity();
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
  limitVelocity() {
    if(this.velocity.getLength() > PLAYER_MAX_MOVING_SPEED) this.velocity.setLength(PLAYER_MAX_MOVING_SPEED)
  }
  move() {
    if (keysPressing.includes("w")) this.accelerate.y = -PLAYER_INIT_MOVING_SPEED;
    else if (keysPressing.includes("s"))
      this.accelerate.y = PLAYER_INIT_MOVING_SPEED;
    else this.accelerate.y = 0;
    if (keysPressing.includes("a")) this.accelerate.x = -PLAYER_INIT_MOVING_SPEED;
    else if (keysPressing.includes("d"))
    this.accelerate.x = PLAYER_INIT_MOVING_SPEED;
    else this.accelerate.x = 0;
    if (this.accelerate.x !== 0 && this.accelerate.y !== 0)
    this.accelerate = this.accelerate.setLength(PLAYER_INIT_MOVING_SPEED);
  }
  fire() {
    if (this.fireCounter.run() && keysPressing.includes(' ')) {
      const newBullet = GameObject.recycle('PlayerBullet');
      newBullet.position.set(this.position);
      newBullet.velocity.set(this.velocity);
      newBullet.velocity.setLength(PLAYER_BULLET_SPEED);
      this.fireCounter.reset();
    }
  }
}
