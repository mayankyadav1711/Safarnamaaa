const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./config/keys')



mongoose.connect(process.env.MONGOURI || MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDb!")
})
mongoose.connection.on('error', (err)=>{
    console.log("Error on Connecting MongoDb!",err)
})


require('./models/user')
require('./models/post')
require('./models/notification')
require('./models/contact')
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


if(process.env.NODE_ENV=="production"){
    app.use(express.static('build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'build','index.html'))
    })
}

app.listen(PORT, ()=>{
    console.log("Server is running on:" , PORT)
})







