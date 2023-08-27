const express = require('express');
const pool = require('./Database.js');

const router = express.Router();

// get all users from the user table
router.get('/api/get_all_users', async function(req, res) {
    try {
      const sqlQuery = 'SELECT * FROM users'
      const rows = await pool.query(sqlQuery)
      res.status(200).json(rows);
    } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'An error occurred' });
    }
})

router.get('/api/get_user_by_id:id', async function(req, res) {
  const User_id = req.params.id;
  try {
    const sqlQuery = `SELECT * FROM users WHERE
    User_id =${req.params.id}`
    const rows = await pool.query(sqlQuery)
    res.status(200).json(rows[0]);
  } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'An error occurred' });
  }
})

router.post('/api/add_user', async function(req, res) {
  try {
    const { Password, Mail_address, Firstname, Lastname, Street_name, House_number, Zipcode, State } = req.body;
    
    // Insert user into the "users" table
    const sqlQuery = 'INSERT INTO users (Password, Mail_address) VALUES (?, ?)';
    const result = await pool.query(sqlQuery, [Password, Mail_address]);
    
    if (result.affectedRows !== 1) {
      return res.status(500).json({ error: 'User could not be added' });
    }
    
    // Get the User_id of the added user
    const sqlQuery2 = 'SELECT User_id FROM users WHERE Mail_address=?';
    const rows = await pool.query(sqlQuery2, [Mail_address]);
    
    if (!rows || rows.length === 0) {
      return res.status(400).send('User not found');
    }
    
    const User_id = rows[0].User_id;

    const sqlQuery6 = `INSERT INTO adress (Firstname, Lastname, Street_name, House_number, Zipcode, State, fk_user_id) VALUES 
    (${Firstname},
     ${Lastname},
     ${Street_name}, 
     ${House_number},
     ${Zipcode}, 
     ${State}, 
     ${User_id})`
    const Result2 = await pool.query(sqlQuery6);
    
    if (Result2.affectedRows !== 1) {
      return res.status(500).json({ error: 'User_adress could not be added' });
    }
    
    // Insert into "watchlist" table
    const sqlQuery3 = 'INSERT INTO watchlist (watchlistid, FK_user) VALUES (?, ?)';
    const watchlistResult = await pool.query(sqlQuery3, [User_id, User_id]);
    
    if (watchlistResult.affectedRows !== 1) {
      return res.status(500).json({ error: 'User_watchlist could not be added' });
    }
    
    res.status(201).json({ message: 'User and user_watchlist added successfully' });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});


router.post('/api/delete_user:id', async function(req, res) {
  try {
    const User_id = req.params.id;
    
    // Delete user from user table
    const sqlQuery = 'DELETE * FROM users WHERE User_id=?';
    const result = await pool.query(sqlQuery, User_id);
    
    if (result.affectedRows !== 1) {
      return res.status(500).json({ error: 'User could not be deleted' });
    }
    
    // delete from watchlist
    const sqlQuery2 = 'DELETE * FROM watchlist WHERE FK_user=?';
    const watchlistResult = await pool.query(sqlQuery2, User_id);
    
    if (watchlistResult.affectedRows !== 1) {
      return res.status(500).json({ error: 'User_watchlist could not be Deleted' });
    }

    //delete watchpositions
    const sqlQuery3 = 'DELETE * FROM watchposition WHERE FK_watchlist=?';
    pool.query(sqlQuery3, User_id);

    // no check possible since watchlist can be empty for the user

    //delete books of user
    const sqlQuery4 = 'DELETE * FROM book WHERE FK_seller=?';
    pool.query(sqlQuery4, User_id);

    // no check possible since books can be empty for the user

    //delete adress of user 
    const sqlQuery5 = 'DELETE * FROM adress WHERE fk_user_id=?';
    pool.query(sqlQuery5, User_id);

    // no check possible since adress can be empty for the user
    
    res.status(201).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});








module.exports = router;
