class BoxColider {
  constructor(gameObject, width, height) {
    this.position= new Vector2D(gameObject.position.x, gameObject.position.y); // Vector2D
    this.width = width;
    this.height = height;
    this.anchor = gameObject.anchor; // Vector2D
  }
  top() {
    return this.position.y - this.anchor.y * this.height;
  }
  bot() {
    return this.top() + this.height;
  }
  left() {
    return this.position.x - this.anchor.x * this.width;
  }
  right() {
    return this.left() + this.width;
  }
  intersected(otherBoxColider) {
    return (
      this.top() <= otherBoxColider.bot() &&
      this.bot() >= otherBoxColider.top() &&
      this.right() >= otherBoxColider.left() &&
      this.left() <= otherBoxColider.right()
    );
  }
}
