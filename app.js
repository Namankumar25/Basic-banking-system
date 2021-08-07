const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const port = 3000 || process.env.PORT
require("./database/conn")
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

const static_path = path.join("./public");
app.use(express.static(static_path))

const User = require("./models/registerschema")

app.use(require("./route/auth"))

app.listen(port,()=>{
    console.log(`server started on port ${port}`);
})
