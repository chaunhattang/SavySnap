/** @format */

import axiosClient from './axiosClient';

/**
 * Makes an API request using axiosClient.
 *
 * @param url - The endpoint URL.
 * @param data - The request payload (optional).
 * @param method - HTTP method ('post', 'put', 'get', 'delete'). Defaults to 'get'.
 * @param isFile - Set to true if sending files (uses 'multipart/form-data').
 * @returns The response from the API.
 *
 * @example
 * // GET request
 * const response = await handleAPI('/users');
 *
 * // POST request with JSON
 * const response = await handleAPI('/users', { name: 'John' }, 'post');
 *
 * // POST request with file
 * const formData = new FormData();
 * formData.append('file', fileInput.files[0]);
 * const response = await handleAPI('/upload', formData, 'post', true);
 */
const handleAPI = async <T = unknown, R = unknown>(
	url: string,
	data?: T,
	method: 'post' | 'put' | 'get' | 'delete' = 'get',
	isFile?: boolean
): Promise<R | undefined> => {
	if (!url) return undefined;

	return (await axiosClient(url, {
		method,
		data,
		headers: {
			'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
		},
	})) as R;
};

export default handleAPI;
