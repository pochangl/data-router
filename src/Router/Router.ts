import { Subject } from 'rxjs/Subject';
import { IRouter, IRouterConfig, IStrategy } from './Interface';

export abstract class Router<Input, Output> extends Subject<Input> implements IRouter<Input, Output> {
  protected abstract strategy: IStrategy<Input, Output>;
  public configure(config: IRouterConfig): void {
    return;
  }
}
