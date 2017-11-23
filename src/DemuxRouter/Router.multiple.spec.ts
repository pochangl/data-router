import { expect } from 'chai';
import { Subscription } from 'rxjs/Subscription';
import { DemuxRouter } from './';
import { DemuxStrategy } from './Strategy';

interface IInputData {
  /*
    data format for testing
  */
  id: string;
  data: number;
}

class Strategy extends DemuxStrategy<IInputData, number> {
  /*
    use data.id as routing reference
    and data.data as pass on data
  */
  public getRoutes(data: IInputData): string[] {
    return [data.id, data.id + 'd'];
  }
  public getData(data: IInputData): number {
    return data.data;
  }
}

class Router extends DemuxRouter<object, number> {
  protected strategy: Strategy = new Strategy();
}

describe('Demux Router with multi-path data', () => {
  let data: IInputData = {
    id: '1',
    data: 8,
  };
  let output1: number;
  let output1d: number;
  let outputCount: number = 0;
  let demux: Router = new Router();
  demux.route('1').subscribe(value => {
    output1 = value;
  });
  demux.route('1d').subscribe(value => {
    output1d = value;
  });
  demux.subscribe(value => {
    outputCount ++;
  });
  demux.next(data);

  it('should listen to route 1', () => {
    expect(output1).to.eql(8);
  });
  it('should also listen to second route 1d', () => {
    expect(output1d).to.eql(8);
  });
  it('next should fire only once on subscribers', () => {
    expect(outputCount).to.eql(1);
  });
});
