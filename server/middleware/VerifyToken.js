// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
    try {
        const auth = req.headers["authtoken"];
        // if(!auth) return next(errorHandler(StatusCodes.UNAUTHORIZED, 'no token, authorization denied'));
        const token = auth.split(' ')[1];
        // console.log("middleware token:",token);
        if(!token || token === "undefined") return res.status(401).send('No token, authorization denied');
        const claims = jwt.verify(token, process.env.JWT_SECRET)
        // console.log("middleware: ",decoded);
        req.user = claims;
        next();
    } catch (error) {
        return res.status(404).send('Invalid Credential Timeout!!!');
    }
    // try {
    //     //code
    //     const token = req.headers["authtoken"]
    //     if (!token) {
    //         return res.status(401).send('No token')
    //     }
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    //     req.user = decoded.user
        
    //     next();
    // } catch (err) {
    //     // err
    //     console.log(err)
    //     res.send('Token Invalid').status(500)
    // }
    
}