const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

app.use(express.static(__dirname)); // Serve static files from the project directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
  res.sendFile(__dirname + '/create-account.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//database


const db = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL host (e.g., 'localhost' for a local server)
  user: 'root', // Replace with your MySQL username
  password: 'thisismydesktop2023', // Replace with your MySQL password
  database: 'accounts_creation', // Replace with the name of your MySQL database
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

// Sample query to retrieve data from the "users" table
db.query('SELECT * FROM users', (err, results, fields) => {
  if (err) {
    console.error('Error executing the query:', err);
    return;
  }
  console.log('Query results:', results);
});

// Close the database connection when your application exits
process.on('exit', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    }
  });
});



app.use(express.static(__dirname));

app.use(express.json()); // Parse JSON request bodies

app.post('/register', (req, res) => {
  const { username, email, password } = req.body;


  // Insert the user data into the database (you'll need to use your database library here)
  const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  const values = [username, email, password];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Database insertion error:', err);
      res.status(500).send('Error registering user.');
    } else {
      console.log('User registered:', username);
      res.status(200).send('User registered successfully.');
    }
  });
});

























