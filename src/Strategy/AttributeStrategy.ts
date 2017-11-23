import { DemuxStrategy } from './DemuxStrategy';

export abstract class AttributeStrategy<Input, Output> extends DemuxStrategy<Input, Output> {
  protected abstract dataAttribute: string;
  protected abstract routingAttribute: string;

  public getRoutes(data: Input): string[] {
    return [data[this.routingAttribute]];
  }
  public getData(data: Input): Output {
    return data[this.dataAttribute];
  }
}
