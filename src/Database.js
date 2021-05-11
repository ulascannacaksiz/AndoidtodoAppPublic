const sqlite3 = require('sqlite3').verbose()
let db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.log(err.message)
  }
  console.log('Connected to the in-memory SQlite database.')
})
db.close()
