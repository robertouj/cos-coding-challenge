import { assert } from 'chai';
import { CarOnSaleClient } from "../CarOnSaleClient";
import { ICarOnSaleClient } from "../../interface/ICarOnSaleClient";
import { DependencyIdentifier } from "../../../../DependencyIdentifiers";
import { Container } from "inversify";

// define related test blocks
describe('CarOnSaleClient tests using ASSERT inteface from CHAI module: ', () => {

  let carOnSaleClient: ICarOnSaleClient;

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
    container.bind<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT).to(CarOnSaleClient);

    /*
     * Inject all dependencies in the application & retrieve application instance.
     */
    carOnSaleClient = container.get<ICarOnSaleClient>(DependencyIdentifier.CARONSALECLIENT);
    

  });

  describe('Check getRunningAuctions() Function from ICarOnSaleClient: ', () => {

    it('Check array returned value using: assert.notEqual;', async () => {
      let result;
      result = await carOnSaleClient.getRunningAuctions();
      assert.typeOf(result, 'array');
    });
  });
});