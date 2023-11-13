import { describe, test, expect, beforeAll } from '@jest/globals';
import { Services } from '../api/services';
import { IApiResponse, IUser } from '../api/IResponses.interface';
import { anotherUser, defaultUser } from '../users';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();
const notesService = services.getNotesService();
let currentUser: IApiResponse<IUser>;

beforeAll(async () => {
  await authService.loginAs(defaultUser);
  currentUser = await usersService.getCurrentUser();
});

describe('[Authorized user] SimpleApi/auth', () => {
  test('should create new note', async () => {
    const note = await notesService.createNote({
      content: 'test',
    });

    expect(note.status).toBe(201);
    expect(note.data).toBeDefined();
  });

  test('should update note', async () => {
    const searchedId = currentUser.data.id;
    const note = await notesService.getNotesByUserId(searchedId);
    const noteId = note.data[0].id;
    const updatedNote = await notesService.updateNoteById(noteId, {
      content: 'testUPDATED',
    });

    expect(updatedNote.status).toBe(200);
    expect(updatedNote.data.content).toBe('testUPDATED');
  });

  test('should delete note', async () => {
    const searchedId = currentUser.data.id;
    const note = await notesService.getNotesByUserId(searchedId);
    const noteId = note.data[0].id;
    const deletedNote = await notesService.deleteNoteById(noteId);

    expect(deletedNote.status).toBe(200);
  });

  test('should not update non existent note ', async () => {
    try {
      await notesService.updateNoteById('invalidId', {
        content: 'testUPDATED',
      });
    } catch (e: any) {
      expect(e.response.status).toBe(404);
    }
  });

  test('should not delete non existent note ', async () => {
    try {
      await notesService.deleteNoteById('invalidId');
    } catch (e: any) {
      expect(e.response.status).toBe(404);
    }
  });

  test('Should not delete another user note', async () => {
    try {
      const note = await notesService.createNote({
        content: 'test',
      });
      const searchedId = note.data.id;
      await authService.loginAs(anotherUser);
      await notesService.deleteNoteById(searchedId);
    } catch (e: any) {
      expect(e.response.status).toBe(403);
    }
  });
});
