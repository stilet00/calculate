document.addEventListener('DOMContentLoaded', () => {
    let url = 'http://localhost:3333/';
    function login (event) {
        let user = {
            name: event.target.previousSibling.previousSibling.value,
            password: event.target.previousSibling.value
        }
        let promise = fetch(url + "login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        })
        promise
            .then(res => {
                if (res.ok && res.status === 200) {
                    return res.text()
                } else if (res.pending) {
                    console.log('pending')
                }
            })
            .then(res => document.innerHTML = res)
            .catch(err => console.log(err))
    }
    function _init (event) {
        console.log(event.target.id)
    }
    document.querySelector('#submit').addEventListener('click', login);
})
