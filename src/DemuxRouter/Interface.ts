import { Subject } from 'rxjs/Subject';
import { IRouter, IStrategy } from '../Router';

export interface IDemuxRoute<Output> {
  [route: string]: Subject<Output>;
}

export interface IDemuxUnwrappedData<OutputData> {
  routes: string[];
  data: OutputData;
}

export interface IDemuxStrategy<Input, Output> extends IStrategy<Input, Output> {
  unwrap(data: Input, router: IDemuxRouter<Input, Output>): IDemuxUnwrappedData<Output>;
}

export interface IDemuxRouter<Input, Output> extends IRouter<Input, Output> {
  route(id: string, data?: Input): Subject<Output>;
  hasRoute(id: string): boolean;
  next(content: Input): void;
  cleanup(): void;
}
