const express = require('express');
const dotenv = require('dotenv');
const { json } = require('body-parser');
const indexRoute = require("./routes/index.routes")

dotenv.config()

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

app.use("/api", indexRoute)

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
})
