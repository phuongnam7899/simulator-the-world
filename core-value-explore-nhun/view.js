import { getLeaderboard, getTwoRandom, updateCoreValue } from './proxies.js';
import { calcElo, wait } from './helper.js'

const leaderboardItemsContainer = document.getElementById('leaderboad-items');
const leftItem = document.getElementById('left-item')
const rightItem = document.getElementById('right-item')
const leftDesInput = document.getElementById('left-des-input');
const rightDesInput = document.getElementById('right-des-input');
const leftDesForm = document.getElementById('left-description-form');
const rightDesForm = document.getElementById('right-description-form');
const resetBtnEl = document.getElementById('reset-btn');

export const renderLeaderboard = async () => {
    const leaderboardData = await getLeaderboard();
    leaderboardItemsContainer.innerHTML = '';
    for (let i = 0; i < leaderboardData.length; i++) {
        const item = leaderboardData[i];
        leaderboardItemsContainer.innerHTML += `
        <div class="leaderboard-item">
            <div class="item-name">${i + 1}. ${item.name}</div>
            <div class="item-elo">${Math.round(item.elo)} <i class="fas fa-star"></i></div>
            <div class="item-win-count">${item.winTimes} <i class="fas fa-check"></i></div>
            <div class="item-lose-count">${item.loseTimes} <i class="fas fa-times"></i></div>
        </div>
        `;
    }
};

export const renderDescriptionForm = (left, right) => {
    leftDesInput.value = left.description;
    rightDesInput.value = right.description;
    leftDesForm.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.keyCode == 13) {
            leftDesInput.blur();
            updateCoreValue({
                ...left,
                description: leftDesInput.value
            })
        }
    });
    rightDesForm.addEventListener('keydown', (e) => {
        if (e.shiftKey && e.keyCode == 13) {
            rightDesInput.blur();
            updateCoreValue({
                ...right,
                description: rightDesInput.value
            })
        }
    });
}

export const renderChoices = async () => {
    leftItem.style.pointerEvents = 'none';
    rightItem.style.pointerEvents = 'none';
    leftItem.innerText = '...';
    rightItem.innerText = '...';
    const [leftChoice, rightChoice] = await getTwoRandom();
    await wait(2000)
    rightItem.style.pointerEvents = 'auto';
    leftItem.style.pointerEvents = 'auto';
    leftItem.innerText = leftChoice.name;
    rightItem.innerText = rightChoice.name;
    renderDescriptionForm(leftChoice, rightChoice)
    leftItem.addEventListener('click', async () => {
        const [newLeftChoice, newRightChoice] = calcElo(leftChoice, rightChoice, true);
        renderChoices();
        await updateCoreValue(newLeftChoice);
        await updateCoreValue(newRightChoice);
        renderLeaderboard();
    });
    rightItem.addEventListener('click', async () => {
        const [newLeftChoice, newRightChoice] = calcElo(leftChoice, rightChoice, false);
        renderChoices();
        await updateCoreValue(newLeftChoice);
        await updateCoreValue(newRightChoice);
        renderLeaderboard();
    });

}


export const renderHeader = async () => {
    resetBtnEl.addEventListener('click', () => {
        renderChoices();
    })
}
export const renderAll = () => {
    renderLeaderboard();
    renderChoices();
    renderHeader();
}
