import { IAuth } from "../interface/IAuth";
import { inject, injectable } from "inversify";
import { ILogger } from "../../../services/Logger/interface/ILogger";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import "reflect-metadata";
import { ConfigGlobals } from "../../../ConfigGlobals";
import axios from "axios";

/**
 * Service that provide authorization to the CarOnSale API using the test user
 */
@injectable()
export class HardcodedAuth implements IAuth {

    private authToken = '';
    private userId = ConfigGlobals.HARCODED_USER;

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger) {
    }

    public getUserId() {
        return this.userId;
    }

    /**
     * Get the authToken of the user
     */
    public async getAuthToken(): Promise<string> {
        if (await this.isValidToken(this.authToken)) {
            return this.authToken;
        }

        const result = await axios
            .put(`${ConfigGlobals.API_COS}${ConfigGlobals.API_COS_AUTH}${ConfigGlobals.HARCODED_USER}`, {
                password: ConfigGlobals.HARDCODED_PASS,
            });
        this.authToken = result.data.token;
        return this.authToken;
    }

    /**
     * Check if the token exist previously and valid the availability of the token
     * with the API service
     */
    public async isValidToken(token: string = ''): Promise<boolean> {
        if (token === '') {
            return false;
        }

        try {
            const result = await axios
                .post(`${ConfigGlobals.API_COS}${ConfigGlobals.API_COS_AUTH}${ConfigGlobals.HARCODED_USER}`, {
                    token: token,
                });
            if (result.status == 200) {
                return true;
            }
            return false;
        } catch (error) {
            this.logger.log(<string>error);
            process.exit(-1);
            return false;
        }
    };

}