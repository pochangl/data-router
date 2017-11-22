import { RouterSubject } from './Subject';
import { IOutputData, IInputData } from './Data';


export abstract class Strategy<Input extends IInputData, Output extends IOutputData> {
  /*
    basic strategy for router
  */
  public abstract getRoutes(data: Input): string[];
  public abstract getData(data: Input): Output;

  public getBranchClass(data: Input): typeof RouterSubject {
    return RouterSubject;
  }
}
