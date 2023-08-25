const express = require('express');
const pool = require('./Database.js');

const router = express.Router();


router.get('/api/add_book_watchlist', async function(req, res) {
    const {watchlist_id, book_id} = req.body;
    const sqlQuery = 'INSERT INTO watchlist (fk_watchlist, fk_book_id ) VALUES (?, ?)'
    const values = [
        watchlist_id,
        book_id
    ];
    try {
        const result = await pool.query(sqlQuery, values);
        // Check the result to handle success or failure
        if (result.affectedRows === 1) {
          res.status(201).json({ message: 'Book added successfully to watchlist' });
        } else {
          res.status(500).json({ error: 'Book could not be added' });
        }
      } catch (error) {
        console.error('Error adding book to watchlist:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
})

router.get('/api/delete_book_watchlist:id', async function(req, res) {
    const Position_id = req.params.id
    try {
        const sqlQuery = 'DELETE * FROM watchlist WHERE Position_id=?'
        const result = await pool.query(sqlQuery, Position_id)
        if (result.affectedRows !== 1) {
            return res.status(500).json({ error: 'User could not be deleted' });
          }
    } catch (error) {
        console.error('Error deleting book from watchlist', error);
        res.status(500).json({ error: 'An error occuted' });
    }
})

router.get('/api/get_watchlist_of_user:id', async function(req, res) {
    const Position_id = req.params.id
    try {
        const sqlQuery = 'select * FROM watchlist WHERE fk_watchlist=?'
        const rows = await pool.query(sqlQuery, Position_id)
        res.status(200).json(rows);
    } catch (error) {
        console.error('Error deleting book from watchlist', error);
        res.status(500).json({ error: 'An error occuted' });
    }
})

