class Auth {
    auth: boolean = false;
}

export const authValidation = async (tk: string): Promise<boolean> => {
    const config = require('../config.json');
    let a: Auth = new Auth();
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tk })
    };
    let f = fetch(`${config.api_url}/api/auth`, requestOptions)
        .then(response => response.json())
        .then(data => {
            a.auth = data.auth;
        })
    const c = await f.then(() => { return a.auth; });
    return c;
}