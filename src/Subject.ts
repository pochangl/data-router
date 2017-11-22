import { Subject } from 'rxjs/Subject';
import { IInputData } from './Data';

export class RouterSubject<T extends IInputData> extends Subject<T> {}
