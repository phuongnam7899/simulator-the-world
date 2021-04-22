class EnemySummoner extends GameObject {
    constructor() {
        super();
        // Add  object to specific layer (for render) and setup renderer
        GameObject.midLayer.push(this);
        this.renderer = new SingleImageRenderer(
          0,
          0,
          PLAYER_BULLET_COLOR,
        );
        this.position = new Vector2D(30, 30);
        this.summonCounter = new FrameCounter(60);
      }
      run() {
        super.run();
        this.blink();
        this.summonEnemy();
      }
      blinkLeft() {
        this.position.x = 0;
        this.position.y = randomInRange(0, CANVAS_HEIGHT);
      }
      blinkRight () {
        this.position.x = CANVAS_WIDTH;
        this.position.y = randomInRange(0, CANVAS_HEIGHT);

      }
      blink() {
        const blinkBot = () => {
          this.position.x = randomInRange(0, CANVAS_WIDTH);
          this.position.y = CANVAS_HEIGHT - ENEMY_HEIGHT / 2;
        }
        const blinkTop = () => {
          this.position.x = randomInRange(0, CANVAS_WIDTH);
          this.position.y = ENEMY_HEIGHT / 2;
        }
        const blinkLeft = () => {
          this.position.x =  ENEMY_HEIGHT / 2;
          this.position.y = randomInRange(0, CANVAS_HEIGHT);
        }
        const blinkRight = () => {
          this.position.x = CANVAS_WIDTH - ENEMY_HEIGHT / 2;
          this.position.y = randomInRange(0, CANVAS_HEIGHT);
  
        }
        const blinkDirections = [blinkBot, blinkLeft, blinkTop, blinkRight];
        const randomDirectionIndex = randomInRange(0, blinkDirections.length - 1);
        blinkDirections[randomDirectionIndex]();
      }
      summonEnemy() {
        if (this.summonCounter.run()) {
            this.blink();
            const newEnemy = GameObject.recycle('Enemy');
            newEnemy.position.set(this.position);
            newEnemy.velocity.x = randomInRange(0, 50, 0);
            newEnemy.velocity.y = randomInRange(0, 50, 0);
            newEnemy.velocity.setLength(ENEMY_INIT_MOVING_SPEED);
            this.summonCounter.reset();
        }
      }
}