import { describe, test, expect } from '@jest/globals';
import { Services } from '../api/services';

const services = Services.getInstance();
const authService = services.getAuthService();
const notesService = services.getNotesService();
const usersService = services.getUsersService();
// const authService = ServicesFactory.getAuthService();
// const notesService = ServicesFactory.getNotesService();

describe('SimpleApi/notes', () => {
  test('should get all notes', async () => {
    const notes = await notesService.getNotes();

    expect(notes.status).toBe(200);
    expect(notes.data).toBeDefined();
  });

  test('should get one note by id', async () => {
    const notes = await notesService.getNotes();
    const searchedId = notes.data[0].id;
    const note = await notesService.getNoteById(searchedId);

    expect(notes.status).toBe(200);
    expect(note.data).toBeDefined();
  });

  test('should get all notes by author id', async () => {
    const notes = await notesService.getNotes();
    const searchedId = notes.data[0].author;
    const note = await notesService.getNotesByUserId(searchedId);

    expect(notes.status).toBe(200);
    expect(note.data).toBeDefined();
  });

  test('should create new note', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });
    const note = await notesService.createNote({
      content: 'test',
    });

    expect(note.status).toBe(201);
    expect(note.data).toBeDefined();
  });

  test('should update note', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });
    const currentUser = await usersService.getCurrentUser();
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
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });
    const currentUser = await usersService.getCurrentUser();
    const searchedId = currentUser.data.id;
    const note = await notesService.getNotesByUserId(searchedId);
    const noteId = note.data[0].id;
    const deletedNote = await notesService.deleteNoteById(noteId);

    expect(deletedNote.status).toBe(200);
  });

  test('should not create note by not logged in user', async () => {
    await authService.unauthorized();
    const note = await notesService.createNote({
      content: 'test',
    });

    expect(note.data.statusCode).toBe(401);
  });

  test('should not update note by not logged in user', async () => {
    await authService.unauthorized();
    const notes = await notesService.getNotes();
    const searchedId = notes.data[0].id;
    const note = await notesService.updateNoteById(searchedId, {
      content: 'testUPDATED',
    });

    expect(note.data.statusCode).toBe(401);
  });

  test('should get empty array of notes by invalid author id', async () => {
    const note = await notesService.getNotesByUserId('invalidId');

    expect(note.data).toHaveLength(0);
  });

  test('should get empty array of notes by invalid note id', async () => {
    const note = await notesService.getNoteById('invalidId');

    expect(note.data).toHaveLength(0);
  });

  test('should not update non existent note ', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });

    const note = await notesService.updateNoteById('invalidId', {
      content: 'testUPDATED',
    });

    expect(note.data.statusCode).toBe(404);
  });

  test('should not delete non existent note ', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });

    const note = await notesService.deleteNoteById('invalidId');

    expect(note.data.statusCode).toBe(404);
  });

  test('should not delete note without access token', async () => {
    await authService.unauthorized();
    const note = await notesService.getNotes();
    const noteToDelete = note.data[0].id;
    const deletedNote = await notesService.deleteNoteById(noteToDelete);

    expect(deletedNote.data.statusCode).toBe(401);
  });

  test('Should not delete anoter user note', async () => {
    await authService.loginAs({
      username: 'qapybara',
      password: 'password',
    });
    const note = await notesService.createNote({
      content: 'test',
    });
    const searchedId = note.data.id;
    await authService.loginAs({
      username: 'test',
      password: 'password',
    });
    const deletedNote = await notesService.deleteNoteById(searchedId);

    expect(deletedNote.data.statusCode).toBe(403);
  });
});
