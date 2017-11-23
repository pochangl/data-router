import { DemuxStrategy } from '../DemuxRouter';
import { IAttributeRouter } from './Interface';

export class AttributeStrategy<Input, Output> extends DemuxStrategy<Input, Output> {
  public getRoutes(data: Input, router: IAttributeRouter<Input, Output>): string[] {
    return [data[router.routingAttribute]];
  }
  public getData(data: Input, router: IAttributeRouter<Input, Output>): Output {
    return data[router.dataAttribute];
  }
}
