const jwt = require('jsonwebtoken')

const GetLoggedInUser = async(req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"token not provided or invalid"
        })
    }
    try {
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode;
        next();
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:"token is invalid",
            error:error.message
        })
    }
}

module.exports = GetLoggedInUser;