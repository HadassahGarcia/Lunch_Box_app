
const express = require('express');
const app = express();
const port = 4000;
const mysql = require('mysql2');
const bcrypt = require('bcrypt');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
    database:'electron_login'
    
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database as id', connection.threadId);
});
app.post('/login', (req, res) => {
    const password = req.body.password
    const email = req.body.email 
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [email, password]
    connection.query(query,values, (err, results, fields) => {

        if (err) {
            res.status (500).json({message: 'Hubo un error con la base de datos'})
        }
        if (results.length>=1){
            res.status (200).json({message: 'Usuario autenticado correctamente'})

        }
        else{
            res.status (401).json({message: 'Contraseña o usuario incorrecto'})
        }
    });

});
6





