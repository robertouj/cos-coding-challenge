import { assert } from 'chai';
import { CarOnSaleClient } from "../CarOnSaleClient";
import { ICarOnSaleClient } from "../../interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../../DependencyIdentifiers";
import { Container } from "inversify";
import { IAuth } from "../../../Auth/interface/IAuth";
import { HardcodedAuth } from "../../../Auth/classes/HardcodedAuth";
import { ILogger } from "../../../Logger/interface/ILogger";
import { Logger } from "../../../Logger/classes/Logger";

// define related test blocks
describe('CarOnSaleClient tests using ASSERT inteface from CHAI module: ', () => {

  let carOnSaleClient: ICarOnSaleClient;
  let hardcodedAuth: IAuth;

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

  describe('Check getRunningAuctions() Function from ICarOnSaleClient: ', () => {

    it('Check array returned value using: assert.notEqual;', async () => {
      let result;
      result = await carOnSaleClient.getRunningAuctions();
      assert.typeOf(result, 'array');
    });
  });

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