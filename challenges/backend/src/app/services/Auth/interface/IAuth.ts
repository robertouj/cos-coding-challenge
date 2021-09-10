/**
 * This service describes an interface to get authentication from the CarOnSale API.
 */
export interface IAuth {

    getAuthToken(): Promise<string>;

    getUserId(): string;

    isValidToken(token: string): Promise<boolean>;

}