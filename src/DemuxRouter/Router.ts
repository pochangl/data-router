/*
  demux: decode data

*/
import { Subject } from 'rxjs/Subject';
import { Router } from '../Router';
import { IDemuxNode, IDemuxRoute, IDemuxRouter, IDemuxRouterConfig } from './Interface';
import { DemuxNode } from './Node';
import { DemuxStrategy } from './Strategy';

export abstract class DemuxRouter<Input, Output> extends Router<Input, Output> implements IDemuxRouter<Input, Output> {
  protected strategy: DemuxStrategy<Input, Output>;
  protected routes: IDemuxRoute<Output>;

  constructor() {
    super();
    this.routes = {};
  }
  public route(id: string, data?: Input): IDemuxNode<Output> {
    /*
      get the observable Subject to the route
      id is the identifier
      create route if not found
    */
    if (this.routes[id]) {
      return this.routes[id];
    } else {
      this.routes[id] = this.strategy.createBranch(id, data);
      let branch: IDemuxNode<Output> = this.routes[id];
      branch.configure({
        parent: this,
        demux: {
          branch: id,
        },
      });
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
