/*
  demux: decode data

*/
import { Subject } from 'rxjs/Subject';
import { DemuxStrategy } from './Strategy';

interface IChannelToSubjectMap<Key, Type> {
  [channel: string]: Subject<Type>;
}

export abstract class DemuxRouter<Input, Output> extends Subject<Input> {
  protected abstract strategy: DemuxStrategy<Input, Output>;
  protected routes: IChannelToSubjectMap<string, Output>;

  constructor(options?: object) {
    super();
    this.routes = {};
  }
  public route(id: string, data?: Input): Subject<Output> {
    if (this.routes[id]) {
      return this.routes[id];
    } else {
      let branchClass: typeof Subject = this.strategy.getBranchClass(data);
      let branch: Subject<Output> = this.routes[id] = new branchClass();
      return branch;
    }
  }
  public hasRoute(id: string): boolean {
    return !!this.routes[id];
  }
  public next(content: Input): void {
    /*
      send message to subscribers
      and route data to branches
    */
    let {data, route} = this.strategy.unwrap(content);
    super.next(content);
    this.route(route, content).next(data);
  }
  public cleanup(): void {
    /*
      cleanup all route with no subscribers
    */
    for (const route of Object.keys(this.routes)) {
      if (this.routes[route].observers.length <= 0) {
        delete this.routes[route];
      }
    }
  }
}
