const express = require('express')
const bodyParser = require('body-parser')
const Redis = require('redis')
const app = express()
const { createHash } = require ('node:crypto')
const https = require('https')
const fs = require('fs')

const port = 3000;
const redisClient = Redis.createClient({url:'redis://127.0.0.1:6379'});

app.use(bodyParser.json()); //allow json request (JSON = JavaScript Object Notation)

app.get('/',(req,res)=>{
    res.send("Welcome to my Node Servier");
})

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
  }, app).listen(3000, () => {
    console.log('Listening...')
  })

app.post('/login',async (req,res)=> {
    const loginBody = req.body;
    const userName = loginBody.userName;
    const password = loginBody.password;

    const hashed = password==null ? null : createHash('sha3-256').update(password).digest('hex');
    console.log("Uhhh this is awkward: " +userName +" "+ hashed);
    const redisPassword = password==null ? null : await redisClient.hGet('hashed', userName);
    console.log("Definetely not the password for "+userName+"  "+redisPassword);
    if(password != null && hashed===redisPassword){
        //send welcome if password is correct
        res.send("Welcome "+userName);
    }
    else {
        //if password is not correct
        res.status(401);//unauthorized
        res.send("Incorrect Password");
    }
});