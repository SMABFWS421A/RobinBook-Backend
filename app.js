const express = require('express');
const usersRouter = require('./src/user_query.js');
const books_allRouter = require('./src/book_query.js');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Attach routers
app.use(usersRouter); 
app.use(books_allRouter)

// Root route
app.get('/', (request, response) => {
    response.status(200).json({ name: 'Lars', doing: 'coding' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
