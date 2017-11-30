import { Router, Strategy } from '../Router';

export abstract class OneWayStrategy<Input, Output> extends Strategy<Input, Output> {
  public getRouters(data: Input, router: Router<Input, Input>): string[] {
    return ['0'];
  }
  public abstract getData(data: Input): Output;
}
