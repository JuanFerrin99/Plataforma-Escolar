const jwt = require("jsonwebtoken")
const config = require("../../config/default.json")
const jwtSecret = config.authentication.jwtSecret;

module.exports.createToken = (body) => {
    return new Promise((resolve, reject) => {
        jwt.sign(body, config.authentication.jwtSecret, {expiresIn: config.authentication.jwtExpiry}, (error, token) => {

            if(error) return reject(error);

            resolve(token)
        });
    })
}

function verifyToken (token, jwtSecret){
    return new Promise ((resolve, reject ) =>
        jwt.verify(token, jwtSecret, (err, res) => {
            if(err) {
                reject(err);
            }
            else {
                resolve(res);
            }
        })
    )   
}

module.exports.checkToken = async (token)  => {
    try {
        const contenido = await verifyToken(token, jwtSecret);
        return true; 
    }
    catch (err){
        return false
    }
}

