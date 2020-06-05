const express = require("express")
const server = express()


// Public folder config
server.use(express.static("public"))





// utilizando template engine
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

server.get("/search-results", (req, res) => {
   return res.render("search-results.html") //the answer we want for new collection point creation
})



//Server on
server.listen(3000)