// load our app server  using express somehow..
// import lib express with in '' 
const express = require('express')
// create app varible to make new instance of express
const app = express()
// imopt morgan lib
const morgan = require('morgan')
// import mysql lib
const mysql = require('mysql')

const bodyParser= require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

// serve all the files inside public
app.use(express.static('./public'))

//loggers:short for short  info and combined will give full logger detail
app.use(morgan('short'))

// user Router
const router= require('./routes/user.js')
app.use(router)

// routing for root dir with req and res 
app.get("/",(req,res)=>{
    // msg on server
    console.log("Responding to root route")
    //  On client browser with respond msg
    res.send("Hello from Root..")
})




// to start app server
// localhost:3003
app.listen(3003,()=>{
    console.log("server is up and listening on 3003...")
})