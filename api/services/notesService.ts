import { ApiClient } from '../apiClient';
import { IApiResponce, INote } from '../IResponces.interface';
import { ICreateNoteRequest } from '../IRequests.interface';

export class NotesService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getNotes(): Promise<IApiResponce<INote[]>> {
    return this.client.get('/notes');
  }

  async createNote(data: ICreateNoteRequest): Promise<IApiResponce<INote>> {
    return this.client.post('/notes', data);
  }

  async getNoteById(id: string): Promise<IApiResponce<INote>> {
    return this.client.get(`/notes/${id}`);
  }

  async updateNoteById(
    id: string,
    data: ICreateNoteRequest,
  ): Promise<IApiResponce<INote>> {
    return this.client.patch(`/notes/${id}`, data);
  }

  async deleteNoteById(id: string): Promise<IApiResponce> {
    return this.client.delete(`/notes/${id}`);
  }

  async getNotesByUserId(id: string): Promise<IApiResponce<INote[]>> {
    return this.client.get(`/notes/author/${id}`);
  }
}
