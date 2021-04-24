const sheeps = [30, 20, 50, 20, 30];
let storage = 0;
console.log('In the begin, my sheeps size is', sheeps);
for (let month = 0; month < 24; month++) {
    // Growing phase
    for (let sheepIndex = 0; sheepIndex < sheeps.length; sheepIndex++) {
        sheeps[sheepIndex] *= 1.25;
    }
    console.log(`After month ${month + 1}, my sheeps size is`, sheeps);

    // Shearing phase
    for (let sheepIndex = 0; sheepIndex < sheeps.length; sheepIndex++) {
        if (sheeps[sheepIndex] > 50) {
            console.log(`The ${sheepIndex + 1} sheep has size = ${sheeps[sheepIndex]} (> 50), it'll be sheared to 10`);
            const woolUnitToStore = sheeps[sheepIndex] - 10;
            console.log(`${woolUnitToStore} wool units will be put in the storage`);
            storage += woolUnitToStore;
            console.log(`Now the storage has ${storage} wool units`);
            sheeps[sheepIndex] = 10;
        }
    }
    console.log('After shearing phase, my sheeps size is', sheeps);
    console.log('------------------------------------------------------------------------------');
}