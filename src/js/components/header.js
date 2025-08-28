export default function initHeader() {
    const header = document.querySelector(".header");
    const burger = document.querySelector(".header__burger");
    const menu = document.querySelector(".header__menu");
    const body = document.body;

    if (!header || !burger || !menu) return;

    window.addEventListener("scroll", () => {
        header.classList.toggle("header_scrolled", window.scrollY > 50);
    });

    burger.addEventListener("click", () => {
        burger.classList.toggle("open");
        menu.classList.toggle("open");
        body.classList.toggle("no-scroll");
    });
}
