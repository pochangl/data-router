/*

  Router is a class to determine where the data should go
*/
import { Subject } from 'rxjs/Subject';

export abstract class Strategy<Input, Output> {
  public abstract getRoute(data: Input): string;
  public abstract getData(data: Input): Output;

  public getBranchClass(data: Input): typeof Subject {
    return Subject;
  }
}

export abstract class DemuxStrategy<Input, Output> extends Strategy<Input, Output> {
  public unwrap(data: Input): {route: string; data: Output} {
    return {
      route: this.getRoute(data),
      data: this.getData(data),
    };
  }
}
