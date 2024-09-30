-- Active: 1723129350884@@127.0.0.1@3306@electron_login
SELECT password, email
FROM users 
WHERE email = 'test@gmail.com' AND password = 'test123'