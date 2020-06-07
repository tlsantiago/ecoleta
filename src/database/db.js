// import sqlite dependencies
const sqlite3 = require('sqlite3').verbose();

// DB object creation, responsible to operate DB
const db = new sqlite3.Database('./src/database/database.db')


module.exports = db;
// Using DB object for operations

db.serialize(() => {
    // Table creation with SQL commands
   /* db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            image TEXT, 
            name TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)
    // Data imput
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?, ?, ?, ?, ?, ?, ?);
    `

    const values = [
        "https://images.unsplash.com/photo-1542827866-3e48c943da0f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Resíduos eletrônicos, Lâmpadas"
    ]

    function afterInsertData(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Successfuly registered")
        console.log(this)
    }

   db.run(query, values, afterInsertData)



    // Data query
    db.all(`SELECT * FROM places`, function(err, rows) {
        if(err) {
            return console.log(err);
        }

        console.log("Here's your registers")
        console.log(rows)
    })

    // Delete data
   /* db.run(`DELETE FROM places WHERE id = ?`, [1], function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("Sucessfuly deleted")

    }) /*
*/
})