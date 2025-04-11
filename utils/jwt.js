const jwt = require('jsonwebtoken');
const creatJwt = ({payload})=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_LIFETIME
    })
    return token;

}


const isTokenValid = ({ token }) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};



const attachCookiesToResponse = ({res, user})=>{
    const token = creatJwt({payload:user});
    const oneDay = 1000*60*60*24;

    res.cookie('token', token,{
        httpOnly:true,
        expires:new Date(Date.now()+oneDay),
        secure:process.env.NODE_ENV==='production',
        signed:true,
    })
}

module.exports = {
    creatJwt,
    isTokenValid,
    attachCookiesToResponse
}