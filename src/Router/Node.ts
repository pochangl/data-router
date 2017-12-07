import { Subject } from 'rxjs/Subject';
import { IRouterConfig, IRouterNode } from './Interface';

export abstract class RouterNode<Input> extends Subject<Input> implements IRouterNode<Input> {
  protected parent: IRouterNode<Input>;

  public configure(config: IRouterConfig<Input>): void {
    if (config.parent) {
      this.parent = config.parent;
    }
  }
}
