export default function initCustomSelect(selector = ".select") {
    const selects = document.querySelectorAll(selector);

    selects.forEach(select => {
        const trigger = select.querySelector(".select__trigger");
        const menu = select.querySelector(".select__menu");
        const options = [...select.querySelectorAll(".select__option")];

        const transitionDurations = window.getComputedStyle(menu).transitionDuration.split(", ");
        const transitionProperties = window.getComputedStyle(menu).transitionProperty.split(", ");

        const heightTransitionIndex = transitionProperties.indexOf("height");

        let duration = transitionDurations[heightTransitionIndex];
        let timeout = null;

        if (duration.includes("ms")) {
            duration = parseFloat(duration.replace("ms", ""));
        }
        else if (duration.includes("s")){
            duration = parseFloat(duration.replace("s", "")) * 1000;
        }
        else {
            console.log("error")
            duration = 300;
        }

        const openMenu = () => {

            menu.style.height = "auto";
            const fullHeight = menu.scrollHeight;
            menu.style.height = "0";

            requestAnimationFrame(() => {
                select.classList.add("open");
                menu.style.height = fullHeight + "px";
            });
        };

        const closeMenu = () => {
            menu.style.height = "0";
            timeout = setTimeout(() => {
                select.classList.remove("open");
            }, duration)
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
