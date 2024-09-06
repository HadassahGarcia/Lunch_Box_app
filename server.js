
const express = require('express');
const app = express();
const port = 4000;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.json({'message':'Hola'})
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// Configuración de la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    connectTimeout: 10000,
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id', connection.threadId);
});






