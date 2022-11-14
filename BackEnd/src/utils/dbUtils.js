const res = require("express/lib/response");
const mongoose = require("mongoose");
const config = require("../../config/default.json")

const uri = config.mongodbUri;

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

module.exports.connectToDB = function (suffix = "", params = {}) {
    return mongoose.connect(`${uri}${suffix}` , connectionParams);
}

module.exports.disconnectDB = function () {
    mongoose.disconnect()
}