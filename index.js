const express = require('express') // Initialization Express.js
const app = express() // Initialization app const
const exphbs = require('express-handlebars') // Initializarion handle-bars
const path = require('path');
const mongoose = require('mongoose');

// Initializrtion Routes
const infoRoutes = require("./routes/info")
const shopRoutes = require("./routes/shop")
const aboutRoutes = require("./routes/contacts")
const cardRoutes = require("./routes/card")

const hbs = exphbs.create({ // Use hbs
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // Initialization engine hbs
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static(path.join(__dirname, 'public'))) // Initialization public directory (style ...)
app.use(express.urlencoded({ extended: true })) // Listen forms

// Add Routes
app.use('/', infoRoutes)
app.use('/shop', shopRoutes)
app.use('/contacts', aboutRoutes)
app.use('/card', cardRoutes)

const PORT = process.env.PORT || 3030 // Initialization port

async function start() {
    try {
        const url = `mongodb+srv://nasadyk:lalka228@cluster0.qjzxe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

        await mongoose.connect(url, { useNewUrlParser: true })

        app.listen(PORT, () => { // Start server
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()