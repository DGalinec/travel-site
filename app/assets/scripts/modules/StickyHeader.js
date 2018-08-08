/* Purpose of the 'createHeaderWaypoint()' method is to change the background-color of the desktop */
/* menu bar to a darker blue when scrolling down so that it stays visible even on a white page. */

/* Purpose of the 'createPageSectionWaypoints()' method is to change the color of the links on the */
/* menu bar to yellow when user scrolls down to the correction section of the page. */

/* Purpose of the 'addSmoothScrolling()' method is to have a nice scrolling effect when clicking on */
/* link in the navigation menu bar. */

import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll';

class StickyHeader {
    constructor() {
        /* 'createHeaderWaypoint()' method */
        this.siteHeader = $(".site-header"); /* property that points towards the site header DOM element */
        this.headerTriggerElement = $(".large-hero__title"); /* we will draw a darker background-color menu bar when reaching this DOM element */
        this.createHeaderWaypoint();
        /* 'createPageSectionWaypoints()' method */
        this.pageSections = $(".page-section"); /* jquery selector to select all the different sections of the web site inside one variable */
        this.headerLinks = $(".primary-nav a"); /* jquery selector to select all <a> elements of the navigation menu inside one variable */
        this.createPageSectionWaypoints();
        /* 'addSmoothScrolling()' method will use the 'headerLinks' variable already created for the 'createPageSectionWaypoints()' method */
        this.addSmoothScrolling();
    }

    addSmoothScrolling() { /* we apply smooth scrolling to each navigation menu link */
        this.headerLinks.smoothScroll();
    }

    createHeaderWaypoint() {
        const that = this;
        new Waypoint({
            element: this.headerTriggerElement[0], /* Waypoint is expecting a JS native DOM element here. The first item in a jQuery array object is always a pointer to a native DOM element */
            handler: function(direction) { /* add a modifier class to the header so we can style it to use a darker background */
                if (direction == "down") {
                    that.siteHeader.addClass("site-header--dark");
                } else {
                    that.siteHeader.removeClass("site-header--dark");
                }
            }
        });
    }

    createPageSectionWaypoints() {
        const that = this;
        this.pageSections.each(function() {
            var currentPageSection = this;
            new Waypoint({ /* when scrolling down */
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == "down") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link"); /* all links are put back in white */
                        $(matchingHeaderLink).addClass("is-current-link"); /* link of current section is put in yellow */
                    }    
                },
                offset: "18%" /* Customize how early or late in the scroll a waypoint is triggered. By default 'offset' is set to 0. 0 being the top edge.  */
            });
            new Waypoint({ /* when scrolling up */
                element: currentPageSection,
                handler: function(direction) {
                    if (direction == "up") {
                        var matchingHeaderLink = currentPageSection.getAttribute("data-matching-link");
                        that.headerLinks.removeClass("is-current-link"); /* all links are put back in white */
                        $(matchingHeaderLink).addClass("is-current-link"); /* link of current section is put in yellow */
                    }    
                },
                offset: "-40%" /* Customize how early or late in the scroll a waypoint is triggered. By default 'offset' is set to 0. 0 being the top edge.  */
            });
        });
    }
}

export default StickyHeader;