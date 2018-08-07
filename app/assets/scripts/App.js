import MobileMenu from './modules/MobileMenu';
//import MobileMenu2 from './modules/MobileMenu2';
import RevealOnScroll from './modules/RevealOnScroll';
import $ from 'jquery';

const mobileMenu = new MobileMenu();
//const mobileMenu2 = new MobileMenu2();

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");