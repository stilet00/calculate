document.addEventListener('DOMContentLoaded', function() {
    class Translator {
        constructor(name) {
            this.name = name;
            this.clients = [];
            this.cardNumber = 0;

        }

    }
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
        pictureTranslatorPage = (item, index, dataType) => {
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
            const input2 = document.createElement('input');
            const button = document.createElement('button');
            const button2 = document.createElement('button');
            input.setAttribute('placeholder', 'Введите фамилию переводчика');
            input2.setAttribute('placeholder', 'Введите фамилию клиентки');
            button.setAttribute('id', 'addTranslator');
            button2.setAttribute('id', 'addClient');
            button.classList.add('btn', 'btn-secondary');
            button2.classList.add('btn', 'btn-secondary');
            button.innerText = 'Добавить переводчика';
            button2.innerText = 'Добавить клиентку';
            this.info.append(input);
            this.info.append(button);
            this.info.append(input2);
            this.info.append(button2);
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
            this.translatorsList = [];
            this.clientList = [];
            this.url = 'http://localhost:3333/'
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
                        this.clientList = await receiveItems();
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

        saveTranslator () {
            let trans = Model.createObject(Translator, document.querySelector('#addTranslator').previousSibling.value);
            this.translatorsList.push(trans);
            this.view.showText('Переводчик сохранен');
        }
        deleteTranslator (id) {
            this.translatorsList = this.translatorsList.filter((item) => {
                return item._id !== id;
            })
            this.giveTranslatorList();
        }
        // deleteTranslator (id) {
        //     console.log(id);
        //     let promise = fetch('http://localhost:3333/' + 'delete/' + id, {
        //         method: 'DELETE'
        //     });
        //     promise
        //         .then(res => console.log(res))
        //         .catch(err => console.log(err));
        //
        // }
        saveClient () {
            let client = Model.createObject(Translator, document.querySelector('#addClient').previousSibling.value);
            this.clientList.push(client);
            this.view.showText('Клиентка сохранена');
        }
        giveTranslatorList () {
            this.translatorsList.forEach((item, index) => {
                this.view.pictureTranslatorPage(item.name, item._id, 'translators');
            });
        }
        giveDetails (id, dataType) {
            if (dataType === 'translators') {
                this.view.createTable(id, dataType);
                let data = this.translatorsList.find((item) => {
                    return item._id === id;
                });
                for (let key in data) {
                    if (key !== '_id') {
                        this.view.pictureDetails(data[key]);
                    }
                }
            } else if (dataType === 'clients') {
                this.view.createTable(id, dataType);
                let data = this.clientList[id];
                for (let key in data) {
                    if (key !== '_id') {
                        this.view.pictureDetails(data[key]);
                    }
                }

            }
        }
        saveChanges = (id, dataType) => {
            let dataPlaces = this.view.table.querySelectorAll('input');
            let i = 0;
            if (dataType === 'translators') {
                let data = this.translatorsList.find((item) => {
                    return item._id === id;
                });

                for (let key in data) {
                    if (key !== '_id' && key !== 'clients') {
                        data[key] = dataPlaces[i].value;
                        i++;
                    } if (key === 'clients') {
                        let array = dataPlaces[i].value.split(' ');
                        data[key] = array;
                        i++;
                    }
                }
                this.sendData(dataType, id, data.name, data.clients, data.cardNumber);
            }
            this.giveDetails(id, dataType);
        }
        giveClientList () {
            this.clientList.forEach((item, index) => {
                this.view.pictureTranslatorPage(item.name, index, 'clients');
            });
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
                    case 'clients' :
                        this.model.view.buttonPressed(event);
                        this.model.giveClientList(event);
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
                        this.model.saveTranslator();
                        this.model.view.clearInput(document.querySelector('#addTranslator').previousSibling);
                        break;
                    case 'addClient' :
                        this.model.saveClient();
                        this.model.view.clearInput(document.querySelector('#addClient').previousSibling);
                        break;
                    case 'edit' :
                        this.model.view.pictureEditData();
                        break;
                    case 'save' :
                        this.model.saveChanges(event.target.previousSibling.id, event.target.previousSibling.dataset.type);
                        break;

                }

                switch (event.target.getAttribute('name')) {
                    case 'delete' :
                        this.model.view.buttonPressed(event);
                        this.model.deleteTranslator(event.target.parentNode.id);
                        break;
                    case 'details' :
                        this.model.view.clearUl();
                        this.model.giveDetails(event.target.parentNode.id, event.target.parentNode.parentNode.dataset.type);
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