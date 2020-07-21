const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', './views')
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));



app.use(todoRoutes)

async function start(){
    try {
        await mongoose.connect(
            'mongodb+srv://oleksandr:samsung1@cluster0-epu1m.mongodb.net/todos',
            // 'mongodb+srv://oleksandr:samsung1@cluster0-epu1m.mongodb.net/todos', 
        {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false   
        })
        app.listen(PORT, ()=>{
            console.log("server has been started...", PORT)
        })
    } catch (e) {
        console.log(e)
        
    }
}
start();
