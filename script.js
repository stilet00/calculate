document.addEventListener('DOMContentLoaded', function() {
    const buttonCollection = document.querySelectorAll('button');
    function setButtonsId() {
        for (let i = 0; i < buttonCollection.length; i++) {
            buttonCollection[i].setAttribute('id', i);
        }
    }
    setButtonsId();
    console.log(buttonCollection[0]);
})