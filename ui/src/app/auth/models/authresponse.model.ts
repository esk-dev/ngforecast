import { User } from './../../core/models';
export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}
