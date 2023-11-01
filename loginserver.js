const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const path = require('path'); // Added path module
const app = express();
const port = 3000;

// Middleware to parse POST request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


const db = mysql.createConnection({
    host: 'localhost',  // Change this to your MySQL server host
    user: 'root',  // Replace with your database username
    password: 'thisismydesktop2023',  // Replace with your database password
    database: 'accounts_creation',  // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = db;

//user authrntication

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query the database to retrieve the plaintext password for the given username
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
      if (err) {
          console.error('Error in database query: ' + err);
          return res.status(500).send('Internal Server Error');
      }
      if (results.length > 0) {
          const storedPassword = results[0].password;

          if (password === storedPassword) {
              res.send('Login successful');
          } else {
              res.status(401).send('Login failed. Passwords do not match.');
          }
      } else {
          res.status(401).send('Login failed. User not found.');
      }
  });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const userId = authenticateUser(username, password);

  if (userId) {
      res.json({ success: true, userId: userId });
  } else {
      res.json({ success: false, message: 'Invalid login credentials' });
  }
});


// app.post('/login', (req, res) => {
//     const { username, password } = req.body;
  
//     function authenticateUser(username, password) {
//       // Check if the provided username exists in the user data
//       const user = users.find((user) => user.username === username);
    
//       if (user && user.password === password) {
//           // Authentication successful, return the user's ID
//           return user.id;
//       }
    
//       // Authentication failed, return null
//       return null;
//     }
  
//     // Implement your user authentication logic to verify the username and password
//     // If authentication is successful, retrieve the user's ID
//     const userId = getUserIdByUsername(username);
  
//     if (userId) {
//         // Authentication successful, send the user's ID as a response
//         checkUserQuotesAndRedirect(res, userId);
//     } else {
//         res.json({ success: false, message: 'Invalid login credentials' });
//     }
//   });
  
//   // Function to check if the user has quotes and redirect accordingly
//   function checkUserQuotesAndRedirect(res, userId) {
//     // Query the database to check if the user has generated any quotes
//     const query = 'SELECT quote FROM freight_details WHERE user_id = ?';
  
//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             console.error('Database query error: ' + err);
//             res.json({ success: false, message: 'Failed to retrieve quotes' });
//         } else {
//             if (results.length > 0) {
//                 // User has previous quotes, redirect to the quotes page
//                 res.redirect('/quotes-page.html');
//             } else {
//                 // User has no previous quotes, redirect to the create quotes page
//                 res.redirect('/freight-details.html');
                
//             }
//         }
//     });
//   }
  

// app.post('/login', (req, res) => {
//     const { username, password } = req.body;

//     // Server-side route to handle user quotes
// app.get('/user-quotes/:userId', (req, res) => {
//     const userId = req.params.userId;

//     // Query the database to check if the user has generated any quotes
//     const query = 'SELECT quote FROM freight_details WHERE user_id = ?';

//     db.query(query, [userId], (err, results) => {
//         if (err) {
//             console.error('Database query error: ' + err);
//             res.json({ success: false, message: 'Failed to retrieve quotes' });
//         } else {
//             if (results.length > 0) {
//                 // User has previous quotes, serve a page to display them
//                 res.sendFile(__dirname + '/quotes-page.html');
//             } else {
//                 // User has no previous quotes, serve a page to create quotes
//                 res.sendFile(__dirname + '/freight-details.html');
//             }
//         }
//     });
// });

// })


//retrieve user quotes

// app.get('/user-freight_details/:userId', (req, res) => {
//   const userId = req.params.userId;

//   const query = 'SELECT freight_details FROM freight_details WHERE user_id = ?';

//   db.query(query, [userId], (err, results) => {
//       if (err) {
//           console.error('Database query error: ' + err);
//           res.json({ success: false, message: 'Failed to retrieve quotes' });
//       } else {
//           const freight_details = results.map((row) => row.freight_details);
//           res.json({ success: true, freight_details: freight_details });
//       }
//   });
// });






//quotes related


// app.get('/user-freight_details/:userId', (req, res) => {
//   const userId = req.params.userId;

//   // Call a function to retrieve quotes by user ID
//   const freight_details = getQuotesByUserId(userId);

//   if (freight_details) {
//       res.json({ success: true, freight_details: freight_details });
//   } else {
//       res.json({ success: false, message: 'Failed to retrieve quotes' });
//   }
// });


// app.get('/user-freight_details/:userId', (req, res) => {
//   const userId = req.params.userId;

//   // Query the database to retrieve quotes associated with the user ID
//   const query = 'SELECT quote FROM freight_details WHERE user_id = ?';

//   db.query(query, [userId], (err, results) => {
//       if (err) {
//           console.error('Database query error: ' + err);
//           res.json({ success: false, message: 'Failed to retrieve quotes' });
//       } else {
//           // Extract the quotes from the query results
//           const freight_details = results.map((row) => row.quote);
//           res.json({ success: true, freight_details: freight_details });
//       }
//   });
// });

