export interface User {
  email: string;
  isActivated: boolean;
  id: string;
}
export interface AuthResponse {
  accessToken: string;
  refresfToken: string;
  user: User;
}
