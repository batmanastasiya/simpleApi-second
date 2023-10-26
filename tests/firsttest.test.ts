import { describe, test, expect } from '@jest/globals';
import axios from "axios";

describe('SimpleApi/notes', () => {
    test('should get all notes', async () => {
        const notes = await axios.get('https://simpleapi.pfizer.keenetic.link/notes');

        expect(notes.status).toBe(200);
        expect(notes.data).toBeDefined()
    });

    test('should get one note by id', async () => {
        const notes = await axios.get('https://simpleapi.pfizer.keenetic.link/notes');
        const searchedId = notes.data[0].id;
        const note = await axios.get(`https://simpleapi.pfizer.keenetic.link/notes/${searchedId}`);

        expect(notes.status).toBe(200);
        expect(note.data).toBeDefined()
    });
});