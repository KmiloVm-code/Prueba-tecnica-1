export interface User {
  _id: number;
  username: string;
  email: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
