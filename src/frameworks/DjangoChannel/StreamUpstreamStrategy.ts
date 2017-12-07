import { IStreamData, IModelData } from './Interface';

export class StreamUpstreamStrategy {
  public getData (branch: string, data: IModelData): IStreamData {
    return {
      stream: branch,
      payload: data,
    }
  }
}
