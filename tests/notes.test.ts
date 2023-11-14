import { describe, test, expect, beforeAll } from '@jest/globals';
import { Services } from '../api/services';
import { IApiResponse, INote } from '../api/IResponses.interface';

const services = Services.getInstance();
const authService = services.getAuthService();
const notesService = services.getNotesService();
let notes: IApiResponse<INote[]>;

beforeAll(async () => {
  await authService.unauthorized();
  // await notesService.createNote({
  //   content: 'test note for cases when the notes are empty',
  // });
  notes = await notesService.getNotes();
});

describe('SimpleApi/notes [#Not-authorized-user][#notes]', () => {
  test('should get all notes [#smoke]', async () => {
    expect(notes.status).toBe(200);
    expect(notes.data).toBeDefined();
  });

  test('should get one note by id [#smoke]', async () => {
    const searchedId = notes.data[0].id;
    const note = await notesService.getNoteById(searchedId);

    expect(notes.status).toBe(200);
    expect(note.data).toBeDefined();
  });

  test('should get all notes by author id [#smoke]', async () => {
    const searchedId = notes.data[0].author;
    const note = await notesService.getNotesByUserId(searchedId);

    expect(notes.status).toBe(200);
    expect(note.data).toBeDefined();
  });

  test('should not create note by not logged in user', async () => {
    try {
      await notesService.createNote({
        content: 'test',
      });
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });

  test('should not update note by not logged in user', async () => {
    try {
      const searchedId = notes.data[0].id;
      await notesService.updateNoteById(searchedId, {
        content: 'testUPDATED',
      });
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });

  test('should get empty array of notes by invalid author id', async () => {
    const note = await notesService.getNotesByUserId('invalidId');

    expect(note.data).toHaveLength(0);
  });

  test('should get empty array of notes by invalid note id', async () => {
    const note = await notesService.getNoteById('invalidId');

    expect(note.data).toHaveLength(0);
  });

  test('should not delete note without access token', async () => {
    try {
      const noteToDelete = notes.data[0].id;
      await notesService.deleteNoteById(noteToDelete);
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });
});
