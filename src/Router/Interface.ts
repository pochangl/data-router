import { Subject } from 'rxjs/Subject';

export interface IRouterConfig {}

export interface IRouter<Input, Output> extends Subject<Input> {
  configure(config: IRouterConfig): void;
}

export interface IStrategy<Input, Output> {
  /*
    basic strategy for router
  */
  getRoutes(data: Input, router: IRouter<Input, Output>): string[];
  getData(data: Input, router: IRouter<Input, Output>): Output;
  getBranchClass(data: Input): Function;

}
