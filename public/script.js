
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const strokeWidthSlider = document.getElementById('strokeWidth'); // Added stroke width slider reference

// Set canvas dimensions based on the device's width and height
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let drawing = false;
let currentColor = '#ff0000'; // Default color
let currentStrokeWidth = 5; // Default stroke width
const socket = io();

// Function to handle the start of drawing
const startDrawing = (x, y) => {
    drawing = true;
    ctx.beginPath();
    ctx.moveTo(x, y);
};

// Function to handle the drawing process
const draw = (x, y) => {
    if (!drawing) return;

    ctx.lineWidth = currentStrokeWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Emit the drawing data to the backend server
    socket.emit('drawing', { x, y, color: currentColor, strokeWidth: currentStrokeWidth });
};

// Event listeners for mouse and touch events
canvas.addEventListener('mousedown', (e) => startDrawing(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top));
canvas.addEventListener('mouseup', () => { drawing = false; ctx.closePath(); });
canvas.addEventListener('mousemove', (e) => draw(e.clientX - canvas.getBoundingClientRect().left, e.clientY - canvas.getBoundingClientRect().top));

// Touch events for mobile support
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    startDrawing(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    e.preventDefault(); // Prevent scrolling
});
canvas.addEventListener('touchend', () => { drawing = false; ctx.closePath(); });
canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    draw(touch.clientX - canvas.getBoundingClientRect().left, touch.clientY - canvas.getBoundingClientRect().top);
    e.preventDefault(); // Prevent scrolling
});

// Listen for drawing events from other users
socket.on('drawing', (data) => {
    const { x, y, color, strokeWidth } = data;
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = color;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
});

// Clear the canvas for the current user when they click the "Clear" button
clearButton.addEventListener('click', () => {
    // Clear the canvas for the current user
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Change the color of the drawing based on the color picker
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});

// Update the stroke width based on the slider
strokeWidthSlider.addEventListener('input', (e) => {
    currentStrokeWidth = parseInt(e.target.value, 10); // Ensure stroke width is an integer
});
