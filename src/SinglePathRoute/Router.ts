import { Router } from '../Router';
import { OneWayStrategy } from './Strategy';

export abstract class OneWayRouter<Input, Output> extends Router<Input, Output> {
  protected abstract strategy: OneWayStrategy<Input, Output>;
}
