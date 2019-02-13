const insertMongo = require("./insertMongo");
const axios = require("axios");
require("dotenv").config();

(async () => {
    // Base URL
    const uriBase1 =
        "https://api.gnavi.co.jp/ForeignRestSearchAPI/v3/";
    const uriBase2 =
        "https://apis.paralleldots.com/v3/emotion_batch";
    //TODO: remove
    const key1 = process.env.GURUNAVI_KEY;
    const key2 = process.env.PARALLELDOTS_KEY;
    const offset = process.env.OFFSET_PAGE;
    const restaurants = await axios.get(uriBase1, {
        params: {
            keyid: key1,
            lang: "en",
            pref: "PREF13",
            hit_per_page: "20",
            offset_page: offset
        }
    }).then((response) => {
        const result = response.data.rest.map((restaurant) => {
            return {
                id: restaurant.id,
                name: restaurant.name.name,
                url: restaurant.url,
                thumbnail: restaurant.image_url.thumbnail,
                emotion: ""
            }
        });
        return result;
    }).catch((err) => {
        console.log(err);
    });
    const target = await restaurants.reduce((accumulator, currentValue) => {
        accumulator.push(currentValue.name);
        return accumulator;
    }, []);
    const emotions = await axios({
        method: "post",
        url: uriBase2,
        crossorigin: true,
        params: {
            "api_key": key2,
            "text": JSON.stringify(target)
        }
    }).then((response) => {
        const emotions = response.data.emotion;
        const results = emotions.map((emotion) => {
            let highest = Object.keys(emotion).reduce((a, b) =>
                emotion[a] > emotion[b] ? a : b
            );
            return {
                key: highest,
                value: emotion[highest]
            }
        });
        return results;
    }).catch(err => {
        console.log(err);
    });
    await emotions.map((emotion, index) => {
        restaurants[index].emotion = emotion;
    });
    await insertMongo(restaurants);
})();