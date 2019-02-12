const axios = require("axios");

const getRestaurants = () => {
    // Base URL
    const uriBase =
        "https://api.gnavi.co.jp/ForeignRestSearchAPI/v3/";
    //TODO: remove
    const key = process.env.GURUNAVI_KEY;
    axios.get(uriBase, {
        params: {
            keyid: key,
            lang: "en",
            pref: "PREF13",
            hit_per_page: "100"
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
    }).then(result => {
        const target = result.reduce((accumulator, currentValue) => {
            accumulator.push(currentValue.name);
            return accumulator;
        }, []);
        axios({
            method: "post",
            url: uriBase,
            crossorigin: true,
            params: {
                "api_key": key,
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
        });
    })
}
module.exports = getRestaurants;