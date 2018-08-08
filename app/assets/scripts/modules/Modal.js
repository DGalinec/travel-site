import $ from 'jquery';

class Modal {
    constructor() {
        this.openModalButton = $(".open-modal"); /* point to 'Get in Touch' button in the navigation bar */
        this.modal = $(".modal");
        this.closeModalButton = $(".modal__close");
        this.events();
    }

    events() {
        //clicking the open modal button
        this.openModalButton.click(this.openModal.bind(this));

        //clicking the 'X' close modal button
        this.closeModalButton.click(this.closeModal.bind(this));

        //pushes any key
        $(document).keyup(this.keyPressHandler.bind(this)); /* event is fired if user presses any key in the page  */
    }

    keyPressHandler(e) {
        if (e.keyCode == 27 ) { /* if key pressed is the <escape> key */
            this.closeModal();
        }
    }

    openModal() {
        this.modal.addClass("modal--is-visible");
        return false; /* to empeach the browser to automatically scroll up when clicking the 'Get in Touch' button in the menu bar */
    }

    closeModal() {
        this.modal.removeClass("modal--is-visible");
    }
}

export default Modal;