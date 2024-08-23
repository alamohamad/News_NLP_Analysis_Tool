import { displayRes } from './displayRes';

const handleSubmit = async (e) => {
    e.preventDefault();
    const url = document.getElementById("URI").value;

    if (!url) {
        showError("Please enter a URL");
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/sentiment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        displayRes(data.score_tag, data.agreement, data.subjectivity, data.confidence, data.irony);
    } catch (error) {
        console.error('Error fetching analysis:', error);
        showError("Error: HTTP error! Status: " + (error.message || "unknown"));
    }
};

const showError = (message) => {
    const errorDiv = document.getElementById("error");
    errorDiv.textContent = message;
    errorDiv.style.display = "block";
};

export { handleSubmit };
