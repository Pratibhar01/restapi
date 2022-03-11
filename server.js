const express = require('express');
const app = express();
require('dotenv').config();
// const mongoose = require("mongoose");
const bodyParser = require('body-parser');
// const morgan = require('morgan'); 
// const cors = require('cors');
// const path = require('path');

const PORT = process.env.PORT;
const HOSTNAME = process.env.HOSTNAME;

// const userRoute = require('./route/user');
const chits = require('./route/chits');



// mongoose.connect(process.env.DATABASE_URL, {
//     dbName: process.env.DATABASE_NAME,
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//   .then(() => console.log("DB Connection Successfull!"))
//   .catch((err)=>{
//       console.log(err);
//   })

// app.use(cors());

app.listen(PORT, HOSTNAME, ()=>{
    console.log("Backend server is running! " + PORT);
})

// app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.use('/', (req, res, next) => {
//     res.statusCode = 200;
//     res.send('you visited server...');
// })

app.get('/hello', (req, res, next) => {
    res.statusCode = 200;
    res.send('hello from server');
})

// app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

// app.use(express.static(path.resolve(__dirname)))
// app.use(express.static(path.resolve(__dirname)))



// app.use('/user',userRoute);
app.use('/chits', chits);

app.use((req,res,next) =>{
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;