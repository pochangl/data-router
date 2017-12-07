import { Subject } from 'rxjs/Subject';
import { IRouter, IRouterConfig, IRouterNode, IStrategy } from '../Router';

export interface IDemuxRouterConfig<ParentInput> extends IRouterConfig<ParentInput> {
  demux: {
    branch: string;
  };
}

export interface IDemuxNode<Input> extends IRouterNode<Input> {
  configure(config: IDemuxRouterConfig<Input>): void;
}

export interface IDemuxRoute<Output> {
  [route: string]: IDemuxNode<Output>;
}

export interface IDemuxUnwrappedData<OutputData> {
  routes: string[];
  data: OutputData;
}

export interface IDemuxStrategyConfig<Input, Output> {
  router: IDemuxRouter<Input, Output>;
}

export interface IDemuxStrategy<Input, Output> extends IStrategy<Input, Output> {
  createBranch(branch: string, data: Input): IDemuxNode<Output>;
  unwrap(data: Input): IDemuxUnwrappedData<Output>;
  configure(config: IDemuxStrategyConfig<Input, Output>): void;
}

export interface IDemuxRouter<Input, Output> extends IRouter<Input, Output>, IDemuxNode<Input> {
  route(id: string, data?: Input): IDemuxNode<Output>;
  hasRoute(id: string): boolean;
  next(content: Input): void;
  cleanup(): void;
  configure(config: IDemuxRouterConfig<Input>): void;
}
