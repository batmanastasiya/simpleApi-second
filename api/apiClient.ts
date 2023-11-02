import axios from 'axios';

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status < 500) {
      return error.response;
    }
    return Promise.reject(error);
  },
);

export class ApiClient {
  private token: string = '';

  async get(path: string) {
    return await axios.get(`https://simpleapi.pfizer.keenetic.link${path}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  async post(path: string, data: unknown) {
    return await axios.post(
      `https://simpleapi.pfizer.keenetic.link${path}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }

  async patch(path: string, data: { content: string }) {
    return await axios.patch(
      `https://simpleapi.pfizer.keenetic.link${path}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      },
    );
  }

  async delete(path: string) {
    return await axios.delete(`https://simpleapi.pfizer.keenetic.link${path}`, {
      headers: { Authorization: `Bearer ${this.token}` },
    });
  }

  public setToken(token: string) {
    this.token = token;
  }

  public deleteToken() {
    this.token = '';
  }
}
