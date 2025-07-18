# music-api-vanilla-node
A simple music API built using Node.js without Express

## 🎵 Music API with Node.js (No Express)
This project is a simple RESTful API for managing music data, built entirely using vanilla Node.js without relying on any external frameworks like Express. It demonstrates core backend concepts such as routing, CRUD operations, and file-based data persistence.

The project structure is clean and modular, featuring separate folders for controllers, models, and routes. Data is stored locally in a JSON file (db.json), and the server is started from server.js. Package metadata and dependencies are managed with package.json and package-lock.json. A .gitignore file is included to exclude unnecessary files like node_modules.

## Features include:
Full CRUD (Create, Read, Update, Delete) operations for music items
Usage of Node.js core modules only, providing a lightweight and framework-free experience
Organized codebase with clear separation of concerns

## How to run the project:
Clone the repository to your local machine
Navigate into the project directory
Run npm install to install dependencies (if any)
Start the server with node server.js
Access the API at http://localhost:3000 using a browser or tools like Postman

## API endpoints:
GET /musics — retrieve all music items
GET /musics/:id — retrieve a single music item by ID
POST /musics — add a new music item
PUT /musics/:id — update an existing music item
DELETE /musics/:id — delete a music item

## Future improvements planned:
Adding input validation and sanitization for better security
Enhancing error handling for more robust responses
Implementing authentication and authorization
Migrating data storage to a database like MongoDB
Writing automated tests for API endpoints

This project serves as a practical learning tool to deepen understanding of Node.js backend fundamentals and to build confidence in creating APIs without external frameworks.

Happy coding! 
