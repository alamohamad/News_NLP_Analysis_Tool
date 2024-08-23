const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { analyze } = require("./analyse");

dotenv.config();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());

const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: 'dist' });
});

app.post("/api/sentiment", async (req, res) => {
    const url = req.body.url;
    console.log("URL received by server:", url);

    if (!url) {
        return res.status(400).json({ error: "No URL provided" });
    }

    try {
        const apiResponse = await analyze(url, MEAN_CLOUD_API_KEY);
        console.log("Full API Response:", apiResponse);
        res.json(apiResponse);
    } catch (error) {
        console.error("Error during analysis:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
