export default function initInput(selector = ".select") {
    const selects = document.querySelectorAll(selector);

    selects.forEach(select => {
        document.querySelectorAll(".input_text, .input_tel, .input_search, .input_email").forEach(input => {
            const status = input.nextElementSibling; // span рядом

            function validate() {
                if (input.checkValidity()) {
                    status.classList.add("valid");
                    status.classList.remove("invalid");
                } else {
                    status.classList.add("invalid");
                    status.classList.remove("valid");
                }
            }

            input.addEventListener("input", validate);
            input.addEventListener("blur", validate);
        });
    });
}
