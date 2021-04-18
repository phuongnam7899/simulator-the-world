class FrameCounter {
    constructor(maxCount) {
        this.count = 0;
        this.maxCount = maxCount;
    }
    run() {
        if (this.count >= this.maxCount) {
            return true;
        }
        this.count++;
        return false;
    }
    reset() {
        this.count = 0;
    }
}