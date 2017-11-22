"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable:no-unused-expression*/
const chai_1 = require("chai");
const Router_1 = require("./Router");
const Strategy_1 = require("./Strategy");
class Strategy extends Strategy_1.DemuxStrategy {
    getRoute(data) {
        return data.id;
    }
    getData(data) {
        return data.data;
    }
}
class Router extends Router_1.DemuxRouter {
    constructor() {
        super(...arguments);
        this.strategy = new Strategy();
    }
}
describe('demux', () => {
    let demux = new Router();
    let output1;
    let output2;
    let output;
    let data1 = {
        id: '1',
        data: 8,
    };
    let data2 = {
        id: '2',
        data: 9,
    };
    let subscription1 = demux.route('1').subscribe(value => {
        output1 = value;
    });
    let subscription2 = demux.route('2').subscribe(value => {
        output2 = value;
    });
    demux.subscribe(value => {
        output = value;
    });
    demux.next(data1);
    demux.next(data2);
    it('should propagate data1 to output1', () => {
        chai_1.expect(output1).to.eql(data1.data);
    });
    it('should propagate data2 to output2', () => {
        chai_1.expect(output2).to.eql(data2.data);
    });
    it('should let demux subscriber receive data2', () => {
        chai_1.expect(output).to.eql(data2);
    });
    it('should have channel 1', () => {
        chai_1.expect(demux.hasRoute('1')).to.be.ok;
    });
    it('should have channel2', () => {
        chai_1.expect(demux.hasRoute('2')).to.be.ok;
    });
    it('should not unhook output1', () => {
        let obs = demux.route('1').subscribe(value => undefined);
        obs.unsubscribe();
        demux.cleanup();
        chai_1.expect(demux.hasRoute('1')).to.be.ok;
    });
    it('should unhook output1', () => {
        subscription1.unsubscribe();
        demux.cleanup();
        chai_1.expect(demux.hasRoute('1')).to.be.false;
    });
    it('should not affect output2', () => {
        chai_1.expect(demux.hasRoute('2')).to.be.true;
    });
    it('should unhook output2', () => {
        subscription2.unsubscribe();
        demux.cleanup();
        chai_1.expect(demux.hasRoute('2')).to.be.false;
    });
});
//# sourceMappingURL=Router.spec.js.map