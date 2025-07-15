const { MongoClient } = require("mongodb");
require("dotenv").config({path: "./config.env"})

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);
    try{
        await client.connect();
        console.log("connected to mongodb");
    }
    catch(e){
        console.error(e)
    }
    finally{
        await client.close()
    }
    
}

main()

