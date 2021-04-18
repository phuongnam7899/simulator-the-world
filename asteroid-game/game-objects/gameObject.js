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
      recyclableObject.reactive();
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

  // Find object in a class that intersect with given
  static findIntersected = (className, gameObject) => {
    const intersectedObjects = GameObject.gameObjects.filter((object) => {
      return (
        object.isActive &&
        object.constructor.name === className &&
        object.boxColider.intersected(gameObject.boxColider)
      );
    });
    return intersectedObjects;
  };

  constructor() {
    this.position = new Vector2D(200, 200);
    this.velocity = new Vector2D(10, 0);
    this.isActive = true;
    this.anchor = new Vector2D(0.5, 0.5);
    GameObject.addNew(this);
  }
  
  run() {
    this.position.add(this.velocity);
  }
  render() {
    this.renderer.render(this);
  }
  activate() {
    this.isActive = true;
  }
  deactvate() {
    this.isActive = false;
  }
}
