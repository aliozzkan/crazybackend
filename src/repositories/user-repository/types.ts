export interface AddUserBody {
  email: string;
  password: string;
}

export type AddUserRes = Promise<number>;