const express = require("express")
const server = express()


// Public folder config
server.use(express.static("public"))

//Application path configuration
//Home page
//req: requisiton (asking something)
//res: answer (returning somthing for us)

server.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html") //the answer we want for home page
})

server.get("/create-point", (req, res) => {
    res.sendFile(__dirname + "/views/create-point.html") //the answer we want for new collection point creation
})

server.get("/search-results", (req, res) => {
    res.sendFile(__dirname + "/views/search-results.html") //the answer we want for new collection point creation
})



//Server on
server.listen(3000)