import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";

/**
 * Helper class that recieve auctions and calculate the values needed in the app
 */
export default class AuctionHelpers {

  constructor() { }

  public static getTotalAuctions(auctions: Array<IAuction>): number {
    return auctions.length;
  }

  public static getAverageBidsOnAuction(auctions: Array<IAuction>): number {
    return this.getSumBidsOnAuction(auctions) / this.getTotalAuctions(auctions);
  }


  public static getAverageAuctionProgress(auctions: Array<IAuction>): number {
    return this.getSumAuctionProgress(auctions) / this.getTotalAuctions(auctions);
  }

  public static getSumAuctionProgress(auctions: Array<IAuction>): number {
    return auctions
      .map(item => item.currentHighestBidValue * 100 / item.minimumRequiredAsk)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }

  public static getSumBidsOnAuction(auctions: Array<IAuction>): number {
    return auctions
      .map(item => item.numBids)
      .reduce((accumulator, currentValue) => accumulator + currentValue);
  }
}