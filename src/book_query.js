const express = require('express');
const pool = require('./Database.js');

const router = express.Router();

router.get('/api/get_all_books', async function(req, res) {
    try {
      const sqlQuery = 'SELECT * FROM book'
      const rows = await pool.query(sqlQuery)
      res.status(200).json(rows);
    } catch (error) {
          console.error('Error fetching data:', error);
          res.status(500).json({ error: 'An error occurred' });
    }
})

router.get('/api/article/:id', async function(req, res) {
    const Book_id = req.params.id
    try {
        const sqlQuery = 'SELECT * FROM book WHERE Book_id=?'
        const rows = await pool.query(sqlQuery, Book_id)
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Error fetching book data', error);
        res.status(500).json({ error: 'An error occuted' });
    }
})

router.delete('/api/delete_book/:id', async function(req, res) {
    const Book_id = req.params.id
    try {
        const sqlQuery = `DELETE FROM book WHERE Book_id = ${Book_id}`
        const result = await pool.query(sqlQuery)
        if (result.affectedRows === 1) {
          res.status(201).json({ message: 'Book added successfully' });
        } else {
          res.status(500).json({ error: 'Book could not be added' });
        }
    } catch (error) {
        console.error('Error deleting book data', error);
        res.status(500).json({ error: 'An error occuted' });
    }
})

router.post('/api/add_book', async function(req, res) {
    const{  ISBN, Title, Author, Publisher, Publication_date, Edition, Summary, Genre, Price, State, FK_seller } = req.body;
    console.log(req.body)
    const sqlQuery = `INSERT INTO book (ISBN, Title, Author, Publisher, Publication_date, Edition, Summary, Genre, Price, State, FK_seller) VALUES ('${ISBN}','${Title}','${Author}','${Publisher}','${Publication_date}','${Edition}','${Summary}','${Genre}',${Price},'${State}',${FK_seller})`

    try {
        const result = await pool.query(sqlQuery);
        // Check the result to handle success or failure
        if (result.affectedRows === 1) {
          res.status(201).json({ message: 'Book added successfully' });
        } else {
          res.status(500).json({ error: 'Book could not be added' });
        }
      } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).json({ error: 'An error occurred' });
      }
    })

module.exports = router;