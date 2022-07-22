//truncate long text
const contents = document.querySelectorAll(".todo-list-item-content");

contents.forEach((text) => {
  let actualText = text.textContent.trim();

  if (actualText.length > 38) {
    let truncatedText = actualText.substr(0, 36);
    text.innerHTML = `${truncatedText} <span class="more-text">...More</span>`;

    const more_text = document.querySelector(".more-text");
    more_text.addEventListener("click", (e) => {
      e.preventDefault();
      text.innerText = `${actualText}`;
    });
  }
});
