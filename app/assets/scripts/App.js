import MobileMenu from './modules/MobileMenu';
//import MobileMenu2 from './modules/MobileMenu2';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import $ from 'jquery';
import Modal from './modules/Modal';

const mobileMenu = new MobileMenu();
//const mobileMenu2 = new MobileMenu2();

new RevealOnScroll($(".feature-item"), "85%");
new RevealOnScroll($(".testimonial"), "60%");

const stickyHeader = new StickyHeader();

const modal = new Modal();