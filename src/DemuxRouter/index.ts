/*
  demux: decode data

*/
import { Router } from '../Router';
import { RouterSubject } from '../Subject';
import { DemuxStrategy } from './Strategy';
export * from './Strategy';

export interface IDemuxRoute<Output> {
  [route: string]: RouterSubject<Output>;
}

export abstract class DemuxRouter<Input, Output> extends Router<Input, Output> {
  protected abstract strategy: DemuxStrategy<Input, Output>;
  protected routes: IDemuxRoute<Output>;

  constructor(options?: object) {
    super();
    this.routes = {};
  }
  public route(id: string, data?: Input): RouterSubject<Output> {
    /*
      get the observable Subject to the route
      id is the identifier
      create route if not found
    */
    if (this.routes[id]) {
      return this.routes[id];
    } else {
      let branchClass: typeof RouterSubject = this.strategy.getBranchClass(data);
      let branch: RouterSubject<Output> = this.routes[id] = new branchClass();
      return branch;
    }
  }
  public hasRoute(id: string): boolean {
    /*
      check whether the route exist
      unlike route(id, data), this will not create route
    */
    return !!this.routes[id];
  }
  public next(content: Input): void {
    /*
      send message to all direct subscribers
      and route data to branches
    */
    let {data, routes} = this.strategy.unwrap(content);
    super.next(content);
    for (let route of routes) {
      this.route(route, content).next(data);
    }
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
