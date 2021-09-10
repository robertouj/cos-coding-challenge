import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import AuctionHelpers from "./AuctionHelpers";
import "reflect-metadata";

@injectable()
export class AuctionMonitorApp {

    public constructor(
        @inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.CARONSALECLIENT) private carOnSaleClient: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {
        this.logger.log(`Auction Monitor started.`);

        // TODO: Retrieve auctions and display aggregated information (see README.md)
        const auctions = await this.carOnSaleClient.getRunningAuctions();
        this.logger.log(`Total Auctions: ${AuctionHelpers.getTotalAuctions(auctions)}`);
        this.logger.log(`Average number of bids on an auction: ${AuctionHelpers.getAverageBidsOnAuction(auctions)}`);
        this.logger.log(`Average percentage of the auction progress: ${AuctionHelpers.getAverageAuctionProgress(auctions).toFixed(2)}%`);
    }
}
