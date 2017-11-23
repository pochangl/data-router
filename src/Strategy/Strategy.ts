export * from './AttributeStrategy';
export * from './DemuxStrategy';
import { IInputData, IOutputData } from '../Data';
import { Router } from '../Router';
import { RouterSubject } from '../Subject';

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
