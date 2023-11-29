import { describe, test, expect, beforeAll } from '@jest/globals';
import { AxiosResponse } from 'axios';
import { Services } from '../api/services';
import { INote } from '../api/IResponses.interface';
import { prepareDataIfNesessary } from '../fixtures/dataPreparation';

const services = Services.getInstance();
const authService = services.getAuthService();
const notesService = services.getNotesService();
let notes: AxiosResponse<INote[]>;

beforeAll(async () => {
  await prepareDataIfNesessary();
  await authService.unauthorized();
  notes = await notesService.getNotes();
});

describe('SimpleApi/notes [#Not-authorized-user][#notes]', () => {
  test('should get all notes [#smoke]', async () => {
    expect(notes.status).toBe(200);
    expect(notes.data.length).toBeGreaterThan(0);
    expect(notes.data[0].content).toBeDefined();
  });

  test('should get one note by id [#smoke]', async () => {
    const searchedId = notes.data[0].id;
    const note = await notesService.getNoteById(searchedId);

    expect(notes.status).toBe(200);
    expect(note.data.id).toBe(searchedId);
  });

  test('should get all notes by author id [#smoke]', async () => {
    const searchedAuthorId = notes.data[0].author;
    const userNotes = await notesService.getNotesByUserId(searchedAuthorId);

    expect(userNotes.status).toBe(200);
    expect(
      userNotes.data.every((note) => note.author === searchedAuthorId),
    ).toBeTruthy();
  });

  test('should not create note by not logged in user', async () => {
    try {
      await notesService.createNote({
        content: 'test',
      });
      fail('Note was created by not logged in user');
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
      fail('Note was updated by not logged in user');
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
      fail('Note was deleted by not logged in user');
    } catch (e: any) {
      expect(e.response.status).toBe(401);
    }
  });
});
