const jwt = require("jsonwebtoken")
const config = require("../../config/default.json")


module.exports.verifyToken = (token) => {
    return new Promise((resolve, reject) =>
        jwt.verify(token, config.authentication.jwtSecret, (err, decoded) => {
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