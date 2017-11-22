import { Subject } from 'rxjs/Subject';
export declare abstract class Strategy<Input, Output> {
    abstract getRoute(data: Input): string;
    abstract getData(data: Input): Output;
    getBranchClass(data: Input): typeof Subject;
}
export declare abstract class DemuxStrategy<Input, Output> extends Strategy<Input, Output> {
    unwrap(data: Input): {
        route: string;
        data: Output;
    };
}
