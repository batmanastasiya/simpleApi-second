export interface ICreateUserRequest {
  name: string;
  username: string;
  password1: string;
  password2: string;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ICreateNoteRequest {
  content: string;
}
