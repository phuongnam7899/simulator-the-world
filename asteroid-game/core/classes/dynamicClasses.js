const classesMap = {
    Player,
    Enemy,
    PlayerBullet,
    EnemySummoner,
}
class DynamicClass {
    constructor(className, parameters = []) {
        return new classesMap[className](...parameters);
    }
}