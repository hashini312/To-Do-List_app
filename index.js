let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

const list = document.getElementById('list');
const sub = document.getElementById('sub');
const empty = document.getElementById('empty');
const input = document.getElementById('inp');

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render() {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        if (task.done) li.className = 'done';

        const box = document.createElement('div');
        box.className = 'box';
        box.addEventListener('click', () => toggle(index));

        const text = document.createElement('span');
        text.className = 'txt';
        text.textContent = task.text;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'del';
        deleteButton.textContent = '×';
        deleteButton.setAttribute('aria-label', 'Delete task');
        deleteButton.addEventListener('click', () => remove(index));

        li.append(box, text, deleteButton);
        list.appendChild(li);
    });

    const done = tasks.filter(task => task.done).length;
    sub.textContent = tasks.length
        ? `${done} of ${tasks.length} done`
        : 'Start adding your tasks below.';
    empty.style.display = tasks.length ? 'none' : 'block';
    save();
}

function add() {
    const text = input.value.trim();
    if (!text) return;

    tasks.unshift({ text, done: false });
    input.value = '';
    render();
}

function toggle(index) {
    tasks[index].done = !tasks[index].done;
    render();
}

function remove(index) {
    tasks.splice(index, 1);
    render();
}

input.addEventListener('keydown', event => {
    if (event.key === 'Enter') add();
});

render();
