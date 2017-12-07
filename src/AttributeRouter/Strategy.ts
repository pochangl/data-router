import { DemuxStrategy } from '../DemuxRouter';
import { IAttributeRouter, IAttributeRouterStrategy } from './Interface';

export class AttributeStrategy<Input, Output> extends DemuxStrategy<Input, Output> implements IAttributeRouterStrategy<Input, Output> {
  protected router: IAttributeRouter<Input, Output>;

  public getRoutes(data: Input): string[] {
    return [data[this.router.routingAttribute]];
  }

  public getData(data: Input): Output {
    return data[this.router.dataAttribute];
  }
}
