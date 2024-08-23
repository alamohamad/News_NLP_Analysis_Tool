/**
 * @jest-environment jsdom
 */

import { handleSubmit } from '../js/handleSubmit';

describe('handleSubmit', () => {
    it('should be defined', () => {
        expect(handleSubmit).toBeDefined();
    });
});
