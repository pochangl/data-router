/*

  Router is a class to determine where the data should go
*/
import { Strategy } from '../Strategy';

export interface IDemuxUnwrappedData<OutputData> {
  routes: string[];
  data: OutputData;
}

export abstract class DemuxStrategy<Input, Output> extends Strategy <Input, Output> {
  public unwrap(data: Input): IDemuxUnwrappedData<Output> {
    return {
      routes: this.getRoutes(data),
      data: this.getData(data),
    };
  }
}
