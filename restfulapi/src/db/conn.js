const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/school",{
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() =>{
    console.log("connection established with database");
}).catch((err) => {
    console.log("database connection failed");
});

