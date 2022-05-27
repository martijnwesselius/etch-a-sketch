const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "#404040";
const DEFAULT_MODE = "color";

let currentSize = DEFAULT_SIZE;
let currentColor = DEFAULT_COLOR;
let currentMode = DEFAULT_MODE;

const colorPicker = document.querySelector("#color-picker");
const blackButton = document.querySelector("#color-button");
const rainbowButton = document.querySelector("#rainbow-button");
const eraserButton = document.querySelector("#eraser-button");
const clearButton = document.querySelector("#clear-button");
const sliderValue = document.querySelector("#slider-value");
const slider = document.querySelector(".slider");
const grid = document.querySelector("#grid");

colorPicker.oninput = (e) => setCurrentColor(e.target.value); 
blackButton.onclick = () => setCurrentMode("color");
rainbowButton.onclick = () => setCurrentMode("rainbow");
eraserButton.onclick = () => setCurrentMode("eraser");
clearButton.onclick = () => reloadGrid();
slider.oninput = (e) => updateSliderValue(e.target.value);
slider.onchange = (e) => changeSizeGrid(e.target.value);

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);



function setCurrentSize(newSize) {
    currentSize = newSize;
}

function setCurrentColor(newColor) {
    currentColor = newColor;
}

function setCurrentMode(newMode) {
    activateButton(newMode);
    currentMode = newMode;
}

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
    switch (currentMode) {
        case "color":
            e.target.style.backgroundColor = currentColor;
            break;
        case "rainbow":
            e.target.style.backgroundColor = getRandomColor();
            break;
        case "eraser":
            e.target.style.backgroundColor = "#E8E8E8";
            break;
    }
}

function reloadGrid() {
    grid.innerHTML = "";
    setupGrid(currentSize);
}

function changeSizeGrid(sliderValue) {
    setCurrentSize(sliderValue);
    reloadGrid();
}

function updateSliderValue(value) {
    sliderValue.textContent = `${value} x ${value}`;
}

function getRandomColor() {
    return '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0');
}

function activateButton(newMode) {
    if (currentMode === "color") {
        blackButton.classList.remove("active");
    } else if (currentMode === "rainbow") {
        rainbowButton.classList.remove("active");
    } else if (currentMode === "eraser") {
        eraserButton.classList.remove("active");
    }
    
    if (newMode === "color") {
        blackButton.classList.add("active");
    } else if (newMode === "rainbow") {
        rainbowButton.classList.add("active");
    } else if (newMode === "eraser") {
        eraserButton.classList.add("active");
    }
}

setupGrid(DEFAULT_SIZE);
activateButton(DEFAULT_MODE);