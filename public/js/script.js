// Script To show Password in the ACCOUNT REGISTRATION VIEW

// 1. The button and password input field
const passwordButton = document.querySelector("#pwsBtn");

// Only run the code if the button is found on the current page
if (passwordButton) {
    const passwordInput = document.querySelector("#accountPassword");

    // 2. Adding a 'click' event listener to the button
    passwordButton.addEventListener("click", function() {
        // 3. Check what the current type is
        const type = passwordInput.getAttribute("type");
        // 4. Toggle the type
        if (type === "password") {
            passwordInput.setAttribute("type", "text");
            this.textContent = "Hide Password";
        } else {
            passwordInput.setAttribute("type", "password");
            this.textContent = "Show Password";
        }
    });
}
