import { Subject } from 'rxjs/Subject';
import { DemuxStrategy } from './Strategy';
export interface IStringToOutputMap<Output> {
    [route: string]: Subject<Output>;
}
export declare abstract class DemuxRouter<Input, Output> extends Subject<Input> {
    protected abstract strategy: DemuxStrategy<Input, Output>;
    protected routes: IStringToOutputMap<Output>;
    constructor(options?: object);
    route(id: string, data?: Input): Subject<Output>;
    hasRoute(id: string): boolean;
    next(content: Input): void;
    cleanup(): void;
}
