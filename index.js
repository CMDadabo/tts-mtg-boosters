const https = require("https");
const axios = require("axios").create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});
const sharp = require("sharp");

const set = "ktk";

const main = async () => {
  const setSearchUri = await axios
    .get("https://api.scryfall.com/sets/ktk")
    .then(({ data }) => data.search_uri);

  let cards = [];

  const fetchCards = (searchUri) =>
    axios.get(searchUri).then(({ data }) => {
      cards = [...cards, ...data.data];
      if (data.next_page) {
        return fetchCards(data.next_page);
      } else {
        return cards;
      }
    });

  const setCards = await fetchCards(setSearchUri);

  const buildCardsheet = (setUrl)

// setCards[0].image_uris.normal

  const getCardImage = url => (
    await axios({
      url,
      responseType: "arraybuffer",
    })
  ).data;

  const image = sharp(input)
    .resize({ width: 320 })
    .extend({
      top: 0,
      bottom: 446 * 6,
      right: 320 * 9,
      left: 0,
    })
    .toFile("test.png");

  console.log("Done");
};

main();
