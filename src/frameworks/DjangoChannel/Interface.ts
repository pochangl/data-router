import { Subject } from 'rxjs/Subject';
import { IAttributeRouter } from '../../AttributeRouter';
import { RouterNode } from '../../Router';

export interface IModelData extends Object {
  id: number;
}

export interface IStreamData {
  stream: string;
  payload: IModelData;
}

export interface IUpstreamRouter<Data> {
  send (branch: number, data: Data): void;
}

export interface IModelNode<T extends IModelData> extends RouterNode<T>, IUpstreamRouter<T> {
}

export interface IModelRouterParent {
  branch: number;
  data: IModelData;
}

export interface IStreamRouter extends IAttributeRouter<IStreamData, IModelData> {

}
