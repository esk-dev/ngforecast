export interface User {
  email: string;
  isActivated: boolean;
  id: string;
  favoriteCities: Array<string | null>;
}
