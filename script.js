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

        }
        // Методы прорисовки таблиц требуют объединения
        pictureTranslatorPage = (item, index) => {
            this.info.append(this.ul);
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
        pictureDetails (object, id) {
            this.clearField();
            const table = document.createElement('table');
            const buttonEdit = document.createElement('button');
            const buttonSave = document.createElement('button');
            buttonEdit.innerHTML = 'Редактировать';
            buttonSave.innerHTML = 'Сохранить';
            buttonEdit.classList.add('btn', 'btn-secondary');
            buttonSave.classList.add('btn', 'btn-secondary');
            table.classList.add('objectDetails');
            table.id = id;
            const menu1 = document.createElement('tr');
            const menu2 = document.createElement('tr');
            const subMenu1 = document.createElement('th');
            const subMenu2 = document.createElement('th');
            const subMenu3 = document.createElement('th');
            const subMenu4 = document.createElement('td');
            const subMenu5 = document.createElement('td');
            const subMenu6 = document.createElement('td');
            subMenu1.innerHTML = 'Имя переводчика';
            subMenu2.innerHTML = 'Прикрепленные клиентки';
            subMenu3.innerHTML = 'Номер карты';
            subMenu4.innerHTML = object.name;
            subMenu5.innerHTML = object.clients;
            subMenu6.innerHTML = object.cardNumber;
            this.info.append(table, buttonEdit, buttonSave);
            table.append(menu1, menu2);
            menu1.append(subMenu1, subMenu2, subMenu3);
            menu2.append(subMenu4, subMenu5, subMenu6);



        }
        pictureCurrencyPage = (item) => {
            this.info.append(this.ul);
            const currency = document.createElement('li');
            currency.innerHTML = item;
            this.ul.append(currency);
        }
        buttonPressed = (event) => {
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
        clearField() {
            this.info.innerHTML = '';
            this.ul.innerHTML = '';
        }
        clearUl() {
            this.ul2.innerHTML = '';
        }

        clearInput(input) {
            input.value = '';
        }
    }
    class Model {
        constructor (view) {
            this.view= view;
            this.translatorsList = [];
            this.clientList = [];
        }
        saveTranslator () {
            let trans = Model.createObject(Translator, document.querySelector('#addTranslator').previousSibling.value);
            this.translatorsList.push(trans);
        }
        deleteTranslator (id) {
          this.translatorsList.splice(id, 1);
          this.giveTranslatorList();
        }
        saveClient () {
            let client = Model.createObject(Translator, document.querySelector('#addClient').previousSibling.value);
            this.clientList.push(client);
        }
        giveTranslatorList () {
            this.translatorsList.forEach((item, index) => {
                this.view.pictureTranslatorPage(item.name, index);
            });
        }
        giveTranslatorDetails (id) {
                this.view.pictureDetails(this.translatorsList[id], id);
        }
        giveClientList () {
            this.clientList.forEach((item) => {
                this.view.pictureTranslatorPage(item.name);
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
                    case 'addObj' :
                        this.model.view.buttonPressed(event);
                        this.model.view.addTranslatorMenu();
                        break;
                    case 'transl' :
                        this.model.view.buttonPressed(event);
                        this.model.giveTranslatorList(event);
                        break;
                    case 'clients' :
                        this.model.view.buttonPressed(event);
                        this.model.giveClientList(event);
                        break;
                    case 'currency' :
                        this.model.view.buttonPressed(event);
                        this.model.getCurrency();
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
                }
                switch (event.target.getAttribute('name')) {
                    case 'delete' :
                        this.model.view.buttonPressed(event);
                        this.model.deleteTranslator(event.target.parentNode.id);
                        break;
                    case 'details' :
                        this.model.view.clearUl();
                        this.model.giveTranslatorDetails(event.target.parentNode.id, event.target   );
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