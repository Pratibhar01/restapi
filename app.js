const express = require('express');
const app = express();

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const cors = require('cors');

const candidateRoute = require('./api/route/candidate');
const userRoute = require('./api/route/user');


mongoose.connect('mongodb+srv://pratibha02:pratibha@cluster0.4zntx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connection.on('error',err=>{
    console.log('connection failed');
});

mongoose.connection.on('connected',connected =>{
    console.log('connection with database.....');
});

app.use(cors());

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/candidate',candidateRoute);
app.use('/user',userRoute);


app.use((req,res,next) =>{
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;