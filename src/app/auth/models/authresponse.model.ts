import { User } from './../../core/models';
export interface AuthResponse {
  accessToken: string;
  refresfToken: string;
  user: User;
}
