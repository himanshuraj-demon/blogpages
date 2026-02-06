const mongoose=require("mongoose");

async function connectDB(url) {
    return await mongoose.connect(url).then(() => console.log("Connction done")).catch(() => console.log("an error occured"));
    
}

module.exports={
    connectDB,
}