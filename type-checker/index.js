const contentEl = document.getElementById("content");
const timeInnerEl = document.getElementById("inner");
const contentData = [
  `By a vote of 55-to-45, the Senate narrowly killed a Republican effort to dismiss the proceeding as unconstitutional because Mr. Trump is no longer in office. But the numbers showed that loyal Republicans were again poised to spare him from conviction, this time despite his role in stirring up a mob that violently targeted lawmakers and the vice president on Jan.`,
  ` 6 as Congress met to finalize the election. "I think it's pretty obvious from the vote today that it is extraordinarily unlikely that the president will be convicted," said Senator Susan Collins of Maine, one of the five Republicans who voted to proceed to trial.`,
  `If they did, an additional vote to disqualify him from ever holding office again would take a simple majority. Aside from Ms. It would take two-thirds of senators — 67 votes — to attain a conviction, meaning 17 Republicans would have to cross party lines to side `,
  `which was adopted in a bipartisan vote a week after the attack. Trump had "provoked" the mob. But if Mr. McConnell was trying to soften the ground for a faction of Republicans to abandon Mr. Trump and jettison him from the party, it had become increasingly clear that no such coalition was emerging. When his fellow Kentuckian Senator Rand`,
  `Collins, the only Republicans who joined Democrats in voting to reject the constitutional objection and proceed were Senators Lisa Murkowski of Alaska, Mitt Romney of Utah, Ben Sasse of Nebraska and Patrick J. Toomey of Pennsylvania. All five had previously said they were open to hearing the House’s impeachment case. `,
  `The Senate convened as a court of impeachment. "Just do the math." with Democrats in finding Mr. Trump guilty. Paul lodged a constitutional objection to the proceeding minutes after. When his fellow Kentuckian Senator Rand`,
  `It appeared that Senator Mitch McConnell of Kentucky, the Republican leader, was among those making such a calculation. He had twice signaled in recent days — through advisers and then in a letter to colleagues — that he was open to convicting a former president he privately disdains, and he publicly asserted last week that Mr.  `,
  `Mr. McConnell voted with the vast majority of his conference in favor of the challenge. It seemed to be a recognition that Republicans were not so keen to move on from Mr. Trump, whether out of fear of his promises of retribution and his overwhelming popularity with the party’s core supporters, or out of a belief that the fight was simply not worth having. `,
];
const contentString =
  contentData[Math.floor(Math.random() * contentData.length)];
const contentCharacters = contentString.split("");
const typedCharacters = [];
const appEl = document.getElementById("app");
const timeLimit = 30;
let currentTime = 0;
const wordCount = contentCharacters.filter((char) => {
  return char === " ";
}).length;
const charPerWordAvg = contentCharacters.length / wordCount;

const handleTimeInterval = setInterval(() => {
  if (currentTime < timeLimit) {
    currentTime += 0.1;
    updateTime();
  } else {
    showResult();
  }
}, 100);

appEl.addEventListener("keyup", (e) => {
  console.log(e.keyCode);
  if (e.keyCode === 8) {
    typedCharacters.splice(typedCharacters.length - 1, 1);
  } else {
    if (currentTime < timeLimit && e.key.length <= 1) {
      typedCharacters.push(e.key);
    }
  }
  updateResult();
});
const isSpace = (char) => {
  const spaceCharCodes = [32, 160];
  return  spaceCharCodes.includes(`${char}`.charCodeAt(0));
}
const updateResult = () => {
  const charEls = contentEl.children;

  for (let i = 0; i < contentCharacters.length; i++) {
    if (charEls[i]) {
      const character = charEls[i].innerText;
      const typedChar = typedCharacters[i];
      let charStatus = "unknown";
      if (typedChar === character || (isSpace(character) && isSpace(typedChar))) charStatus = "true-char";
      else if (typedChar !== undefined && typedChar != character) {
          charStatus = "wrong-char";
      }
      charEls[i].className = charStatus;
    } else {
      contentEl.innerHTML += `
        <span class="unknown">${contentCharacters[i] === " " ? "&nbsp;" : contentCharacters[i]}</span>
    `;
    }
  }
};
const updateTime = () => {
  const timeLeftPercent = (timeLimit - currentTime) / timeLimit;
  timeInnerEl.style.width = `${timeLeftPercent * 100}%`;
};
const showResult = () => {
  let correctCharCount = 0;
  for (let i = 0; i < typedCharacters.length; i++) {
    const character = contentCharacters[i];
    const typedChar = typedCharacters[i];
    if (character === typedChar) {
      correctCharCount++;
    }
  }
  const correctWordCount = Math.round(correctCharCount / charPerWordAvg);
  const wpm = correctWordCount / (timeLimit / 60);
  const wpmAvg = 45;
  contentEl.innerHTML = `
        <div class='result'>
         <div class='wpm'>${wpm} WPM</div>
         <div class='cp-with-avg'>${Math.round(
           (wpm / wpmAvg) * 100
         )}% Average speed</div>
        </div>
    `;
};
updateResult();
updateTime();
