const mongoose=require('mongoose')

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to Db")
    } catch (error) {
        console.log("Error connecting to DB",error)
    }
}
module.exports=connectDB