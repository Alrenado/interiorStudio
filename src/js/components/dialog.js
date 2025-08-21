export default function initDialog(selector = ".select") {
    const selects = document.querySelectorAll(selector);
    console.log(selects);

    selects.forEach(select => {
        const anyBtn = document.querySelector(".button-container__button_modal");
        const anyDialog = document.querySelector("[closedby='any']");
        const closeBtn = document.querySelectorAll(".close");

        anyBtn.addEventListener("click", () => {
            anyDialog.showModal();
        });

        closeBtn.forEach((btn) => {
            btn.addEventListener("click", () => {
                btn.parentElement.close();
            });
        });
    })
}

