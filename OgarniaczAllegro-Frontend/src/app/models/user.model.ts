export interface IUser {
  id: number;
  username: string;
  fullName?: string;
  lastNumberOfOrders?: number
}

export const CURRENT_USER: IUser = {
  id: 1,
  username: 'test',
  fullName: 'test',
}