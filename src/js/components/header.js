export default function initDialog(selector = ".select") {
    const selects = document.querySelectorAll(selector);

    selects.forEach(select => {
        const header = document.querySelector(".header");

        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("header_scrolled");
            } else {
                header.classList.remove("header_scrolled");
            }
        });
    });
}