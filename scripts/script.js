document.addEventListener('DOMContentLoaded', function() {
    class View {
        constructor() {
            this.buttonCollection = document.querySelectorAll('button')
            this.info = document.querySelector('.info');
            this.buttons = document.querySelector('.buttons');
            this.ul = document.createElement('ul');
            this.ul2 = document.createElement('ul');
            this.ul.classList.add('bullet');
            this.table = document.createElement('table');

        }
        // Методы прорисовки таблиц требуют объединения
        pictureListItems = (item, index, dataType) => {
            this.info.append(this.ul);
            this.ul.setAttribute('data-type', dataType);
            const translator = document.createElement('li');
            const buttonDetails = document.createElement('button');
            const buttonDelete = document.createElement('button');
            translator.id = index;
            buttonDetails.innerText = 'Подробнее';
            buttonDetails.setAttribute('name', 'details');
            buttonDelete.setAttribute('name', 'delete');
            buttonDelete.innerText = 'Удалить';
            buttonDetails.classList.add('btn', 'btn-secondary');
            buttonDelete.classList.add('btn', 'btn-secondary');
            translator.classList.add('objList');
            translator.innerHTML = item;
            translator.append(buttonDetails, buttonDelete);
            this.ul.append(translator);
        }
        createTable (id, dataType) {
            this.clearField();
            const buttonEdit = document.createElement('button');
            buttonEdit.innerHTML = 'Редактировать';
            buttonEdit.id = 'edit';
            buttonEdit.classList.add('btn', 'btn-secondary');
            this.table.classList.add('objectDetails');
            this.table.id = id;
            this.table.setAttribute('data-type', dataType)
            const menu1 = document.createElement('tr');
            const menu2 = document.createElement('tr');
            const subMenu1 = document.createElement('th');
            const subMenu2 = document.createElement('th');
            const subMenu3 = document.createElement('th');
            subMenu1.innerHTML = 'Имя переводчика';
            subMenu2.innerHTML = 'Прикрепленные клиентки';
            subMenu3.innerHTML = 'Номер карты';
            this.info.append(this.table, buttonEdit);
            this.table.append(menu1, menu2);
            menu1.append(subMenu1, subMenu2, subMenu3);
        }
        pictureDetails (data) {
            let subMenu = document.createElement('td');
            subMenu.innerHTML = data;
            this.table.lastChild.append(subMenu);

        }
        pictureEditData () {
            const buttonSave = document.createElement('button');
            buttonSave.innerHTML = 'Сохранить';
            buttonSave.id = 'save';
            buttonSave.classList.add('btn', 'btn-secondary');
            const input1 = document.createElement('input');
            const input2 = document.createElement('input');
            const input3 = document.createElement('input');
            input1.setAttribute('placeholder', 'Ред. имя');
            input2.setAttribute('placeholder', 'Ред. клиенток');
            input3.setAttribute('placeholder', 'Ред. номер карты');
            this.table.append(input1, input2, input3);
            this.info.append(buttonSave);
            document.getElementById('edit').remove();

        }
        pictureCurrencyPage = (item) => {
            this.info.append(this.ul);
            this.ul.removeAttribute('data-type');
            const currency = document.createElement('li');
            currency.innerHTML = item;
            this.ul.append(currency);
        }
        buttonPressed = (event) => {
            event.preventDefault();
            this.clearField();
            for (let i = 0; i < this.buttonCollection.length; i++) {
                this.buttonCollection[i].classList.remove(`button-active`);
            }
            event.target.classList.toggle('button-active');

        }
        addTranslatorMenu = () => {
            const input = document.createElement('input');
            const button = document.createElement('button');
            input.setAttribute('placeholder', 'Введите фамилию переводчика');
            button.setAttribute('id', 'addTranslator');
            button.classList.add('btn', 'btn-secondary');
            button.innerText = 'Добавить переводчика';
            this.info.append(input);
            this.info.append(button);
        }
        showText (text) {
            const message = document.createElement('p');
            message.innerHTML = text;
            message.style.textAlign = 'center';
            message.style.opacity = '1';
            this.info.append(message);
            let start = Date.now();
            let timer = setInterval(function() {
                let timePassed = Date.now() - start;
                if (timePassed >= 2000) {
                    clearInterval(timer);
                    message.remove();
                    return;
                }
                draw(timePassed);
            }, 20);
            function draw(timePassed) {
                message.style.opacity -= timePassed / 10000;
            }
        }
        clearField () {
            this.info.innerHTML = '';
            this.ul.innerHTML = '';
            this.table.innerHTML = '';
        }
        clearUl () {
            this.ul2.innerHTML = '';
        }

        clearInput (input) {
            input.value = '';
        }
        pictureText(text) {
            const header = document.createElement('h1');
            header.innerHTML = text;
            this.info.append(header);
        }
    }
    class Model {
        constructor (view) {
            this.view= view;
            this.url = '/'
        }
        loadDataBase (dataBaseName) {
            let receiveItems = async () => {
                const rsp = await fetch(this.url + dataBaseName);
                return rsp.json();
            }
            let saveList = async (dataBaseName) => {
                if (dataBaseName === "translators") {
                    try {
                        this.translatorsList = await receiveItems();
                    } catch (err) {

                        console.error(err);
                    }
                } else {
                    try {
                        // this.clientList = await receiveItems();
                    } catch (err) {

                        console.error(err);
                    }
                }
            }
            saveList(dataBaseName);
        }
        sendData (dataBaseName, _id, name, clients, cardNumber) {
            let user = {
                name: name,
                clients: clients,
                cardNumber: cardNumber
            }
            let promise = fetch(this.url + dataBaseName + '/' + _id, {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(user)
            });
            promise.then(res => alert("translator edited")).catch(e => alert(e));
        }

        saveTranslator (name) { //working method
            let translator = {
                name: name,
            }

            let promise = fetch(this.url + "add", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(translator)
            });
            promise
                .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.text();
                    } else {
                        return Promise.reject(res.status);
                    }
                })
                .catch(err => console.log(err))


            this.view.showText('Переводчик сохранен');
        }
        giveTranslatorList () { //working method
            let promise = fetch(this.url + "translators");
            promise
                .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.json();
                    } else {
                        return Promise.reject(res.status);
                    }
                })
                .then(res => {
                    res.forEach(item => {
                        this.view.pictureListItems(item.name, item._id, 'translators');
                    })
                })
                .catch(err => console.log(err))

        }

        deleteItem (id, collection) {
            let col = {
                name: collection
            }
            let promise = fetch(this.url + id, {
                method: "DELETE",
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(col)
            })
                .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.text();
                    } else {
                        return Promise.reject(res.status);
                    }
                })
                .then(res => {
                    if (collection === "translators") {
                        this.giveTranslatorList();
                    } else {
                        this.giveClientList();
                    }
                })
                .catch(err => console.log(err))
        }

            giveDetails (id, collection) {
                this.view.createTable(id, collection); //table will be different if collection === 'clients'
                let promise = fetch(this.url + collection + '/' + id);
                promise
                    .then(res => {
                        if (res.ok && res.status === 200) {
                            return res.json();
                        } else {
                            return Promise.reject(res.status);
                        }
                    })
                    .then(res => {
                        for (let key in res) {
                            if (key !== '_id') {
                                this.view.pictureDetails(res[key]);
                            }
                        }
                    })
                    .catch(err => console.log(err))
            }


        saveChanges = (id, dataType) => {
            let dataPlaces = this.view.table.querySelectorAll('input');
            let translator = {
                name: dataPlaces[0].value,
                clientList: dataPlaces[1].value.split(',', ),
                cardNumber: dataPlaces[2].value
            }

            let promise = fetch(this.url + id, {
                method: "PUT",
                headers: {'Content-type':'application/json;charset=utf-8'},
                body: JSON.stringify(translator)
            })
                .then(res => {
                    if (res.ok && res.status === 200) {
                        return res.text();
                    } else {
                        return Promise.reject(res.status);
                    }
                })
                .then(res => console.log(res))
                .catch(err => console.log(err))

            // this.giveDetails(id, dataType);
        }

        getCurrency () {
            let promise = fetch("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5");
            promise
                .then(success => success.json())
                .then(obj => {
                    for (let i = 0; i <= 2; i++) {
                        if (i === 2) {
                            this.view.pictureCurrencyPage(`Курс payoneer равен ${obj[0].buy - 1}`);
                        } else {
                            this.view.pictureCurrencyPage(`${obj[i].ccy} / ${obj[i].base_ccy} = ${obj[i].buy} / ${obj[i].sale}`);
                        }
                    }
                })
        }

        static createObject = (className, name) => {
            return new className(name);
        }

    }
    class Controller {
        constructor(model) {
            this.model = model;
        }
        clickButtons = (event) => {
            if (event.target.tagName === 'BUTTON') {
                switch (event.target.id) {
                    case 'main' :
                        this.model.view.buttonPressed(event);
                        this.model.getCurrency();
                        break;
                    case 'addObj' :
                        this.model.view.buttonPressed(event);
                        this.model.view.addTranslatorMenu();
                        break;
                    case 'transl' :
                        this.model.view.buttonPressed(event);
                        this.model.giveTranslatorList();
                        break;
                    case 'statistics' :
                        this.model.view.buttonPressed(event);
                        this.model.loadDataBase("translators");
                        break;
                }
            }
        }
        clickInfo = (event) => {
            if (event.target.tagName === 'BUTTON') {
                switch (event.target.id) {
                    case 'addTranslator' :
                        this.model.saveTranslator(event.target.previousSibling.value);
                        this.model.view.clearInput(document.querySelector('#addTranslator').previousSibling);
                        break;
                    case 'edit' :
                        this.model.view.pictureEditData();
                        break;
                    case 'save' :
                        this.model.saveChanges(event.target.previousSibling.id, event.target.previousSibling.dataset.type);
                        this.model.view.buttonPressed(event);
                        break;

                }

                switch (event.target.getAttribute('name')) {
                    case 'delete' :
                        this.model.deleteItem(event.target.parentNode.id, event.target.parentNode.parentNode.dataset.type);
                        this.model.view.buttonPressed(event);
                        break;
                    case 'details' :
                        this.model.giveDetails(event.target.parentNode.id, event.target.parentNode.parentNode.dataset.type);
                        this.model.view.clearUl();
                        break;
                }

            }
        }
    }
    let view = new View;
    let model = new Model(view);
    let controller = new Controller(model);
    view.buttons.addEventListener('click', controller.clickButtons);
    view.info.addEventListener('click', controller.clickInfo);



})