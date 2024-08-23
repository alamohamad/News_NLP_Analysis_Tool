function displayRes(Polarity, agreement, subjectivity, confidence, irony) {
    const resultElement = document.getElementById('sentimentResult');
    resultElement.innerHTML = '';

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
        const box = document.createElement('div');
        box.className = 'result-box';
        const title = document.createElement('span');
        title.textContent = result.name + ": ";
        title.style.fontWeight = 'bold';

        const value = document.createElement('span');
        value.textContent = result.value || '';
        value.style.fontWeight = 'normal';

        box.appendChild(title);
        box.appendChild(value);
        resultElement.appendChild(box);
    });
}

export { displayRes };
