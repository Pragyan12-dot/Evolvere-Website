const User=require("../models/user-model");
const bcrypt=require("bcryptjs");

const home = async (req,res) => {
    try{
        res.status(200).send("Welcome to NIT DURGAPUR Router");
    }
    catch (error){
        res.status(400).send({ msg: "Internal Server Error" });
    }
}
const register = async (req,res) => {
    try{
        const {username,password}=req.body;
        const userexist= await User.findOne({username:username});
        if(userexist)
        {
            res.status(200).send({msg:"User already exists"});
        }
        const saltround=10;
        const hash_password=await bcrypt.hash(password,saltround);
       const usercreate= await User.create({username,password:hash_password});
        res.status(200).send({msg:usercreate,token: await usercreate.generatetoken(),username:usercreate._id.toString()});
    }
    catch (error){
        res.status(400).send({ msg: "Internal Server Error" });
    }
}
const login = async (req,res) => {
    try{
        const {username,password}=req.body;
        const userexist= await User.findOne({username});
        console.log(userexist);
        if(!userexist)
        {
            res.status(400).send({msg:"Invalid credentials"});
        }
       const user=await bcrypt.compare(password,userexist.password);
       if(user)
       {
        res.status(200).send({msg:"login succesful",token: await userexist.generatetoken(),username:userexist._id.toString()});
       }
       else{
        res.status(400).send({msg:"Invalid username or password"});
       }
    }
    catch (error){
        res.status(400).send({ msg: "Internal Server Error" });
    }
}
module.exports={home,register,login};