import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise } from 'axios';
import { ICreateNoteRequest } from './IRequests.interface';

export class ApiClient {
  private instance: AxiosInstance;
  private token = '';

  constructor() {
    this.instance = axios.create({
      // baseURL: 'https://simpleapi.pfizer.keenetic.link',
      baseURL: process.env.BASE_URL,
    });
  }

  private async request(config: AxiosRequestConfig): AxiosPromise {
    const requestConfig = this.getRequestConfig(config);
    return this.instance.request(requestConfig);
  }

  private getRequestConfig(config: AxiosRequestConfig): AxiosRequestConfig {
    const requestConfig = { ...config };
    if (this.token) {
      requestConfig.headers = {
        Authorization: `Bearer ${this.token}`,
      };
    }
    return requestConfig;
  }

  async get(path: string): AxiosPromise {
    return this.request({ url: path, method: 'GET' });
  }

  async post(path: string, data: unknown): AxiosPromise {
    return this.request({ url: path, method: 'POST', data });
  }

  async patch(path: string, data: ICreateNoteRequest): AxiosPromise {
    return this.request({ url: path, method: 'PATCH', data });
  }

  async delete(path: string): AxiosPromise {
    return this.request({ url: path, method: 'DELETE' });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public deleteToken() {
    this.token = '';
  }
}
