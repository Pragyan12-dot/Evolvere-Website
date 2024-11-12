const mongoose=require("mongoose");
const jwt=require("jsonwebtoken");
const UserSchema =new mongoose.Schema({
    username:{
        type: String,
        require:true,
    },
    password:{
        type: String,
        require:true,
    }

});
UserSchema.methods.generatetoken = async function(){
    try{
        return jwt.sign(
            {
                username:this._id.toString(),
                password:this.password
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn:"30d",
            }

        );
    }
    catch(error)
    {
        console.log(error);
    }
}
const User=new mongoose.model("User",UserSchema);
module.exports=User;