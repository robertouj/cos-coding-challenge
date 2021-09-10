import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IAuction } from "../interface/IAuction";
import { injectable } from "inversify";

import "reflect-metadata";

@injectable()
export class CarOnSaleClient implements ICarOnSaleClient {

    public constructor() {
    }

    public async getRunningAuctions(): Promise<Array<IAuction>> {
        return [];
    }
}