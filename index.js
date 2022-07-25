const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require("./routes/user")
const authRouter = require("./routes/auth")
const productRouter = require("./routes/product")


app.use(express.json())

dotenv.config();


mongoose.connect(process.env.MONGO_URL)
  .then(()=>console.log('DB CONNECTED'))
  .catch(e=>console.log(e));


app.use("/api/auth",authRouter);
app.use("/api/product",productRouter);

app.listen(5002,()=>{
    console.log("backend running")
})