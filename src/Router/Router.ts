import { Subject } from 'rxjs/Subject';
import { IRouter, IRouterConfig, IStrategy } from './Interface';
import { RouterNode } from './Node';

export abstract class Router<Input, Output> extends RouterNode<Input> implements IRouter<Input, Output> {
  protected abstract strategy: IStrategy<Input, Output>;
}
