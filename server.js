const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const crypto = require('crypto');

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'thisismydesktop2023',
  database: 'accounts_creation',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

// User Registration
app.post('/register', (req, res) => {
  const { username, email, password} = req.body;

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

app.use(express.static(__dirname));

app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the user exists and the password is correct
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
        if (err) {
            console.error("Error in database query: " + err);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }

        if (results.length > 0) {
            const storedPassword = results[0].password;

            if (password === storedPassword) {
                res.status(200).json({ success: true, message: "Login successful" });
            } else {
                res.status(401).json({ success: false, message: "Login failed. Passwords do not match." });
            }
        } else {
            res.status(401).json({ success: false, message: "Login failed. User not found." });
        }
    });
});



// Function to generate a random 10-character alphanumeric code
function generateTrackingCode() {
  const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let code = '';
  for (let i = 0; i < 10; i++) {
    const randomIndex = crypto.randomInt(0, characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}

// Submit Quote
app.post('/submit-quote', (req, res) => {
  const quoteData = req.body; // Get quote details from the request

  // Insert the quote details into the database
  const insertQuery = 'INSERT INTO freight_details (senders_name, Origin, origin_state, origin_zip_code,  recievers_name, recievers_phone_number, recievers_email, destination, destination_state, destination_zip_code, package_name, package_type,  package_weight, package_demension, package_number, tracking_code, package_password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

  // Generate a unique 10-character tracking code
  const trackingCode = generateTrackingCode();

  db.query(insertQuery, [quoteData.senders_name, quoteData.origin, quoteData.origin_state, quoteData.origin_zip_code, quoteData.recievers_name, quoteData.recievers_phone_number, quoteData.recievers_email, quoteData.destination, quoteData.destination_state, quoteData.destination_zip_code, quoteData.package_name, quoteData.package_type, quoteData.package_weight, quoteData.package_demension, quoteData.package_number, trackingCode, quoteData.package_password], (err, result) => {
    if (err) {
      console.error('Error inserting quote:', err);
      res.json({ success: false, message: 'Failed to submit quote' });
    } else {
      res.json({ success: true, trackingCode });
      console.log('Added new quote');
    }
  });
});

// Retrieve Quote
app.post('/retrieve-quote', (req, res) => {
  const { tracking_code, package_password } = req.body; // Get tracking code and package_password

  // Query the database to retrieve the quote details
  const quoteQuery = 'SELECT * FROM freight_details WHERE tracking_code = ? AND package_password = ?';

  db.query(quoteQuery, [tracking_code, package_password], (err, quoteResults) => {
    if (err) {
      console.error('Error retrieving quote:', err);
      return res.json({ success: false, message: 'Failed to retrieve quote' });
    }

    if (quoteResults.length === 0) {
      return res.json({ success: false, message: 'Quote not found or password incorrect' });
    }

    const quote = quoteResults[0];
    return res.json({ success: true, quote });
  });
});






// app.post('/retrieve-quote', (req, res) => {
//   const { trackingCode, password } = req.body;

//   const quoteQuery = 'SELECT * FROM freight_details WHERE tracking_code = ?';
//   db.query(quoteQuery, [trackingCode], (err, quoteResults) => {
//     if (err) {
//       console.error('Error retrieving quote:', err);
//       return res.json({ success: false, message: 'Failed to retrieve quote' });
//     }

//     if (quoteResults.length === 0) {
//       return res.json({ success: false, message: 'Quote not found' });
//     }

//     const quote = quoteResults[0];

//     const userQuery = 'SELECT password FROM users WHERE username = ?';
//     db.query(userQuery, [quote.senders_name], (err, userResults) => {
//       if (err) {
//         console.error('Error retrieving user password:', err);
//         return res.json({ success: false, message: 'Failed to retrieve user password' });
//       }

//       if (userResults.length === 0) {
//         return res.json({ success: false, message: 'User not found' });
//       }

//       const storedPassword = userResults[0].password;

//       if (password !== storedPassword) {
//         return res.json({ success: false, message: 'Incorrect password' });
//       }

//       return res.json({ success: true, quote });
//     });
//   });
// });
