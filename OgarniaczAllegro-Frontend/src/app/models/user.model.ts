export interface IUser {
  id: number;
  username: string;
  fullName?: string;
}

export const USER: IUser = {
  id: 1,
  username: 'test',
  fullName: 'test',
}