const classesMap = {
    Player,
    Enemy,
}
class DynamicClass {
    constructor(className, parameters = []) {
        return new classesMap[className](...parameters);
    }
}