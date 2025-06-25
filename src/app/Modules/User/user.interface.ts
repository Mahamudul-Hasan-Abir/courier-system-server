import { Model } from "mongoose";

export type UserRole = "admin" | "agent" | "customer";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface TUserModel extends Model<IUser> {
  isUserExist(id: string): Promise<IUser | null>;
  isPasswordMatched(
    plainPassword: string,
    hasedPasswrod: string
  ): Promise<boolean>;
}
