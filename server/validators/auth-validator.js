const {z}=require("zod");
const signupschema =z.object({
    username:z.string({required_error:"Name is required"}).trim().min(3,{message:"Name must be at least 3 character"}).max(255,{message:"Name must not be more than 255 characters"}),
    password:z.string({required_error:"Password is required"}).trim().min(3,{message:"Password must be at least 3 character"}).max(255,{message:"Password must not be more than 255 characters"}),
});
module.exports=signupschema;