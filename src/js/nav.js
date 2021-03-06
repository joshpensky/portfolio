var lastPos = 0,
    hidden = false;

/**
* Sets the last position to the window's current y-position on load.
*/
window.addEventListener("load", () => {
    lastPos = window.scrollY;
    var navBar = document.querySelector("nav");
    setTimeout(() => {navBar.classList.add("animate");}, 100);
});

/**
* Manipulates the hidden variable on scroll based on vertical scroll position.
* @see {@link navHider}
* @see {@link navOverlay}
*/
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        hidden = (lastPos < window.scrollY);
        lastPos = window.scrollY;
    } else {
        hidden = false;
    }
    navHider();
    navOverlay();
});

/**
* Hides the nav bar if the hidden variable is true, or shows if false;
*/
function navHider() {
    var navBar = document.querySelector("nav");
    if (hidden) {
        navBar.classList.add("nav--hidden");
    } else {
        navBar.classList.remove("nav--hidden");
    }
}

/**
* Adds the overlay class to the nav bar if the Y-scroll is greater than 50,
* or removes it if less/equal to.
*/
function navOverlay() {
    var navBar = document.querySelector("nav");
    if (window.scrollY > 50) {
        navBar.classList.add("nav--overlay");
    } else {
        navBar.classList.remove("nav--overlay");
    }
}
