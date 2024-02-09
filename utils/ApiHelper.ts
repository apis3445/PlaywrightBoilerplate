import { APIRequestContext, APIResponse, Page } from '@playwright/test';
import { request } from '@playwright/test';

export class ApiHelper {


    constructor(private page: Page, private baseUrl: string) {

    }

    /**
     * Create a request with token from localStorage
     */
    async createRequest(baseURL: string) {
        const apiRequest: APIRequestContext = await request.newContext({
            baseURL: baseURL
            // extraHTTPHeaders: {
            //     'Authorization': `Bearer ${token}`,
            // }
        });
        return apiRequest;
    }

    /**
     * Wait for response from url contains the api url
     * @param apiUrl api url to wait until get the response 
     * @param statusCode Status code returned by the api
     * @returns responsePromise
     */
    async waitForResponse(apiUrl: string, statusCode = 200, method: 'POST' | 'GET' | 'PUT' | 'DELETE' = 'POST') {
        const responsePromise = this.page.waitForResponse(response => response.url().includes(apiUrl) && response.request().method() == method
            && response.status() == statusCode);
        return responsePromise;
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post(url: string, data: any): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.post(url, { data: data });
    }

    /**
     * Call to api post
     * @param url post url (not base url is needed)
     * @param data data to post
     * @returns 
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async put(url: string, data: any): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.put(url, { data: data });
    }

    /**
     * Call to api delete
     * @param url delete url (not base url is needed)
     * @returns 
     */
    async delete(url: string): Promise<APIResponse> {
        const apiRequest = await this.createRequest(this.baseUrl);
        return await apiRequest.delete(url);
    }

} 