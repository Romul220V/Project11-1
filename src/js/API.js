export default class API {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.headers = options.headers;
    };
    getUser() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: {
                authorization: this.headers.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })

            .then((result) => {
                return result;
            })
            .catch((err) => {
                console.log(err); 
            });
    }

    getCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: {
                authorization: this.headers.authorization,
            },
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status}`);
            })
            .then((result) => {
                return result;
            })

            .catch((err) => {
                console.log(err);
            });
    }

    patchUser(name, about) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.headers.authorization,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about 
              })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then((result) => {
            return result;
          })

            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
    }
}