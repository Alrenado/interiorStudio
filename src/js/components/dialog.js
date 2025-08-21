export default function initDialog(selector = ".select") {
    const selects = document.querySelectorAll(selector);
    console.log(selects);

    selects.forEach(select => {
        const anyBtn = document.querySelector(".button-container__button_modal");
        const anyDialog = document.querySelector("[closedby='any']");
        const closeBtn = document.querySelector(".dialog__button-container");

        anyBtn.addEventListener("click", () => {
            anyDialog.showModal();
        });

        closeBtn.addEventListener("click", () => {
            const dialog = closeBtn.closest("dialog");
            if (dialog) dialog.close();
        });
    });
}