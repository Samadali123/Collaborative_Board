
// const express = require('express');
// const http = require('http');
// const { Server } = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// // Serve the static files from the "public" folder
// app.use(express.static('public'));

// // Handle the socket connection
// io.on('connection', (socket) => {
//     console.info('New client connected');
    
//     // Handle the drawing event
//     socket.on('drawing', (data) => {
//         // Broadcast the drawing data to all other connected clients
//         socket.broadcast.emit('drawing', data);
//     });

//     // Handle the clear canvas event for a specific user
//     socket.on('clearCanvas', () => {
//         // Emit the clear canvas event only to the client that triggered it
//         socket.emit('clearCanvas');
//     });

//     // Handle the disconnect event
//     socket.on('disconnect', () => {
//         console.info('Client disconnected');
//     });
// });

// // Start the server
// server.listen(3000, () => {
//     console.info('Server running on http://localhost:3000');
// });



const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve the static files from the "public" folder
app.use(express.static('public'));

// Handle the socket connection
io.on('connection', (socket) => {
    console.info('New client connected');
    
    // Handle the drawing event
    socket.on('drawing', (data) => {
        // Broadcast the drawing data to all other connected clients
        socket.broadcast.emit('drawing', data);
    });

    // Handle the clear canvas event
    socket.on('clearCanvas', () => {
        // Broadcast the clear canvas event to all connected clients
        io.emit('clearCanvas');
    });

    // Handle the disconnect event
    socket.on('disconnect', () => {
        console.info('Client disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.info('Server running on http://localhost:3000');
});
