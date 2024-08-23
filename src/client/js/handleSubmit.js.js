import axios from "axios";
import { displayRes } from './displayRes';

const handleSubmit = async (e) => {
    e.preventDefault();
    const input = document.getElementById("URI");
    const url = input.value;

    if (!url) {
        showError("Please enter a URL");
        return;
    }

    try {
        const response = await axios.post('http://localhost:8000/api/sentiment', { url });
        console.log('API Response:', response.data);
        displayResults(response.data); // Ensure you're calling the correct function to display results
    } catch (error) {
        console.error('Error fetching analysis:', error);
        showError("Error: HTTP error! Status: " + (error.response ? error.response.status : "unknown"));
    }
};

const displayResults = (data) => {
    if (data.msg) {
        showError(data.msg);
        return;
    }

    // Call the displayRes function to render the results
    displayRes(data.score_tag, data.agreement, data.subjectivity, data.confidence, data.irony);
};

const showError = (message) => {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
};

export { handleSubmit };
