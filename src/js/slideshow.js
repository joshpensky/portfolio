var selector,
    slideList,
    showThumbs = true,
    slideContainer,
    selectorStartPos,
    rightPadding,
    selected;

window.addEventListener("load", () => {
    selector = document.getElementById('selector');
    slideList = document.querySelector('.slide-list');
    if (slideList.getElementsByTagName('li').length < 2) {
        showThumbs = false;
        slideList.classList.add("slide-list--hidden");
    } else {
        slideContainer = document.querySelector('.slide-container');
        rightPadding = document.getElementsByClassName('slide__item')[0];
        rightPadding = window.getComputedStyle(rightPadding).marginRight.split("px")[0];
        slideList.addEventListener("scroll", () => { listScrolled(); });
        selectorStartPos = slideList.getBoundingClientRect().left;
        selected = document.querySelector('.slide__item--selected');
        listScrolled();
    }
});

window.addEventListener("resize", () => {
    if (showThumbs) {
        selectorStartPos = slideList.getBoundingClientRect().left;
        listScrolled();
        selectItem(selected);
    }
});

function listScrolled() {
    if (slideList.scrollLeft > 0) {
        slideContainer.classList.add("slide-container--left");
    } else {
        slideContainer.classList.remove("slide-container--left");
    }
    if ((slideList.offsetWidth + slideList.scrollLeft) >= slideList.scrollWidth) {
        slideContainer.classList.remove("slide-container--right");
    } else {
        slideContainer.classList.add("slide-container--right");
    }
    showIndicator();
}

function showIndicator() {
    var position = getSelectorPos();
    var selectorWidth = parseInt(window.getComputedStyle(selector).width.split("px")[0]);
    var indicLeft = document.querySelector('.slide-container__indicator--left');
    var indicRight = document.querySelector('.slide-container__indicator--right');
    if (slideList.scrollLeft > (position + selectorWidth)) {
        indicLeft.classList.remove('slide-container__indicator--hidden');
    } else {
        indicLeft.classList.add('slide-container__indicator--hidden');
    }
    if (position > (slideList.scrollLeft + slideList.offsetWidth)) {
        indicRight.classList.remove('slide-container__indicator--hidden');
    } else {
        indicRight.classList.add('slide-container__indicator--hidden');
    }
}

function getSelectorPos() {
    if (selector.style.transform == "") {
        return 0;
    }
    return parseInt(selector.style.transform.split("translateX(")[1].split("px)")[0]);
}

function selectItem(elem) {
    var viewer = document.querySelector("#viewer");
    viewer.style.backgroundImage = elem.style.backgroundImage;
    if (elem != selected) {
        selected.classList.remove("slide__item--selected");
    }
    elem.classList.add("slide__item--selected");
    selected = elem;
    selector.style.transform = "translateX("
    + ((elem.getBoundingClientRect().left + slideList.scrollLeft) - selectorStartPos) + "px)";
    showIndicator();
}
