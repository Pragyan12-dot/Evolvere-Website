require("dotenv").config();
const express=require("express");
const app=express();
const router=require("./router/auth-router");
const connectdb=require("./utils/db");
app.use(express.json());
app.use("/router",router);
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to NIT DURGAPUR");
});
const PORT=5000;
connectdb().then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
});
