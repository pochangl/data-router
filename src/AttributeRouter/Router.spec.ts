import { expect } from 'chai';
import { IDemuxUnwrappedData } from '../DemuxRouter';
import { AttributeRouter } from './Router';

interface IInputData {
  key: string;
  data: number;
}

class Router extends AttributeRouter<IInputData, number> {
  public dataAttribute: string = 'data';
  public routingAttribute: string = 'key';
}

describe('class AttributeStrategy', () => {
  let router: Router = new Router();
  let data: IInputData = {
    key: '90',
    data: 80,
  };
  it('should retrieve correct route and data', () => {
    router.subscribe(value => {
      expect(value).to.be.eql(data);
    });
    router.next(data);
  });
});
