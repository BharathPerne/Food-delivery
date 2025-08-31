import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const JWT_SECRET = process.env.JWT_SECRET || 'randomsecret';
//login user
const loginUser =async (req,res)=>{
    const {email,password}=req.body;
    try
    {
        const user=await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"User does not exist"});
        }
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch)
        {
            return res.json({success:false,message:"User does not exist"});
        }
        const token=createToken(user._id);
        res.json({success:true,token})
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"});
    }

}

//token
const createToken=(id)=>{
    return jwt.sign({id},JWT_SECRET)
}


//register user
const registerUser =async (req,res)=>{
    const {name,password,email}=req.body;
    try
    {
        //Cheking is user already exist
        const exists=await userModel.findOne({email});
        if(exists){
            return res.json({success:false,message:"User Already Exist"});
        }
        //validating email fromat and strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter valid email"});
        }

        if(password.length<8)
        {
            return res.json({success:false,message:"Please enter a password length atleast 9"});
        }

        //hashing user password
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const newUser=new userModel({
            name:name,
            email:email,
            password:hashedPassword
        })
        const user=await newUser.save()
        const token=createToken(user._id);
        res.json({success:true,token});
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
export {loginUser,registerUser}