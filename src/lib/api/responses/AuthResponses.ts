import { User } from "../models/user";

export interface AuthResponse {
  user: User | null;
  token: string | null;
}
