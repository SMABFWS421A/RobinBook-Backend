const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'robin book',
    connectionLimit: 5
})

pool.getConnection((err,connection) => {
    if(err){
      console.error('Database error');
    }
    if(connection) connection.release();

    return;

})


module.exports = pool;