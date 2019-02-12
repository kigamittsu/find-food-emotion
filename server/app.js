const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();

app.use(express.json({
    limit: "100mb"
}))
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
            return res.json(response.data[0].faceAttributes.emotion);
        })
        .catch(err => {
            return res.status(500).send(err);
        });
});

app.get("/api/restaurants", (req, res) => {
    // Base URL
    const uriBase =
        "https://api.gnavi.co.jp/ForeignRestSearchAPI/v3/";
    //TODO: remove
    const key = process.env.GURUNAVI_KEY;
    axios.get(uriBase, {
        params: {
            keyid: key,
            lang: "en",
            pref: "PREF13"
        }
    }).then((response) => {
        console.log(response);
    });
});

module.exports = app;