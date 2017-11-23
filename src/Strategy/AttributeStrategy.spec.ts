import { expect } from 'chai';
import { AttributeStrategy } from './AttributeStrategy';
import { IDemuxUnwrappedData } from './DemuxStrategy';

interface IInputData {
  key: string;
  data: number;
}

class Strategy extends AttributeStrategy<IInputData, number> {
  protected dataAttribute: string = 'data';
  protected routingAttribute: string = 'key';
}

describe('class AttributeStrategy', () => {
  let strategy: Strategy = new Strategy();
  let data: IInputData = {
    key: '90',
    data: 80,
  };
  it('should retrieve correct route and data', () => {
    let unwrapped: IDemuxUnwrappedData<number> = strategy.unwrap(data);
    expect(unwrapped.data).to.be.eql(data.data);
    expect(unwrapped.routes).to.be.eql([data.key]);
  });
});
