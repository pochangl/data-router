import { Subject } from 'rxjs/Subject';

export interface IInputData {}
export interface IOutputData extends IInputData {}

export interface IRouterSubject<T> extends Subject<T> {}

export interface IRouterConfig {}

export interface IRouter<Input, Output> extends IRouterSubject<Input> {
  configure(config: IRouterConfig): void;
}

export interface IStrategy<Input extends IInputData, Output extends IOutputData> {
  /*
    basic strategy for router
  */
  getRoutes(data: Input, router: IRouter<Input, Output>): string[];
  getData(data: Input, router: IRouter<Input, Output>): Output;
  getBranchClass(data: Input): Function;

}
