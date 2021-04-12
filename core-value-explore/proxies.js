import { wait } from './helper.js';

const apiUrls = [
    'https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-values',
    'https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-value-2',
    'https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-values-3',
];

export const getAllCoreValues = async () => {
    const getAllCoreValuesResponsePromises = apiUrls.map((url) => {
        return fetch(url);
    });
    const responses = await Promise.all(getAllCoreValuesResponsePromises);
    const getAllCoreValuesDataPromise = responses.map((response) => {
        return response.json();
    });
    
    const data = await Promise.all(getAllCoreValuesDataPromise);
    wait(200);
    return data.reduce((result, dt) => {
        return [...result, ...dt]
    }, []);
};
export const getLeaderboard = async () => {
    const allCoreValues = await getAllCoreValues();
    wait(200);
    return _.orderBy(allCoreValues, ['elo'], ['desc']).slice(0, 15);
}
export const getTwoRandom = async () => {
    const allCoreValues = await getAllCoreValues();
    wait(200);
    return _.sampleSize(allCoreValues, 2);
};
const getUrlById = (id) => {
    if (id <= 100) return `https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-values/${id}`;
    else if (id <= 200) return `https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-value-2/${Number(id) - 100}`;
    else return `https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/core-values-3/${Number(id) - 200}`;
}
export const updateCoreValue = async (coreValue) => {
    const {id, ID, ...otherield  } = coreValue;
    const response = await fetch(
        getUrlById(ID || id),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(otherield),
        }
      );
    wait(200);
    return await response.json();
};
