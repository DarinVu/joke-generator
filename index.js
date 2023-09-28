import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs");
    
})

app.post("/topic", async (req, res) => {
    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&contains=${req.body["topicInput"]}`);
        const result = response.data;
        res.render("index.ejs", {
            joke: result.joke,
            type: result.type,
            setup: result.setup,
            delivery: result.delivery,
            error: result.error,
            word: req.body["topicInput"]
        });
      } catch (error) {
        console.error(error);
      }
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}.`);
})