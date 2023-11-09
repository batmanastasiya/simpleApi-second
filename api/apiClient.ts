import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IApiResponse } from './IResponses.interface';

export class ApiClient {
  private instance: AxiosInstance;
  private token = '';

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://simpleapi.pfizer.keenetic.link',
      validateStatus: (status) => status < 500,
    });
  }

  private async request(
    config: AxiosRequestConfig,
  ): Promise<IApiResponse<never>> {
    const requestConfig = { ...config };
    if (this.token) {
      requestConfig.headers = {
        Authorization: `Bearer ${this.token}`,
      };
    }
    return this.instance.request(requestConfig);
  }

  async get(path: string): Promise<IApiResponse<never>> {
    return this.request({ url: path, method: 'GET' });
  }

  async post(path: string, data: unknown): Promise<IApiResponse<never>> {
    return this.request({ url: path, method: 'POST', data });
  }

  async patch(
    path: string,
    data: { content: string },
  ): Promise<IApiResponse<never>> {
    return this.request({ url: path, method: 'PATCH', data });
  }

  async delete(path: string): Promise<IApiResponse<never>> {
    return this.request({ url: path, method: 'DELETE' });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public deleteToken() {
    this.token = '';
  }
}
