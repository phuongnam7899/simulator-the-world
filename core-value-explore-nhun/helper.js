const getExpected = (win) => {
  return win ? 1 : 0;
};
export const calcElo = (p1, p2, p1Win) => {
  const p1WinRate = 1.0 / (1.0 + Math.pow(10, (p1.elo - p2.elo) / 400));
  const p2WinRate = 1 - p1WinRate;
  p1.elo = p1.elo + 30 * (getExpected(p1Win) - p1WinRate);
  p2.elo = p2.elo + 30 * (getExpected(!p1Win) - p2WinRate);
  if (p1Win) {
      p1.winTimes += 1;
      p2.loseTimes += 1;
  } else {
    p2.winTimes += 1;
    p1.loseTimes += 1;
  }
  return [p1, p2];
};

export const wait = (time) => {
  return new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  })
}
