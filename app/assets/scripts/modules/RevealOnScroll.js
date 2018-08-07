import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';

/* Add an effect that load features when scrolling down */
class RevealOnScroll {
    constructor(els, offset) { /* the constructor method is ran immediately once when page load */
        this.itemsToReveal = els;
        this.offsetPercentage = offset; /* 'offset' variable is used in 'createWaypoints' method, so it must be declared before it */
        this.hideInitially(); /* we hide the features menu immediately at page load */
        this.createWaypoints(); /* we run this method as soon as the page load */
    }

    hideInitially() {
        this.itemsToReveal.addClass("reveal-item"); /* .reveal-item { opacity: 0; } in _reveal-item.css */
    }

    createWaypoints() {
        let that = this; /* points to the instance of 'RevealOnScroll' */
        /* we create a waypoint for each of 4 feature items */
        this.itemsToReveal.each(function() { /* everything we include here will run once for each element */
            var currentItem = this; /* 'this' points towards the current DOM element being looped to */
                
            new Waypoint({
                element: currentItem, /* element: DOM element we want to watch for as we scroll down the page */
                handler: function() { /* handler: what we want to happen when that element is scrolled to */
                    $(currentItem).addClass("reveal-item--is-visible");
                },
                offset: that.offsetPercentage /* customize waypoint to trigger its handler a bit earlier */
            });
        });
    }
}

export default RevealOnScroll;