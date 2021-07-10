const register = async (username, password) => {
    const response = await fetch('https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,
            password
        }),
      });
    const data = await response.json();
    console.log(data);
}
const login = async (username, password) => {
    const response = await fetch('https://60547a60d4d9dc001726d41b.mockapi.io/api/v1/users');
    const data = await response.json();
    for (let user of data) {
        if (user.username === username && user.password === password) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            location.replace('https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch')
        }
    };
    console.log(data);
}
const logout = async () => {
    localStorage.removeItem('currentUser');
    location.reload();
}
function register() {

}
async function wait(time) {
    return new Promise((resolve, _reject) => {
        setTimeout(() => {
            resolve();
        }, time)
    })
}