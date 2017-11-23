import { Strategy } from '../Strategy';
import { RouterSubject } from '../Subject';

export interface IRouterConfig {
}

export abstract class Router<Input, Output> extends RouterSubject<Input> {
  protected abstract strategy: Strategy<Input, Output>;
  public configure(config: IRouterConfig): void {
    return;
  }
}
