const form = document.querySelector(".mock-form");
const statusLine = document.querySelector(".form-status");

if (form && statusLine) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    statusLine.textContent =
      "Preview only: connect this form to Slater Heating's preferred contact method after approval.";
  });
}
