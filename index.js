const tagContainer = document.querySelector(".tag-container");

const input = document.querySelector(".tag-container input");

const container = document.querySelector(".container");

let tags = [];

if (localStorage.getItem("tags")) {
  tags = JSON.parse(localStorage.getItem("tags"));
  addTag();
}

function createTag(label) {
  const div = document.createElement("div");
  div.setAttribute("class", "tag");
  const span = document.createElement("span");
  span.innerHTML = label;
  const closeBtn = document.createElement("i");
  closeBtn.setAttribute("class", "material-icons");
  closeBtn.setAttribute("data-item", label);
  closeBtn.innerHTML = "close";

  div.appendChild(span);
  div.appendChild(closeBtn);
  return div;
}

function reset() {
  document.querySelectorAll(".tag").forEach(function (tag) {
    tag.parentElement.removeChild(tag);
  });
}

function addTag() {
  reset();
  tags
    .slice()
    .reverse()
    .forEach(function (tag) {
      const input = createTag(tag);
      tagContainer.prepend(input);
    });
}

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    tags.push(input.value);
    addTag();
    input.value = "";
  }
  localStorage.setItem("tags", JSON.stringify(tags));
});

document.addEventListener("click", function (e) {
  if (e.target.tagName === "I") {
    const value = e.target.getAttribute("data-item");
    const index = tags.indexOf(value);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    localStorage.setItem("tags", JSON.stringify(tags));
    addTag();
  }
});
