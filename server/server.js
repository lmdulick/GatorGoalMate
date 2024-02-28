var cors = require('cors')

const express = require('express')
const app = express()

app.use(cors())

app.get("/api", (req, res) => {
    res.json({"users": ["userOne", "userTwo", "userThree", "userFour"]})
})

app.listen(5000, () => { console.log("Server started on port 5000") })

// express local host: http://localhost:5000/api