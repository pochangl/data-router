import { Subject } from 'rxjs/Subject';

export interface IRouterConfig<Input> {
  parent: IRouter<any, Input>; /* tslint:disable-line no-any*/
}

export interface IRouterNode<Input> extends Subject<Input> {
  configure(config: IRouterConfig<Input>): void;
}

export interface IRouter<Input, Output> extends IRouterNode<Input> {
}

export interface IStrategy<Input, Output> {
  /*
    basic strategy for router
  */
  getRoutes(data: Input): string[];
  getData(data: Input): Output;
}
