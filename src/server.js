const express = require("express")
const server = express()

// DB sync
const db = require("./database/db.js")

// Public folder config
server.use(express.static("public"))

 // Req.body enabled
server.use(express.urlencoded({ extended: true }))



// Using template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//Application path configuration
//Home page
//req: requisiton (asking something)
//res: answer (returning somthing for us)

server.get("/", (req, res) => {
   return res.render("index.html", {title: "Um titulo"}) //the answer we want for home page
})

server.get("/create-point", (req, res) => {


   return res.render("create-point.html") //the answer we want for new collection point creation
})

server.post("/create-point", (req, res) => {

   // Insert data into DB using req.body
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
   req.body.image,
   req.body.name,
   req.body.address,
   req.body.address2,
   req.body.state,
   req.body.city,
   req.body.items
]

function afterInsertData(err) {
   if(err) {
       return res.send("Erro no cadastro!")
   }

   console.log("Successfully registered")
   console.log(this)

   return res.render("create-point.html", {saved: true})
}

db.run(query, values, afterInsertData)

})


server.get("/search-results", (req, res) => {

   const search = req.query.search

   if(search == "") {
      return res.render("search-results.html", { total: 0 })
   }

   // get data from database
   db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
      if(err) {
          return console.log(err);
      }

      const total = rows.length

      // Showing DB data on html
      return res.render("search-results.html", { places: rows, total: total })
  })
})



//Server on
server.listen(3000)