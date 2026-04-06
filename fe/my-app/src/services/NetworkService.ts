import handleAPI from './apis/handleAPI';

export class NetworkService {
    static async requestJson<T>(url: string, options: { method: 'get' | 'post' | 'put' | 'delete', data?: unknown }): Promise<T> {
        const response = await handleAPI<unknown, T>(url, options.data, options.method);
        if (!response) {
            throw new Error('Network request failed or no response');
        }
        return response;
    }
}
