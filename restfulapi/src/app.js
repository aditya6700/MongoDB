const express = require('express');
require('./db/conn.js');
const studentRouter = require('./routers/student');

const app = express();
const port =  process.env.PORT || 3000;

app.use(express.json());
app.use(studentRouter);  // registering router


app.listen(port,() => {
    console.log(`listening to port ${port}`);
});