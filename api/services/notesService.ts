import { ApiClient } from '../apiClient';

export class NotesService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getNotes() {
    return await this.client.get('/notes');
  }

  async createNote(data: { content: string }) {
    return await this.client.post(`/notes`, data);
  }

  async getNoteById(id: string) {
    return await this.client.get(`/notes/${id}`);
  }

  async updateNoteById(id: string, data: { content: string }) {
    return await this.client.patch(`/notes/${id}`, data);
  }

  async deleteNoteById(id: string) {
    return await this.client.delete(`/notes/${id}`);
  }

  async getNotesByUserId(id: string) {
    return await this.client.get(`/notes/author/${id}`);
  }
}
