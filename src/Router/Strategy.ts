import { Subject } from 'rxjs/Subject';
import { IRouter, IStrategy } from './Interface';

export abstract class Strategy<Input, Output> implements IStrategy<Input, Output> {
  /*
    basic strategy for router
  */
  public abstract getRoutes(data: Input, router: IRouter<Input, Output>): string[];
  public abstract getData(data: Input, router: IRouter<Input, Output>): Output;

  public getBranchClass(data: Input): typeof Subject {
    return Subject;
  }
}
