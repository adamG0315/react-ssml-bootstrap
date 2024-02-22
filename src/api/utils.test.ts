import { parseText, parseAllText } from './utils';

describe('parseText function', () => {
    it('removes HTML tags from the text', () => {
        const inputText = '<p>Hello <strong>world</strong>!</p>';
        const expectedOutput = 'Hello world!';
        expect(parseText(inputText)).toBe(expectedOutput);
    });

    it('returns the same text has no HTML tags', () => {
        const inputText = 'Hello world!';
        expect(parseText(inputText)).toBe(inputText);
    });

    it('handles text with nested HTML tags', () => {
        const inputText = '<div><p>Nested <span>HTML</span> tags</p></div>';
        const expectedOutput = 'Nested HTML tags';
        expect(parseText(inputText)).toBe(expectedOutput);
    });

    it('handles text with self-closing HTML tags', () => {
        const inputText = '<img src="image.jpg" alt="Image" />';
        const expectedOutput = '';
        expect(parseText(inputText)).toBe(expectedOutput);
    });
});

describe('parseAllText function', () => {
    it('parses an array of texts and removes HTML tags', () => {
        const inputArray = ['<p>Hello <strong>world</strong>!</p>', '<div>Another <em>text</em>.</div>'];
        const expectedOutput = ['Hello world!', 'Another text.'];
        expect(parseAllText(inputArray)).toEqual(expectedOutput);
    });

    it('returns empty array if input array is empty', () => {
        const inputArray: string[] = [];
        expect(parseAllText(inputArray)).toEqual([]);
    });

    it('returns the same if there are no html tags', () => {
        const inputArray = ['Hello world!', 'Another text.'];
        expect(parseAllText(inputArray)).toEqual(['Hello world!', 'Another text.']);
    });
});