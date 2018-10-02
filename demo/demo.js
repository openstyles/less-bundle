/* eslint-env browser */
/* global less */
const textarea = document.querySelector("textarea");
const output = document.querySelector("output");
const DEFAULT_SOURCE = `@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}`;
let timer = null;
textarea.addEventListener("input", () => {
  clearTimeout(timer);
  timer = setTimeout(update, 500);
});
textarea.addEventListener("change", () => {
  if (timer === null) {
    return;
  }
  clearTimeout(timer);
  update();
});
textarea.value = DEFAULT_SOURCE;
update();
function update() {
  timer = null;
  less.render(textarea.value)
    .then(result => {
      output.textContent = result.css;
      output.classList.remove("error");
    }, err => {
      output.textContent = String(err);
      output.classList.add("error");
    });
}
