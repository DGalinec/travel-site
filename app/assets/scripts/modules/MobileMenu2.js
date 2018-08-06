import $ from 'jquery';

class MobileMenu2 {
    constructor() {
        $(".site-header__menu-icon").click(() => {
            $('.site-header__menu-content').toggleClass('site-header__menu-content--is-visible');
        });
    }
}

export default MobileMenu2;