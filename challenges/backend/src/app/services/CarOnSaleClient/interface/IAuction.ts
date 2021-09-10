/**
 * This interface describes the auction object returned by the CarOnSale API.
 */
export interface IAuction {

  id: number

  numBids: number,

  currentHighestBidValue: number,

  minimumRequiredAsk: number

}
