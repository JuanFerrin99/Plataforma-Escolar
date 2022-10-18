const jwt = require("jsonwebtoken")
const config = require("../../config/default.json")


function verifyToken(token, key) {
    return new Promise((resolve, reject) =>
        jwt.verify(token, key, (err, decoded) => {
            if (err) reject(err);
            else resolve(decoded);
        })
    );
}

module.exports.createToken = (body) => {
    return new Promise((resolve, reject) => {
        jwt.sign({ body }, config.authentication.jwtSecret, { expiresIn: "14d" }, (error, token) => {
            if (error) return reject(error);
            resolve(token)
        });
    })
}

module.exports.checkToken = async (token) => {
    try {
        const contenido = await verifyToken(token, jwtSecret);
        //hacer mis cosas
        return true;
    }
    catch (err) {
        return false
    }
}