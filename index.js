let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	const savedTasks = localStorage.getItem("toDoList");

	if (savedTasks) {
		return JSON.parse(savedTasks);
	}

	return items;
}

function saveTasks(tasks) {
	localStorage.setItem("toDoList", JSON.stringify(tasks));
}

function getTasksFromDOM() {
	const tasksElements = document.querySelectorAll(".to-do__item-text");
	const tasks = [];

	tasksElements.forEach(task => {
		tasks.push(task.textContent);
	});

	return tasks;
}

function createItem(item) {
	const template = document.querySelector("#to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
	const textElement = clone.querySelector(".to-do__item-text");
	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
	const editButton = clone.querySelector(".to-do__item-button_type_edit");
	textElement.textContent = item;

	deleteButton.addEventListener("click", () => {
		clone.remove();
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	duplicateButton.addEventListener("click", () => {
		const itemName = textElement.textContent;
		const newItem = createItem(itemName);

		listElement.prepend(newItem);

		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	editButton.addEventListener("click", () => {
		textElement.setAttribute("contenteditable", "true");
		textElement.focus();
	});

	textElement.addEventListener("blur", () => {
		textElement.setAttribute("contenteditable", "false");
		const currentTasks = getTasksFromDOM();
		saveTasks(currentTasks);
	});

	return clone;
}

formElement.addEventListener("submit", (evt) => {
	evt.preventDefault();
	const newTaskText = inputElement.value;
	const newItemElement = createItem(newTaskText);

	listElement.prepend(newItemElement);
	inputElement.value = "";

	items = getTasksFromDOM();
	saveTasks(items);
});

items = loadTasks();

items.forEach((task) => {
	const taskElement = createItem(task);
	listElement.append(taskElement);
});

