const jwt = require('jsonwebtoken');
require('dotenv').config()


const fetchuser  = (req, res, next) => {
    //Get tpken and add id to req on=bject
    const token = req.header('auth-token');
    if(!token){
        return res.status(401).json({msg: 'No token, authorization denied'});
    }
    try {
        const data =  jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (err) {
        res.status(401).json({msg: 'Token is not valid'});
    }
}

module.exports = fetchuser;