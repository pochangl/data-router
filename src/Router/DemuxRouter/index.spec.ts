/* tslint:disable:no-unused-expression*/
import { expect } from 'chai';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { DemuxStrategy } from '../../Strategy';
import { DemuxRouter } from './';

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
    return [data.id];
  }
  public getData(data: IInputData): number {
    return data.data;
  }
}

class Router extends DemuxRouter<object, number> {
  protected strategy: Strategy = new Strategy();
}

describe('Demux Router', () => {
  let demux: Router = new Router();

  let output1: number;
  let output2: number;
  let output: object;
  let data1: IInputData = {
    id: '1',
    data: 8,
  };
  let data2: IInputData = {
    id: '2',
    data: 9,
  };
  let subscription1: Subscription = demux.route('1').subscribe(value => {
    output1 = value;
  });
  let subscription2: Subscription = demux.route('2').subscribe(value => {
    output2 = value;
  });
  demux.subscribe(value => {
    output = value;
  });
  demux.next(data1);
  demux.next(data2);

  it('should propagate data1 to output1', () => {
    expect(output1).to.eql(data1.data);
  });
  it('should propagate data2 to output2', () => {
    expect(output2).to.eql(data2.data);
  });
  it('should let demux subscriber receive data2', () => {
    expect(output).to.eql(data2);
  });

  it('should have channel 1', () => {
    expect(demux.hasRoute('1')).to.be.ok;
  });
  it('should have channel2', () => {
    expect(demux.hasRoute('2')).to.be.ok;
  });

  it('should not unhook output1', () => {
    let obs: Subscription = demux.route('1').subscribe(value => undefined);
    obs.unsubscribe();
    demux.cleanup();
    expect(demux.hasRoute('1')).to.be.ok;
  });

  it('should unhook output1', () => {
    subscription1.unsubscribe();
    demux.cleanup();
    expect(demux.hasRoute('1')).to.be.false;
  });
  it('should not affect output2', () => {
    expect(demux.hasRoute('2')).to.be.true;
  });
  it('should unhook output2', () => {
    subscription2.unsubscribe();
    demux.cleanup();
    expect(demux.hasRoute('2')).to.be.false;
  });
});
