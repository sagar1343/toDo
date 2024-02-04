const input = document.querySelector("input");
const form = document.querySelector("#inputForm");
const ul = document.querySelector("ul");
const submitBtn = document.querySelector("#submitBtn");
let itemId = 1;

form.addEventListener("submit", (event) => createTask(event));
ul.addEventListener("click", (event) => handleListClick(event));

function createTask(event) {
  event.preventDefault();
  const li = document.createElement("li");
  li.id = `item${itemId}`;
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

function handleListClick(event) {
  const editBtn = event.target.classList.contains("edit");
  const deleteBtn = event.target.classList.contains("delete");
  if (editBtn) {
    input.focus();
    handleEdit(event.target);
  } else if (deleteBtn) {
    handleDelete(event.target);
  }
}

function handleDelete(element) {
  const deleteItem = getList(element);
  deleteItem.remove();
}

function handleEdit(element) {
  const editItem = getList(element);
  const updateBtn = document.createElement("button");
  input.value = editItem.querySelector("p").innerText;
  submitBtn.disabled = true;
  displayCrudButton(true);
  updateBtn.id = "updateBtn";
  updateBtn.innerText = "Update";
  form.appendChild(updateBtn);

  updateBtn.addEventListener("click", () =>
    handleUpdate(editItem, updateBtn, element)
  );
}

function handleUpdate(editItem, updateBtn) {
  if (input.value) {
    editItem.querySelector("p").innerText = input.value;
    input.value = "";
    submitBtn.disabled = false;
    displayCrudButton(false);
    updateBtn.remove();
  }
}

function getList(element) {
  const parent = element.closest(".listItem");
  return ul.querySelector(`#${parent.id}`);
}

function displayCrudButton(bool) {
  const crudBtns = document.querySelectorAll(".crudBtn");
  crudBtns.forEach((item) => (item.disabled = bool));
}
