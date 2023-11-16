const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoDbURL');

const connectToDb = async ()=> {
    try{
        await mongoose.connect(db, ()=>{
            console.log('Successfully Connected to MongoDB');
        });
        
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDb;