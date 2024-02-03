const input = document.querySelector("input");
const form = document.querySelector("#inputForm");
const ul = document.querySelector("ul");
const submitBtn = document.querySelector("#submitBtn");
let itemId = 1;

form.addEventListener("submit", (event) => handleSubmit(event));
ul.addEventListener("click", (event) => {
  const editBtn = event.target.classList.contains("edit");
  const deleteBtn = event.target.classList.contains("delete");
  if (editBtn) {
    console.log("e");
    handleEdit(event.target);
  } else if (deleteBtn) {
    handleDelete(event.target);
  }
});

function handleSubmit(event) {
  event.preventDefault();
  const li = document.createElement("li");
  li.id = itemId;
  li.classList.add("listItem");
  li.innerHTML = `
  <div class="listBody">
    <p>${input.value}</p>
    <div>
      <button class="crudBtn edit">Edit</button>
      <button class="crudBtn delete">Delete</button>
    </div>
  </div>`;
  ul.appendChild(li);
  input.value = "";
  itemId++;
}

function handleDelete(element) {
  const deleteItem = getListIndex(element);
  deleteItem.remove();
}

function handleEdit(element) {
  const editItem = getList(element);
  const updateBtn = document.createElement("button");
  input.value = editItem.querySelector("p").innerText;
  submitBtn.style.display = "none";
  updateBtn.id = "updateBtn";
  updateBtn.innerText = "Update";
  form.appendChild(updateBtn);

  updateBtn.addEventListener("click", () => handleUpdate(editItem, updateBtn));
}

function handleUpdate(editItem, updateBtn) {
  editItem.querySelector("p").innerText = input.value;
  input.value = "";
  submitBtn.style.display = "block";
  updateBtn.remove();
}

function getList(element) {
  const parent = element.closest(".listItem");
  return document.getElementById(parent.id);
}
