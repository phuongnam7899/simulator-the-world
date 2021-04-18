class SingleImageRenderer {
    constructor(width, height, color) {
        this.width = width;
        this.height = height;
        this.color = color;
    }
    render(gameObject) {
        fill(color(this.color));
        rect(gameObject.position.x, gameObject.position.y, this.width, this.height)
    }
}