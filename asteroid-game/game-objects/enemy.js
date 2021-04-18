class Enemy extends GameObject {
    constructor() {
      super();
      // Add  object to specific layer (for render) and setup renderer
      GameObject.midLayer.push(this);
      this.renderer = new SingleImageRenderer(ENEMY_WIDTH, ENEMY_HEIGHT, ENEMY_COLOR);
  
      // Setup box colider (for physics handle)
      this.boxColider = new BoxColider(this, ENEMY_WIDTH, ENEMY_HEIGHT);
  
      // Setup moving props
      this.position = new Vector2D(50, 50);
      this.velocity = new Vector2D(4, 4);
    }
    run() {
      super.run();
      this.wallBound();
    }
    duplicate() {
        const newEnemy = GameObject.recycle('Enemy');
        newEnemy.velocity.x = 4;
        newEnemy.velocity.y = 4;
        // newEnemy.velocity.setLength(ENEMY_INIT_MOVING_SPEED);
        console.log(GameObject.gameObjects);
    }
    wallBound() {
      const anchorToLeftRight = ENEMY_WIDTH * this.anchor.x;
      const anchorToBotTop = ENEMY_HEIGHT * this.anchor.y;
      if (this.position.x > CANVAS_WIDTH - anchorToLeftRight) {
          this.velocity = this.velocity.symetryY();
          this.duplicate();
      }
      if (this.position.x < anchorToLeftRight)
        this.velocity = this.velocity.symetryY();
      if (this.position.y < anchorToBotTop)
        this.velocity = this.velocity.symetryX();
      if (this.position.y > CANVAS_HEIGHT - anchorToBotTop)
        this.velocity = this.velocity.symetryX();
    }
  }
