import { IInputData, IOutputData, IRouter, IStrategy } from './Interface';
import { RouterSubject } from './Subject';

export abstract class Strategy<Input extends IInputData, Output extends IOutputData> implements IStrategy<Input, Output> {
  /*
    basic strategy for router
  */
  public abstract getRoutes(data: Input, router: IRouter<Input, Output>): string[];
  public abstract getData(data: Input, router: IRouter<Input, Output>): Output;

  public getBranchClass(data: Input): typeof RouterSubject {
    return RouterSubject;
  }
}
