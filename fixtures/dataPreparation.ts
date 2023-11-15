import { Services } from '../api/services';
import { defaultUser } from '../users';

export const prepareDataIfNesessary = async () => {
  const services = Services.getInstance();
  const notesService = services.getNotesService();
  const authService = services.getAuthService();

  const notes = await notesService.getNotes();
  if (notes.data.length === 0) {
    await authService.loginAs(defaultUser);
    await notesService.createNote({
      content: 'test note for cases when the notes are empty',
    });
    await authService.unauthorized();
  }
};
