import { validateUrl } from '../js/checkURL';

describe('validateUrl Functionality', () => {
    it('should return false for an invalid URL', () => {
        expect(validateUrl('invalid-url')).toBeFalsy();
    });

    it('should return true for a valid URL', () => {
        expect(validateUrl('https://www.example.com')).toBeTruthy();
    });
});
