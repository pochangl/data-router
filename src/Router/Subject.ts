import { Subject } from 'rxjs/Subject';
import { IInputData } from './Interface';

export class RouterSubject<T extends IInputData> extends Subject<T> {}
