import { Subject } from 'rxjs/Subject';
import { IRouter, IRouterNode,  IStrategy } from './Interface';
import { RouterNode } from './Node';

export abstract class Strategy<Input, Output> implements IStrategy<Input, Output> {
  /*
    basic strategy for router
  */
  public abstract getRoutes(data: Input): string[];
  public abstract getData(data: Input): Output;
}
