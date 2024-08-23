/**
 * @jest-environment jsdom
 */

import { handleSubmit } from '../js/handleSubmit.js';
global.alert = jest.fn();

beforeEach(() => {
    document.body.innerHTML = `
        <div id="error" style="display: none;"></div>
        <input id="URI" value="https://example.com">
        <div id="sentimentResult"></div>
    `;
});

describe('handleSubmit Functionality', () => {
    
    test('should handle successful API response', async () => {
        const mockEvent = { preventDefault: jest.fn() };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    score_tag: 'P+',
                    agreement: 'AGREEMENT',
                    subjectivity: 'SUBJECTIVE',
                    confidence: '100',
                    irony: 'NONIRONIC'
                }),
            })
        );

        await handleSubmit(mockEvent);

        expect(document.getElementById('sentimentResult').textContent).toContain('Strong Positive');
    });

    test('should handle errors correctly when fetch fails', async () => {
        const mockEvent = { preventDefault: jest.fn() };

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                status: 500,
                statusText: 'Internal Server Error',
            })
        );

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        await handleSubmit(mockEvent);

        expect(document.getElementById('error').textContent).toBe("Error: HTTP error! Status: 500");
        expect(document.getElementById('error').style.display).toBe('block');

        consoleErrorSpy.mockRestore();
    });
});
