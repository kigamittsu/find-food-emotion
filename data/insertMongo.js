const mongo = require("mongodb").MongoClient;

let mongoUrl = process.env.MONGO_URL;
let mongoDB = process.env.MONGO_DB;
if (process.env.NODE_ENV === "development") {
    mongoUrl = "mongodb://localhost:27017";
    mongoDB = "myProject";
}

const insertMongo = (restaurants) => {
    const client = new mongo(mongoUrl);
    client.connect((err, client) => {
        console.log("Connected Mongo");

        const db = client.db(mongoDB);

        db.collection("restaurants").insertMany(restaurants, function (err, r) {
            console.log("Inserted data");
            client.close();
        });
    });
}
module.exports = insertMongo;