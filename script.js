document.addEventListener('DOMContentLoaded', function() {
    const buttonCollection = document.querySelectorAll('button');
    const div = document.querySelector('.menu')
    function setButtonsId() {
        for (let i = 0; i < buttonCollection.length; i++) {
            buttonCollection[i].setAttribute('id', i);
        }
    }
    function buttonPressed(event) {
        if (event.target.tagName === 'BUTTON') {
            for (let i = 0; i < buttonCollection.length; i++) {
                buttonCollection[i].classList.remove(`button-active`);
            }
            event.target.classList.toggle('button-active');
        }
    }
    setButtonsId();
    div.addEventListener('click', buttonPressed);

})