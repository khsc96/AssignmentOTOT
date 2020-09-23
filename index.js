// Importing express
let express = require('express')
let app = express()

const port = process.env.PORT || 8080

app.get('/', (req, res) => res.send('Hello world with Express'))

app.listen(port, () => {
    console.log("Running assignB on port " + port)
})