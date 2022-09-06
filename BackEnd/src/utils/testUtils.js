const { connectToDB, disconnectDB } = require("./dbUtils");

module.exports.connectTestDB = (testSuiteName) => connectToDB(testSuiteName, {autoIndex: false})

module.exports.disconnectTestDB = () => disconnectDB()