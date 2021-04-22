const randomInRange = (start, end, except) => {
    let randomNumber = Math.round(Math.random() * (end - start) + start);
    while (randomNumber === except) {
        randomNumber = Math.round(Math.random() * (end - start) + start);
    }
    return randomNumber;
}