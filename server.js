const express = require('express');
const app = express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const morgan = require('morgan'); 
const cors = require('cors');
const path = require('path');


const userRoute = require('./route/user');
const chits = require('./route/chits');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err)=>{
      console.log(err);
    });
  
    app.use(cors());

const PORT = process.env.PORT || 5000;
    app.listen(PORT, ()=>{
    console.log("Backend server is running! " + PORT);
})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine","ejs")
//app.set("views",path.resolve(__dirname,"views/ejs"))

app.use(express.static(path.resolve(__dirname)))
app.use(express.static(path.resolve(__dirname)))



app.use('/user',userRoute);
app.use('/chits', chits);

app.use((req,res,next) =>{
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;