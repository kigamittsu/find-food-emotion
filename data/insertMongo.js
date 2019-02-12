const mongo = require("mongodb").MongoClient;

let mongoUrl = process.env.MONGO_URL;
if (process.env.NODE_ENV === "development") {
    mongoUrl = "mongodb://localhost:27017";
}

const insertMongo = (restaurants) => {
    const dbName = "myProject";
    const client = new mongo(mongoUrl);
    client.connect((err, client) => {
        console.log("Connected Mongo");

        const db = client.db(dbName);

        db.collection("restaurants").insertMany(restaurants, function (err, r) {
            console.log("Inserted data");
            client.close();
        });
    });
}
module.exports = insertMongo;