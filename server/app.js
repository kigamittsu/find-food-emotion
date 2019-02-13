const express = require("express");
const app = express();
const axios = require("axios");
const MongoClient = require("mongodb").MongoClient;
const Redis = require("ioredis");
const path = require("path");

require("dotenv").config();

let port = process.env.REDIS_PORT;
let host = process.env.REDIS_HOST;
let mongoUrl = process.env.MONGO_URL;
let mongoDB = process.env.MONGO_DB;
if (process.env.NODE_ENV === "development") {
    port = "6379";
    host = "localhost";
    mongoUrl = "mongodb://localhost:27017";
    mongoDB = "myProject"
}

const redis = new Redis(port, host);
redis.set("anger", "Angry");
redis.set("neutral", "Bored");
redis.set("contempt", "Fear");
redis.set("disgust", "Excited");
redis.set("fear", "Fear");
redis.set("happiness", "Happy");
redis.set("sadness", "Sad");
redis.set("surprise", "Excited");

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "dist")));

app.use(express.json({
    limit: "100mb"
}));
app.use(express.urlencoded({
    limit: "100mb"
}));

app.post("/api/upload", express.json(), (req, res) => {
    // Get request body
    const {
        photo
    } = req.body;
    // Base URL
    const uriBase =
        "https://japaneast.api.cognitive.microsoft.com/face/v1.0/detect";
    //TODO: remove
    const key = process.env.AZURE_KEY;
    // const imageURL = window.URL.createObjectURL(this.photoInfo);
    const binaryImage = Buffer.from(photo.split(",")[1], "base64");
    axios({
            method: "post",
            url: uriBase,
            crossorigin: true,
            params: {
                returnFaceId: "true",
                returnFaceLandmarks: "false",
                returnFaceAttributes: "age,gender,headPose,smile,facialHair,glasses,emotion," +
                    "hair,makeup,occlusion,accessories,blur,exposure,noise"
            },
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/octet-stream",
                "Ocp-Apim-Subscription-Key": key
            },
            data: binaryImage
        })
        .then(response => {
            (response.data.length !== 0) ? res.json(response.data[0].faceAttributes.emotion): res.sendStatus(500)
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});

app.get("/api/restaurants", async (req, res) => {
    const query = req.query.emotion;
    const emotion = await redis.get(query).then((res) => {
        return res;
    });
    const client = new MongoClient(mongoUrl);
    await client.connect(function (err, client) {
        console.log("Connected Mongo");
        const db = client.db(mongoDB);
        const collection = db.collection("restaurants");
        collection.find({
            "emotion.key": emotion
        }).toArray().then((result) => {
            res.json(result);
        });
        client.close();
    });
    // // Base URL
    // const uriBase =
    //     "https://api.gnavi.co.jp/ForeignRestSearchAPI/v3/";
    // //TODO: remove
    // const key = process.env.GURUNAVI_KEY;
    // axios.get(uriBase, {
    //     params: {
    //         keyid: key,
    //         lang: "en",
    //         pref: "PREF13",
    //         hit_per_page: "20"
    //     }
    // }).then((response) => {
    //     const result = response.data.rest.map((restaurant) => {
    //         return {
    //             id: restaurant.id,
    //             name: restaurant.name.name,
    //             url: restaurant.url,
    //             thumbnail: restaurant.image_url.thumbnail,
    //             emotion: ""
    //         }
    //     });
    //     return res.json(result);
    // });
});

app.post("/api/emotions", (req, res) => {
    // const {
    //     restaurantInfo
    // } = req.body;
    // // Base URL
    // const uriBase =
    //     "https://apis.paralleldots.com/v3/emotion_batch";
    // const key = process.env.PARALLELDOTS_KEY;

    // axios({
    //     method: "post",
    //     url: uriBase,
    //     crossorigin: true,
    //     params: {
    //         "api_key": key,
    //         "text": JSON.stringify(restaurantInfo)
    //     }
    // }).then((response) => {
    //     const emotions = response.data.emotion;
    //     const results = emotions.map((emotion) => {
    //         let highest = Object.keys(emotion).reduce((a, b) =>
    //             emotion[a] > emotion[b] ? a : b
    //         );
    //         return {
    //             key: highest,
    //             value: emotion[highest]
    //         }
    //     });
    //     return res.json(results);
    // });
    // // pd.apiKey = key;
    // // pd.emotionBatch(JSON.stringify(restaurantInfo), "en")
    // //     .then((response) => {
    // //         return JSON.parse(response);
    // //     })
    // //     .then((result) => {
    // //         console.log(result.emotion.length);
    // //     })
    // //     .catch((err) => {
    // //         console.log(err);
    // //     })
});

module.exports = app;