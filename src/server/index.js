const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const https = require("https");
const querystring = require("querystring");

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;
const apiKey = process.env.API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist'));

app.post('/api/sentiment', (req, res) => {
    const { url } = req.body;
    
    if (!url) {
        return res.status(400).send('URL is required');
    }

    const apiUrl = 'api.meaningcloud.com';
    const endpoint = '/sentiment-2.1';

    const postData = querystring.stringify({
        key: apiKey,
        url: url,
        lang: 'auto'
    });

    const options = {
        hostname: apiUrl,
        port: 443,
        path: endpoint,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': postData.length
        }
    };

    const request = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            if (response.statusCode === 200) {
                const jsonData = JSON.parse(data);
                res.json(jsonData);
            } else {
                res.status(response.statusCode).send(data);
            }
        });
    });

    request.on('error', (error) => {
        console.error('Request error:', error);
        res.status(500).send('Internal Server Error');
    });

    request.write(postData);
    request.end();
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve('dist', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
