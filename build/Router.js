"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
  demux: decode data

*/
const Subject_1 = require("rxjs/Subject");
class DemuxRouter extends Subject_1.Subject {
    constructor(options) {
        super();
        this.routes = {};
    }
    route(id, data) {
        /*
          get the observable Subject to the route
          id is the identifier
          create route if not found
        */
        if (this.routes[id]) {
            return this.routes[id];
        }
        else {
            let branchClass = this.strategy.getBranchClass(data);
            let branch = this.routes[id] = new branchClass();
            return branch;
        }
    }
    hasRoute(id) {
        /*
          check whether the route exist
          unlike route(id, data), this will not create route
        */
        return !!this.routes[id];
    }
    next(content) {
        /*
          send message to all direct subscribers
          and route data to branches
        */
        let { data, route } = this.strategy.unwrap(content);
        super.next(content);
        this.route(route, content).next(data);
    }
    cleanup() {
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
exports.DemuxRouter = DemuxRouter;
//# sourceMappingURL=Router.js.map