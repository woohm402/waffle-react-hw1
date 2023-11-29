export type Url = string;
export type Headers = { [key: string]: string };
export type Config = { headers: Headers; params: URLSearchParams };

export type ApiClient = {
  get<D = unknown>(url: Url, config?: Partial<Config>): Promise<{ data: D }>;
  post<D = unknown, B = unknown>(url: Url, body?: B, config?: Partial<Config>): Promise<{ data: D }>;
  put<D = unknown, B = unknown>(url: Url, body?: B, config?: Partial<Config>): Promise<{ data: D }>;
  delete<D = unknown>(url: Url, config?: Partial<Config>): Promise<{ data: D }>;
};
