import { IRouter, IRouterSubject, IStrategy } from '../Router';

export interface IDemuxRoute<Output> {
  [route: string]: IRouterSubject<Output>;
}

export interface IDemuxUnwrappedData<OutputData> {
  routes: string[];
  data: OutputData;
}

export interface IDemuxStrategy<Input, Output> extends IStrategy<Input, Output> {
  unwrap(data: Input, router: IDemuxRouter<Input, Output>): IDemuxUnwrappedData<Output>;
}

export interface IDemuxRouter<Input, Output> extends IRouter<Input, Output> {
  route(id: string, data?: Input): IRouterSubject<Output>;
  hasRoute(id: string): boolean;
  next(content: Input): void;
  cleanup(): void;
}
