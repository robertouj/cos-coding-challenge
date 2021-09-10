import { assert } from 'chai';
import { CarOnSaleClient } from "../CarOnSaleClient";
import { ICarOnSaleClient } from "../../interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../../DependencyIdentifiers";
import { Container } from "inversify";
import { IAuth } from "../../../Auth/interface/IAuth";
import { HardcodedAuth } from "../../../Auth/classes/HardcodedAuth";
import { ILogger } from "../../../Logger/interface/ILogger";
import { Logger } from "../../../Logger/classes/Logger";
import AuctionHelpers from "../../../../AuctionHelpers";
import { IAuction } from '../../interface/IAuction';

// define related test blocks
describe('CarOnSaleClient tests using ASSERT inteface from CHAI module: ', () => {

  let carOnSaleClient: ICarOnSaleClient;
  let hardcodedAuth: IAuth;
  let mockedAuctions: Array<IAuction> = [
    {
      id: 16943,
      numBids: 64,
      minimumRequiredAsk: 5279,
      currentHighestBidValue: 434

    },
    {
      id: 16944,
      numBids: 3,
      minimumRequiredAsk: 12216,
      currentHighestBidValue: 243
    },
    {
      id: 16945,
      numBids: 7,
      minimumRequiredAsk: 19520,
      currentHighestBidValue: 852
    },
    {
      id: 16946,
      numBids: 94,
      minimumRequiredAsk: 2937,
      currentHighestBidValue: 928
    },
  ];

  beforeEach(() => {
    /*
     * Create the DI container.
     */
    const container = new Container({
      defaultScope: "Singleton",
    });

    /*
     * Register dependencies in DI environment.
     */
    container.bind<ILogger>(DependencyIdentifier.LOGGER).to(Logger);
    container.bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT).to(CarOnSaleClient);
    container.bind<IAuth>(DependencyIdentifier.AUTH).to(HardcodedAuth);

    /*
     * Inject all dependencies in the application & retrieve application instance.
     */
    carOnSaleClient = container.get<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT);
    hardcodedAuth = container.get<IAuth>(DependencyIdentifier.AUTH);

  });

  /**
   * Tests for calculations 
   */
  describe('Check Helper class AuctionHelpers: ', () => {

    describe('Check getTotalAuctions() Function: ', () => {
      it('Check the returned value using: assert.equal;', () => {
        const result = AuctionHelpers.getTotalAuctions(mockedAuctions);
        assert.equal(result, 4);
      });
    });

    describe('Check getAverageBidsOnAuction() Function: ', () => {
      it('Check the returned value using: assert.equal;', () => {
        const result = AuctionHelpers.getAverageBidsOnAuction(mockedAuctions);
        assert.equal(result, 42);
      });
    });

    describe('Check getAverageAuctionProgress() Function: ', () => {
      it('Check the returned value using: assert.equal;', () => {
        const result = AuctionHelpers.getAverageAuctionProgress(mockedAuctions);
        assert.equal(result, 11.543017543671416);
      });
    });

  });

  /**
   * Tests for get auctions service 
   */
  describe('Check getRunningAuctions() Function from ICarOnSaleClient: ', () => {

    it('Check array returned value using: assert.notEqual;', async () => {
      let result;
      result = await carOnSaleClient.getRunningAuctions();
      assert.typeOf(result, 'array');
    });
  });

  /**
   * Tests for authoritation service 
   */
  describe('Check Functions from HardcodedAuth: ', () => {
    describe('Check getAuthToken() Function from HardcodedAuth: ', () => {

      it('Check string returned value using: assert.notEqual;', async () => {
        let result;
        result = await hardcodedAuth.getAuthToken();
        assert.typeOf(result, 'string');
      });
    });

    describe('Check isValidToken() Function from HardcodedAuth: ', () => {

      it('Check boolean returned value using: assert.notEqual;', async () => {
        let result;
        result = await hardcodedAuth.isValidToken("");
        assert.typeOf(result, 'boolean');
      });
    });
  });
});