export interface ICreateUserRequest {
  name: string;
  username: string;
  password1: string;
  password2: string;
}

export interface ILoginRequest {
  username: string | undefined;
  password: string | undefined;
}

export interface ICreateNoteRequest {
  content: string;
}
