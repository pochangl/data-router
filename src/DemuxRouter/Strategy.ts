/*

  Router is a class to determine where the data should go
*/
import { Strategy } from '../Router';
import { IDemuxRouter, IDemuxStrategy, IDemuxUnwrappedData } from './Interface';

export abstract class DemuxStrategy<Input, Output> extends Strategy<Input, Output> implements IDemuxStrategy<Input, Output> {
  public unwrap(data: Input, router: IDemuxRouter<Input, Output>): IDemuxUnwrappedData<Output> {
    return {
      routes: this.getRoutes(data, router),
      data: this.getData(data, router),
    };
  }
}
