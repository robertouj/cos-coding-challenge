import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IAuction } from "../interface/IAuction";
import { inject, injectable } from "inversify";
import { DependencyIdentifier } from "../../../DependencyIdentifiers";
import { ILogger } from "../../../services/Logger/interface/ILogger";
import { IAuth } from "../../../services/Auth/interface/IAuth";
import { ConfigGlobals } from "../../../ConfigGlobals";
import axios from "axios";
import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUTH) private auth: IAuth) {
    }

    public async getRunningAuctions(): Promise<Array<IAuction>> {
        try {
            const result = await axios
                .get(`${ConfigGlobals.API_COS}${ConfigGlobals.API_COS_GET_AUCTIONS}`, {
                    headers: {
                        userid: this.auth.getUserId(),
                        authtoken: await this.auth.getAuthToken()
                    }
                });
            return result.data.items;
        } catch (error) {
            this.logger.log(<string>error);
            process.exit(-1);
            return [];
        }
    }
}