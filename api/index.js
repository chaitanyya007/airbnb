
const express = require('express');
const cors = require('cors');
const path = require('path');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const CookieParser = require('cookie-parser')
// const User = require('./models/User.js');
// const Router = express.Router()
require('dotenv').config()
const app = express();
port = 4000
const bcryptSalt = bcrypt.genSaltSync(10);
app.use('/uploads',express.static('E:/Projects/WebDevelopment/Project/airbnb-clone/api'+ '/uploads'));
app.use(express.json());
app.use(CookieParser())

app.use(cors({
    credentials:true,
    origin:'http://localhost:5173',
}));

const Router = require('./controllers/controller.js');
const cookieParser = require('cookie-parser');
app.use('',Router)
mongoose.connect(process.env.MONGO_URL);
const con = mongoose.connection
con.on('open', () =>
{
console.log('connected...')
})

app.listen(port, () =>
    {
    console.log('Server running at port:http://localhost:'+port)
    })    


