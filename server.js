const express = require('express');
const bodyParser = require('body-parser');
const Redis = require('redis');
const { createHash } = require('node:crypto');
const https = require('https');
const fs = require('fs');

const app = express();

const port = 3000;
const redisClient = Redis.createClient({
    // url:'redis://default:Password1@redis-stedi-spencer:6379'
    socket:{ 
        host:'127.0.0.1',
        //host: 'redis-stedi-mike',
        port: '6379'
    }
});

app.use(bodyParser.json()); //allow json request (JSON = JavaScript Object Notation)

app.get('/',(req,res)=>{
    res.send("Welcome to my Node Servier");
});

app.listen(port, () => {
    redisConnect.connect();
        console.log('You are connected to Redis!')
});

/* https.createServer({
    key: fs.readFileSync('/etc/letsencrypt/archive/mike.cit270.com/privkey1.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/archive/mike.cit270.com/cert1.pem'),
    chain:fs.readFileSync('/etc/letsencrypt/archive/mike.cit270.com/chain1.pem')//This is a self-signed ceriticated.
  }, app).listen(port, () => {
    redisClient.connect();
    console.log('Listening...')
  }) */

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