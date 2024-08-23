const axios = require('axios');

const analyze = async (url, apiKey) => {
    try {
        const response = await axios.post('https://api.meaningcloud.com/sentiment-2.1', null, {
            params: {
                key: apiKey,
                url: url,
                lang: 'en'
            }
        });

        console.log('Full API Response:', response.data);

        return {
            agreement: response.data.agreement || "N/A",
            subjectivity: response.data.subjectivity || "N/A",
            confidence: response.data.confidence || "N/A",
            irony: response.data.irony || "N/A",
            score_tag: response.data.score_tag || "N/A",  // Ensure score_tag is correctly passed
        };
    } catch (error) {
        console.error('Error in analyze function:', error);
        return {
            agreement: "N/A",
            subjectivity: "N/A",
            confidence: "N/A",
            irony: "N/A",
            score_tag: "N/A",
        };
    }
};

module.exports = { analyze };
