document.addEventListener('DOMContentLoaded', function() {
    class Translator {
        constructor(name) {
            this.name = name;
            this.clients = [];
            this.cardNumber;

        }

    }
    class View {
        constructor() {
            this.buttonCollection = document.querySelectorAll('button');
            this.info = document.querySelector('.info');
            this.container = document.querySelector('.container');
            this.ul = document.createElement('ul');
            this.ul.classList.add('bullet');
        }
        pictureTranslatorPage = (item) => {
                this.info.append(this.ul);
                const translator = document.createElement('li');
                translator.innerHTML = item;
                this.ul.append(translator);
            }
        setButtonsId() {
            for (let i = 0; i < this.buttonCollection.length; i++) {
                this.buttonCollection[i].setAttribute('id', i);
            }
        }
        buttonPressed = (event) => {
                for (let i = 0; i < this.buttonCollection.length; i++) {
                    this.buttonCollection[i].classList.remove(`button-active`);
                }
                event.target.classList.toggle('button-active');

            }
        addTranslator = () => {
            this.clearField();
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
        clearInput(input) {
            input.value = '';
        }
    }
    class Model {
        constructor(view) {
            this.view = view;
            this.translatorsList = [];
            this.clientList = [];
        }
        setTranslatorList() {
            let trans = Model.createObject(Translator, document.querySelector('#addTranslator').previousSibling.value);
            this.translatorsList.push(trans);
        }
        setClientList(item) {
            this.clientList.push(item);
        }
        giveTranslatorList = () => {

            this.view.clearField();
            this.translatorsList.forEach((item) => {
                this.view.pictureTranslatorPage(item.name);
            });
        }
        static createObject = (className, name) => {
            return new className(name);
        }
    }
    class Controller {
        constructor(model) {
            this.model = model;
        }
        click = (event) => {
            if (event.target.tagName === 'BUTTON') {
                switch (event.target.id) {
                    case '1' :
                        this.model.view.buttonPressed(event);
                        this.model.giveTranslatorList(event);
                        break;
                    case '2' :
                        this.model.view.buttonPressed(event);
                        this.model.view.addTranslator();
                        break;
                    case 'addTranslator' :
                        this.model.setTranslatorList();
                        this.model.view.clearInput(document.querySelector('#addTranslator').previousSibling);
                }
            }
        }
    }
    let view = new View;
    let model = new Model(view);
    let controller = new Controller(model);
    view.setButtonsId();
    view.container.addEventListener('click', controller.click);



})