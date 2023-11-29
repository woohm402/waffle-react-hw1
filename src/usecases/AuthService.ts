export type AuthService = {
  getToken: () => Promise<{ token: string }>;
  login: (username: string, password: string) => Promise<{ token: string }>;
};
