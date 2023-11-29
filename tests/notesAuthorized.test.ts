import { describe, test, expect, beforeAll } from '@jest/globals';
import { AxiosResponse } from 'axios/index';
import { Services } from '../api/services';
import { INote, IUser } from '../api/IResponses.interface';
import { anotherUser, defaultUser } from '../users';

const services = Services.getInstance();
const authService = services.getAuthService();
const usersService = services.getUsersService();
const notesService = services.getNotesService();
let currentUser: AxiosResponse<IUser>;
let noteData: INote;

beforeAll(async () => {
  await authService.loginAs(defaultUser);
  currentUser = await usersService.getCurrentUser();
});

describe('SimpleApi/notes [#Authorized-user][#notes]', () => {
  test('should create new note [#smoke]', async () => {
    const note = await notesService.createNote({
      content: 'test ME',
    });
    noteData = note.data;

    expect(note.status).toBe(201);
    expect(note.data).toBeDefined();
    expect(note.data.content).toBe('test ME');
  });

  test('should update note [#smoke]', async () => {
    const noteId = noteData.id;
    const updatedNote = await notesService.updateNoteById(noteId, {
      content: 'testUPDATED',
    });

    expect(updatedNote.status).toBe(200);
    expect(updatedNote.data.id).toBe(noteId);
    expect(updatedNote.data.content).toBe('testUPDATED');
  });

  test('should delete note [#smoke]', async () => {
    const noteId = noteData.id;
    const deletedNote = await notesService.deleteNoteById(noteId);
    const notes = await notesService.getNotesByUserId(currentUser.data.id);

    expect(deletedNote.status).toBe(200);
    expect(notes.data.some((note: INote) => note.id === noteId)).toBeFalsy();
  });

  test('should throw 404 on update non existent note ', async () => {
    try {
      await notesService.updateNoteById('invalidId', {
        content: 'testUPDATED',
      });
      fail('Note was updated by not logged in user');
    } catch (e: any) {
      expect(e.response.status).toBe(404);
    }
  });

  test('should throw 404 on delete non existent note ', async () => {
    try {
      await notesService.deleteNoteById('invalidId');
      fail('There is no error on delete non existent note');
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
      fail('Note was deleted by another user');
    } catch (e: any) {
      expect(e.response.status).toBe(403);
    }
  });
});
