require("dotenv").config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === "test") {
    console.log("running in test environment")
    MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
    PORT,
    MONGODB_URI,
}
