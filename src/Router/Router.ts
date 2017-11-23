import { IRouter, IRouterConfig, IRouterSubject, IStrategy } from './Interface';
import { RouterSubject } from './Subject';

export abstract class Router<Input, Output> extends RouterSubject<Input> implements IRouter<Input, Output> {
  protected abstract strategy: IStrategy<Input, Output>;
  public configure(config: IRouterConfig): void {
    return;
  }
}
