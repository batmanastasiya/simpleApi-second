import { ApiClient } from '../apiClient';
import { IApiResponse, INote } from '../IResponses.interface';
import { ICreateNoteRequest } from '../IRequests.interface';

export class NotesService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getNotes(): Promise<IApiResponse<INote[]>> {
    return this.client.get('/notes');
  }

  async createNote(data: ICreateNoteRequest): Promise<IApiResponse<INote>> {
    return this.client.post('/notes', data);
  }

  async getNoteById(id: string): Promise<IApiResponse<INote>> {
    return this.client.get(`/notes/${id}`);
  }

  async updateNoteById(
    id: string,
    data: ICreateNoteRequest,
  ): Promise<IApiResponse<INote>> {
    return this.client.patch(`/notes/${id}`, data);
  }

  async deleteNoteById(id: string): Promise<IApiResponse> {
    return this.client.delete(`/notes/${id}`);
  }

  async getNotesByUserId(id: string): Promise<IApiResponse<INote[]>> {
    return this.client.get(`/notes/author/${id}`);
  }
}
