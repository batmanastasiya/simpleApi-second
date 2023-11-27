import { AxiosResponse } from 'axios';
import { ApiClient } from '../apiClient';
import { INote } from '../IResponses.interface';
import { ICreateNoteRequest } from '../IRequests.interface';

export class NotesService {
  constructor(private readonly client: ApiClient) {
    this.client = client;
  }

  async getNotes(): Promise<AxiosResponse<INote[]>> {
    return this.client.get('/notes');
  }

  async createNote(data: ICreateNoteRequest): Promise<AxiosResponse<INote>> {
    return this.client.post('/notes', data);
  }

  async getNoteById(id: string): Promise<AxiosResponse<INote>> {
    return this.client.get(`/notes/${id}`);
  }

  async updateNoteById(
    id: string,
    data: ICreateNoteRequest,
  ): Promise<AxiosResponse<INote>> {
    return this.client.patch(`/notes/${id}`, data);
  }

  async deleteNoteById(id: string): Promise<AxiosResponse> {
    return this.client.delete(`/notes/${id}`);
  }

  async getNotesByUserId(id: string): Promise<AxiosResponse<INote[]>> {
    return this.client.get(`/notes/author/${id}`);
  }
}
