"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*

  Router is a class to determine where the data should go
*/
const Subject_1 = require("rxjs/Subject");
class Strategy {
    getBranchClass(data) {
        return Subject_1.Subject;
    }
}
exports.Strategy = Strategy;
class DemuxStrategy extends Strategy {
    unwrap(data) {
        return {
            route: this.getRoute(data),
            data: this.getData(data),
        };
    }
}
exports.DemuxStrategy = DemuxStrategy;
//# sourceMappingURL=Strategy.js.map