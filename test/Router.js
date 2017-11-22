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
        return !!this.routes[id];
    }
    next(content) {
        /*
          send message to subscribers
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