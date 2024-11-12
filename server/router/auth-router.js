const express=require("express");
const router=express.Router();
const {home,register,login}=require("../controllers/auth-controller");
const signupschema=require("../validators/auth-validator");
const validate=require("../middleware/auth-middleware")
router.route("/").get(home);
router.route("/register").post(validate(signupschema),register);
router.route("/login").post(login);
module.exports=router;