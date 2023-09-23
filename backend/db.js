// db.js 

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Create weather table
db.serialize(() => {
  db.run(`
    CREATE TABLE users (
      id INTEGER PRIMARY KEY,  
      name TEXT,
      email TEXT UNIQUE, 
      password TEXT
    )
  `);
});

module.exports = db;