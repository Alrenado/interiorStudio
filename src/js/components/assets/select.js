export default function initCustomSelect(selector = ".select") {
    const selects = document.querySelectorAll(selector);

    selects.forEach(select => {
        const trigger = select.querySelector(".select__trigger");
        const menu = select.querySelector(".select__menu");
        const options = select.querySelectorAll(".select__option");

        const openMenu = () => {
            select.classList.add("open");
            menu.style.maxHeight = "none";
            const fullHeight = menu.scrollHeight + "px";
            menu.style.maxHeight = "0px";
            menu.offsetHeight;
            menu.style.maxHeight = fullHeight;
        };

        const closeMenu = () => {
            menu.style.maxHeight = menu.scrollHeight + "px";
            menu.offsetHeight;

            menu.style.maxHeight = "0px";
            select.classList.remove("open");
        };

        trigger.addEventListener("click", () => {
            if (select.classList.contains("open")) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        options.forEach(option => {
            option.addEventListener("click", () => {
                trigger.textContent = option.textContent;
                closeMenu();
            });
        });

        document.addEventListener("click", (e) => {
            if (!select.contains(e.target) && select.classList.contains("open")) {
                closeMenu();
            }
        });
    });
}
