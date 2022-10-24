import { User } from './../../models/user.model';
export interface AuthResponse {
  accessToken: string;
  refresfToken: string;
  user: User;
}
