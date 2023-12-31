import { type ApiClient, type Config, type Url } from '../clients/ApiClient';

const paramsToString = (params?: URLSearchParams) => (params ? `?${params}` : '');

type CreateClientOptions = { baseURL: string; headers: HeadersInit };

export const createFetchClient = (options: Partial<CreateClientOptions> = {}): ApiClient => {
  const baseURL = options.baseURL ?? '';
  const headers = options.headers ?? {};

  return {
    async get<D = unknown>(url: Url, config?: Partial<Config>) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = { ...headers, ...config?.headers };
      const response = await fetch(fetchUrl, { headers: fetchHeaders, method: 'GET' });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D };
      } else {
        throw responseBody;
      }
    },

    async post<D = unknown, B = unknown>(url: Url, body?: B, config?: Partial<Config>) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = { 'content-type': 'application/json;charset=UTF-8', ...headers, ...config?.headers };
      const response = await fetch(fetchUrl, {
        headers: fetchHeaders,
        method: 'POST',
        body: JSON.stringify(body ?? {}),
        credentials: 'include',
      });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D };
      } else {
        throw responseBody;
      }
    },

    async patch<D = unknown, B = unknown>(url: Url, body?: B, config?: Partial<Config>) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = { 'content-type': 'application/json;charset=UTF-8', ...headers, ...config?.headers };
      const response = await fetch(fetchUrl, { headers: fetchHeaders, method: 'PATCH', body: JSON.stringify(body) });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D };
      } else {
        throw responseBody;
      }
    },

    async delete<D = unknown>(url: Url, config?: Partial<Config>) {
      const fetchUrl = `${baseURL}${url}${paramsToString(config?.params)}`;
      const fetchHeaders = { ...headers, ...config?.headers };
      const response = await fetch(fetchUrl, { headers: fetchHeaders, method: 'DELETE' });
      const responseBody = await response.json().catch(() => null);

      if (response.ok) {
        return { data: responseBody as D };
      } else {
        throw responseBody;
      }
    },
  };
};
