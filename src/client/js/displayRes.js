function displayRes(Polarity, agreement, subjectivity, confidence, irony) {
    const resultElement = document.getElementById('resultsList');
    resultElement.innerHTML = '';  // Clear previous results

    const polarityMap = {
        'P+': 'Strong Positive',
        'P': 'Positive',
        'NEU': 'Neutral',
        'N': 'Negative',
        'N+': 'Strong Negative',
        'NONE': 'Without'
    };

    const results = [
        { name: 'Polarity', value: polarityMap[Polarity] || 'Unknown' },
        { name: 'Agreement', value: agreement },
        { name: 'Subjectivity', value: subjectivity },
        { name: 'Confidence', value: confidence + '%' },
        { name: 'Irony', value: irony }
    ];

    results.forEach(result => {
        const item = document.createElement('li');
        item.textContent = `${result.name}: ${result.value}`;
        resultElement.appendChild(item);
    });
}

export { displayRes };
