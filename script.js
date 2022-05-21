const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "red";

let currentColor = DEFAULT_COLOR;

const grid = document.querySelector("#grid");

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

function setupGrid(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    for (let i = 0; i < size * size; i++) {
        const gridElement = document.createElement('div');
        gridElement.classList.add("grid-element");
        gridElement.addEventListener("mouseover", changeColor);
        gridElement.addEventListener("mousedown", changeColor);
        grid.appendChild(gridElement);
    }
}

function changeColor(e) {
    if (e.type === 'mouseover' && !mouseDown) return
    e.target.style.backgroundColor = currentColor;
}

setupGrid(DEFAULT_SIZE)