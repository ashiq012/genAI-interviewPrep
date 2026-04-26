const mongoose = require('mongoose')
const databaseConnection = async () => {
    try{
        await mongoose.connect(process.env.mongo_url)
    console.log("Database connected.")
    }
    catch(err){
        console.log(err.message)
        console.log("failed to connect DB")
    }
}
module.exports = databaseConnection;