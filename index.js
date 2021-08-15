const express = require('express') // Initialization Express.js
const app = express() // Initialization app const
const exphbs = require('express-handlebars') // Initializarion handle-bars

// Initializrtion Routes
const infoRoutes = require("./routes/info")
const shopRoutes = require("./routes/shop")
const aboutRoutes = require("./routes/our_news")

const hbs = exphbs.create({ // Use hbs
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine) // Initialization engine hbs
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(express.static('public')) // Initialization public directory (style ...)

// Add Routes
app.use('/', infoRoutes)
app.use('/shop', shopRoutes)
app.use('/our_news', aboutRoutes)

const PORT = process.env.PORT || 3030 // Initialization port

app.listen(PORT, () => { // Start server
    console.log(`Server is running on port: ${PORT}`)
})