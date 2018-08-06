import $ from 'jquery';

class MobileMenu {
    constructor() {
        this.siteHeader = $(".site-header");
        this.menuIcon = $(".site-header__menu-icon");
        this.menuContent = $('.site-header__menu-content');
        this.events();
        
        /*
        $(".site-header__menu-icon").click(() => {
            console.log('Hurray the icon was clicked!');
        });
        */
    }

    events() {
        this.menuIcon.click(this.toggleTheMenu.bind(this));
    }

    toggleTheMenu() {
        /* display or hide the navigation menu for mobile devices */
        this.menuContent.toggleClass('site-header__menu-content--is-visible');
        /* display a blue background in the navigation menu for mobile devices */
        this.siteHeader.toggleClass('site-header--is-expanded');
        /* change the 'hamburger' menu on mobile devices into a 'X' */
        this.menuIcon.toggleClass('site-header__menu-icon--close-x');
    }
}

export default MobileMenu;