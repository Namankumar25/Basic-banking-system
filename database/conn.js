const mongoose = require("mongoose")

const DBA = process.env.DATABASE

mongoose.connect("mongodb://127.0.0.1:27017/spark",{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log("connected");
}).catch((err)=>{
    console.log("no connection");
})