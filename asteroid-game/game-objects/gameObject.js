const getActiveObject = (gameObjects) => {
  return gameObjects.filter((gameObject) => !!gameObject.isActive);
};
class GameObject {
  // Manage objects
  static gameObjects = [];
  static botLayer = [];
  static midLayer = [];
  static topLayer = [];

  static addNew(newGameObject) {
    GameObject.gameObjects.push(newGameObject);
  }

  // Try to find inactive instance to reactive first, if nothing, create new one (to prevent create redundance instance)
  static recycle(className) {
    const recyclableObject = GameObject.findInactive(className);
    if (!!recyclableObject) {
      recyclableObject.activate();
      return recyclableObject;
    } else {
      return new DynamicClass(className);
    }
  }

  // Find inactive instance of a class
  static findInactive(className) {
    for (let gameObject of GameObject.gameObjects) {
      const gameObjectClassName = gameObject.constructor.name;
      if (gameObjectClassName === className && !gameObject.isActive)
        return gameObject;
    }
    return null;
  }

  // Find all instances of a class
  static findObjectOfClass = (className) => {
    return GameObject.gameObjects.filter((object) => {
      return object.constructor.name === className;
    });
  };

  // Run (Handle all logic of) all game objects
  static runAll() {
    const activeObjects = GameObject.gameObjects.filter(
      (gameObject) => !!gameObject.isActive
    );
    for (let gameObject of activeObjects) {
      gameObject.run();
    }
  }

  // Render (Draw to screen) all game objects
  static renderAll() {
    const objectsNeedToRender = [
      ...getActiveObject(GameObject.botLayer),
      ...getActiveObject(GameObject.midLayer),
      ...getActiveObject(GameObject.topLayer),
    ];
    for (let object of objectsNeedToRender) {
      object.render();
    }
  }

  // deactive selected game object
  static deactiveSelected = (objects) => {
    for (let object of objects) {
      object.deactivate();
    }
  };

  // Find object in a class that intersect with given
  static findIntersected = (className, gameObject) => {
    const intersectedObjects = GameObject.findObjectOfClass(className).filter(
      (object) => {
        return (
          object.isActive &&
          object.boxColider.intersected(gameObject.boxColider)
        );
      }
    );
    return intersectedObjects;
  };

  constructor() {
    this.position = new Vector2D(0, 0);
    this.velocity = new Vector2D(0, 0);
    this.accelerate = new Vector2D(0, 0);
    this.velocityCounter = new FrameCounter(3);
    this.friction = 0;
    this.isActive = true;
    this.anchor = new Vector2D(0.5, 0.5);
    GameObject.addNew(this);
  }

  run() {
    if (this.velocityCounter.run()){
      this.velocity.add(this.accelerate);
      this.velocityCounter.reset();
      this.frictionApply();
    }
    this.position.add(this.velocity);
    if (this.boxColider) this.boxColider.position.set(this.position);
  }

  frictionApply () {
    if (this.friction > 0) {
      const oldVelocityLength = this.velocity.getLength();
      if (oldVelocityLength) {
        this.velocity.setLength(Math.max(0, oldVelocityLength - this.friction));
      }
    }
  }
  render() {
    this.renderer.render(this);
  }
  activate() {
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
  }
}
