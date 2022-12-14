const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const port =  process.env.PORT || 8800;
const AuthRoute  = require("./Routes/AuthRoute");
const UserRoute  = require("./Routes/UserRoute");
const PostRoute = require("./Routes/PostRoute")
const UploadRoute =require("./Routes/UploadRoute")

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(express.static('public'));
app.use("/images", express.static("images"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}))

app.get("/", (req, res) => {
    res.send("Welcome to My App")
})

app.use("/auth", AuthRoute)
app.use('/user', UserRoute)
app.use('/post', PostRoute)
app.use('/upload', UploadRoute)

mongoose.connect(process.env.MongoURL ,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database connection established");
}).catch(err => {
    console.log(err)
})

app.listen(port,  ()=>{
    console.log(`Server is running on ${port}.`)
})