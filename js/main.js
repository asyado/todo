// find the elements
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
	tasks = JSON.parse(localStorage.getItem('tasks'));
	tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask)
tasksList.addEventListener('click', doneTask)

//fuctions

function addTask(event) {
	// cancel the form sending
	event.preventDefault();

	//take out the text
	const taskText = taskInput.value;

	const newTask = {
		id: Date.now(),
		text: taskText,
		done: false,
	};

	// add massive with tasks
	tasks.push(newTask)

	saveToLocalStorage();

	renderTask(newTask);
	


	//clear from input and focus

	taskInput.value = "";
	taskInput.focus();

	checkEmptyList();


}

function deleteTask(event) {
	//check the click was NOT on delete
	if (event.target.dataset.action !== 'delete') {
		return
	}

	//check the click on delete
		const pareNode = event.target.closest('.list-group-item');
		const id = Number(pareNode.id);
		

		// const index = tasks.findIndex((task) => task.id === id);

		// tasks.splice(index, 1)
		tasks = tasks.filter((task) => task.id !== id);

		saveToLocalStorage();
		

		//delete task from html
		pareNode.remove();

		checkEmptyList();
	
}
function doneTask(event) {
	//check if click on NOT button done
	if (event.target.dataset.action !== 'done') return

	//check if click on button done
	const parentNode = event.target.closest('.list-group-item');

	// task ID
	const id = Number(parentNode.id);
	const task = tasks.find( (task) => task.id === id);
	task.done = !task.done;

	saveToLocalStorage();

	const taskTitle = parentNode.querySelector('.task-title');
	taskTitle.classList.toggle('task-title--done');
}
function checkEmptyList() {
	if (tasks.length === 0) {
		const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
								<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
								<div class="empty-list__title">Список дел пуст</div>
							</li>`;
		tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);

	}

	if (tasks.length > 0) {
		const emptyListEl = document.querySelector('#emptyList');
		emptyListEl ? emptyListEl.remove() : null;
	}
}
function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
	//form Css class
	const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

	
	
	//add note
	const taskHTML = `
	<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
			<span class="${cssClass}">${task.text}</span>
			<div class="task-item__buttons">
				<button type="button" data-action="done" class="btn-action">
					<img src="./img/tick.svg" alt="Done" width="18" height="18">
				</button>
				<button type="button" data-action="delete" class="btn-action">
					<img src="./img/cross.svg" alt="Done" width="18" height="18">
				</button>
			</div>
	</li>`;

	//add new task to page
	tasksList.insertAdjacentHTML('beforeend', taskHTML);
}