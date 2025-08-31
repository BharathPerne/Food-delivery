// import jwt from 'jsonwebtoken';


// const authMiddleware=async (req,res,next)=>{
//     const {token}=req.headers;
//     if(!token)
//     {
//         return res.json({success:false,message:"Not Authorized Login again"});
//     }
//     try{
//         const token_decode=jwt.verify(token,process.env.JWT_SECRET);
//         req.body.userId=token_decode.id;
//         next();
//     }
//     catch(error)
//     {
//         console.log(error);
//         res.json({success:false,message:"Error"});
//     }
// }

// export default authMiddleware;
import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
  const token = req.headers.token || req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    return res.json({ success: false, message: "Not Authorized, Login again" });
  }
  console.log("Incoming token:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = decoded.id;   // attach user id
    next();
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Invalid Token" });
  }
};

export default authMiddleware;
