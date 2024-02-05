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
    <div class='taskContent'>
      <p>${input.value}</p>
    </div>
    <div class="btnContainer">
      <button id="edit${itemId}" class="crudBtn edit">Edit</button>
      <button id="update${itemId}" class="crudBtn update">Update</button>
      <button id="delete${itemId}" class="crudBtn delete">Delete</button>
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
    const taskId = convertToItemId("edit", event.target.id);
    handleEdit(taskId);
  } else if (deleteBtn) {
    const taskId = convertToItemId("delete", event.target.id);
    handleDelete(taskId);
  }
}

function handleDelete(itemId) {
  document.getElementById(itemId).remove();
}

function displayCrudButton(bool) {
  const crudBtns = document.querySelectorAll(".crudBtn");
  crudBtns.forEach((item) => (item.disabled = bool));
}

function handleEdit(itemId) {
  const item = document.getElementById(itemId);
  const popText = item.querySelector("p").innerText;
  const newInput = document.createElement("input");
  const updateBtn = item.querySelector(".update");
  item.querySelector("p").replaceWith(newInput);
  newInput.value = popText;
  newInput.focus();
  item.querySelector(".update").style.display = "block";
  item.querySelector(".edit").style.display = "none";
  submitBtn.disabled = true;
  displayCrudButton(true);
  console.log(updateBtn);
  updateBtn.disabled = false;
  updateBtn.addEventListener("click", () => handleUpdate(item));
}
function handleUpdate(item) {
  const currentInput = item.querySelector("input");
  const extractedInput = currentInput.value;
  if (extractedInput) {
    const updatedPara = document.createElement("p");
    updatedPara.innerText = extractedInput;
    currentInput.replaceWith(updatedPara);
    item.querySelector(".update").style.display = "none";
    item.querySelector(".edit").style.display = "block";
    submitBtn.disabled = false;
    displayCrudButton(false);
  }
}
function convertToItemId(typeOfbtn, btnId) {
  const numericPart = btnId.replace(`${typeOfbtn}`, "");
  const itemId = `item${numericPart}`;
  return itemId;
}
