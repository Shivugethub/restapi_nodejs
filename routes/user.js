// will contain all of my user related routes
const express=require('express')
const mysql=require('mysql')
const router=express.Router()
router.get('/messages',(req,res)=>{
    console.log("Show me some messages..")
    res.end()
})

router.get("/users",(req,res)=>{
    // var user1= {firstName:"Shivu",lastName:"Karamudi"}
    // const user2={firstName:"Manju",lastName:"Karamudi"}
    // res.json([user1, user2])
    const queryString = "SELECT * FROM user"
    getConnection().query(queryString,(err,rows,fields)=>{
        if (err) {
            console.log("Failed to load users" + err)
            res.sendStatus(500)
            return
        }
        res.json(rows)
    })
    // res.send("Nodemon auto updates when i save this file")
})

const pool = mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    database:'first_mysql'
}) 

function getConnection() {
    return pool
   }


router.post('/user_create',(req,res)=>{
    console.log("Trying to create a new user..")

    const firstName= req.body.fname
    const lastName=req.body.lname
    console.log('First Name:'+firstName+'\n'+'Last Name:'+lastName)
    queryString= "INSERT INTO user (first_name,last_name) VALUES(?,?)"
    getConnection().query(queryString,[firstName,lastName],(err,results,fields)=>{
        if (err) {
            console.log("Failed to insert new user:" + err)
            res.sendStatus(500)
            return
        }
        console.log("Inserted a new user with id:",results.insertId)
        res.end()
    })
    
})



// route to fetch user based on id
router.get('/user/:id',(req,res)=>{
    console.log("Fetching user with id: "+req.params.id)

    // config db connection here
    const connection = getConnection()
    const userId = req.params.id
    const queryString = "SELECT * FROM user WHERE id=?"
    connection.query(queryString,[userId],(err,rows,fields)=>{
        if (err) {
            console.log("Failed to query for user:"+err)
            res.sendStatus(500)
            res.end()
            return
        }
        console.log("I think we fetched user successfully")

        // custom formating 
        // const users =rows.map((row)=>{
        //     return {firstName:row.first_name,secondName:row.last_name}
        // })
        // res.json(users)
        res.json(rows)
    })
    // res.end()
})
module.exports = router