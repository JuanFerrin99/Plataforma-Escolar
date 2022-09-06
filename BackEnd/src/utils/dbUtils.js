const res = require("express/lib/response");
const mongoose = require("mongoose");
const config = require("../../config/default.json")

const uri = config.mongodbUri;

module.exports.connectToDB = function (suffix = "", params = {}) {
    return mongoose.connect(`${uri}-${suffix}`, params);
}

module.exports.disconnectDB = function () {
    mongoose.disconnect()
}