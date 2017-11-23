import { IDemuxRouter, IDemuxStrategy} from '../DemuxRouter';

export interface IAttributeRouterStrategy<Input, Output> extends IDemuxStrategy<Input, Output> {}

export interface IAttributeRouter<Input, Output> extends IDemuxRouter<Input, Output> {
  dataAttribute: string;
  routingAttribute: string;
}
