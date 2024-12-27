// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');

// canvas.width = window.innerWidth*0.8;
// canvas.height = window.innerHeight*0.8;

// //We now need to handle the mouse event

// let drawing = false;
// const socket = io();

// canvas.addEventListener('mousedown', ()=>{
//     drawing = true;
//     ctx.beginPath();
// })

// canvas.addEventListener('mouseup', ()=>{
//    drawing = false;
//    ctx.closePath();
// })

// canvas.addEventListener('mousemove', (e)=>{
//     if(!drawing) return ;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.lineWidth = 8;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = "red"
//     ctx.lineTo(x,y);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(x,y)

//     //Emit the drawing data to the backend server
//     socket.emit('drawing', {x,y});
// })

// //Integration of the socket.io data
// socket.on('drawing', (data)=>{
//     const {x,y} = data;
//     ctx.lineWidth = 5;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = "black"

//     ctx.lineTo(x,y);
//     ctx.stroke();

//     ctx.beginPath();
//     ctx.moveTo(x,y)
// })









// const canvas = document.getElementById('canvas');
// const ctx = canvas.getContext('2d');
// const colorPicker = document.getElementById('colorPicker');
// const clearButton = document.getElementById('clearButton');

// canvas.width = window.innerWidth * 0.8;
// canvas.height = window.innerHeight * 0.8;

// let drawing = false;
// let currentColor = 'red'; // Default color
// const socket = io();

// canvas.addEventListener('mousedown', () => {
//     drawing = true;
//     ctx.beginPath();
// });

// canvas.addEventListener('mouseup', () => {
//     drawing = false;
//     ctx.closePath();
// });

// canvas.addEventListener('mousemove', (e) => {
//     if (!drawing) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     ctx.lineWidth = 8;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = currentColor;
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(x, y);

//     // Emit the drawing data to the backend server
//     socket.emit('drawing', { x, y, color: currentColor });
// });

// // Listen for drawing events from other users
// socket.on('drawing', (data) => {
//     const { x, y, color } = data;
//     ctx.lineWidth = 5;
//     ctx.lineCap = 'round';
//     ctx.strokeStyle = color;

//     ctx.lineTo(x, y);
//     ctx.stroke();
//     ctx.beginPath();
//     ctx.moveTo(x, y);
// });

// // Listen for clear canvas event (clear only the user's own canvas)
// socket.on('clearCanvas', () => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

// // Clear the canvas for the current user when they click the "Clear" button
// clearButton.addEventListener('click', () => {
//     // Emit the clear canvas event to the server
//     socket.emit('clearCanvas');
//     // Clear the canvas for the current user
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

// // Change the color of the drawing based on the color picker
// colorPicker.addEventListener('input', (e) => {
//     currentColor = e.target.value;
// });





const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const clearButton = document.getElementById('clearButton');
const strokeWidthSlider = document.getElementById('strokeWidth');
const strokeWidthValue = document.getElementById('strokeWidthValue');

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let drawing = false;
let currentColor = 'red'; // Default color
let currentStrokeWidth = strokeWidthSlider.value; // Default stroke width
const socket = io();

// Update the stroke width display when the slider is changed
strokeWidthSlider.addEventListener('input', (e) => {
    currentStrokeWidth = e.target.value;
    strokeWidthValue.textContent = currentStrokeWidth;
});

canvas.addEventListener('mousedown', () => {
    drawing = true;
    ctx.beginPath();
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = currentStrokeWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);

    // Emit the drawing data (x, y, color, and strokeWidth) to the backend server
    socket.emit('drawing', { x, y, color: currentColor, strokeWidth: currentStrokeWidth });
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

// Listen for clear canvas event (clear only the user's own canvas)
socket.on('clearCanvas', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Clear the canvas for the current user when they click the "Clear" button
clearButton.addEventListener('click', () => {
    // Emit the clear canvas event to the server
    socket.emit('clearCanvas');
    // Clear the canvas for the current user
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Change the color of the drawing based on the color picker
colorPicker.addEventListener('input', (e) => {
    currentColor = e.target.value;
});
