// Importing required packages.
let express = require('express')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let app = express()

// Import routes
let apiRoutes = require('./api-routes')
const e = require('express')

// Configure bodyparser to be used for handling post requests
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/assignB', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)

let db = mongoose.connection
// Checks if DB is connected succesfully
if(!db) {
    console.log("Error connectiong to mongoDB")
} else {
    console.log("Connection successful...")
}

// Set-up Server port
const port = process.env.PORT || 8080

// Send message to default URL
app.get('/', (req, res) => res.send('Hello world with Express with nodemon'))

// Directing to apiRoutes
app.use('/api', apiRoutes)

// Launch app to listen to specified port#
app.listen(port, () => {
    console.log("Running assignB on port " + port)
})

export default app
