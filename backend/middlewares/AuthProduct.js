const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req,res,next)=>{
    const auth = req.headers['authorization']; // it's splelling is imp:authorization
    if(!auth){
        return res.status(403)
            .json({Message: 'Unauthorized, JWT token is reqire'});
    }
    try{
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        return res.status(403)
            .json({Message: 'Unauthorized, JWT token wrong or expired'});
    }
}

module.exports = ensureAuthenticated;