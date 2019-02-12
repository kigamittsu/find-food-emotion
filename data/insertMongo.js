const mongo = require("mongodb").MongoClient;

const insertMongo = (restaurants) => {
    const url = "mongodb://localhost:27017";
    const dbName = "myProject";
    const client = new mongo(url);
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