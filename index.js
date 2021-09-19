const express = require('express') // Initialization Express.js
const app = express() // Initialization app const
const exphbs = require('express-handlebars') // Initializarion handle-bars
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const User = require('./models/user')


// Initialization Routes
const infoRoutes = require("./routes/info")
const shopRoutes = require("./routes/shop")
const aboutRoutes = require("./routes/contacts")
const cardRoutes = require("./routes/card");
const ordersRoutes = require("./routes/orders")
const authRoutes = require("./routes/auth")
const { isError } = require('util');

const hbs = exphbs.create({ // Use hbs
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.use(async(req, resp, next) => {
    try {
        const user = await User.findById('6130f0a53fdbd75dfb0be690');
        req.user = user;
        next()
    } catch (err) {
        console.log(err)
    }
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
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3030 // Initialization port

async function start() {
    try {
        const url = `mongodb+srv://nasadyk:lalka228@cluster0.qjzxe.mongodb.net/info-center-dacia`

        await mongoose.connect(url, { useNewUrlParser: true })

        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                name: 'Vladyslav',
                age: 20,
                email: 't.empire228@gmail.com',
                cart: { items: [] }
            })

            await user.save()
        }

        app.listen(PORT, () => { // Start server
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()