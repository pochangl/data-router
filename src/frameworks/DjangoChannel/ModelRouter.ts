import { IModelData, IStreamData, IUpstreamRouter } from './Interface'
import { DemuxStrategy, DemuxRouter } from '../../DemuxRouter'

export class ModelUpstreamStrategy {
  public getData(branch: number, data: object): IModelData {
    return <IModelData> {
      id: branch,
      ...data
    };
  }
}

export class ModelStrategy extends DemuxStrategy<IModelData, IModelData> {
  public getRoutes(data: IModelData): string[] {
    return [String(data.id)];
  }
  public getData(data: IModelData): IModelData {
    return data
  }
}

export class ModelRouter extends DemuxRouter<IModelData, IModelData> implements IUpstreamRouter<IModelData> {
  protected parent: {send: (branch:number, data: IRawData) => void};

  protected strategy: ModelStrategy = new ModelStrategy ()
  protected upstreamStrategy: ModelUpstreamStrategy = new ModelUpstreamStrategy ()
  public send (branch: number, data: IModelData): void {
    let packet = this.upstreamStrategy.getData(branch, data);
    this.parent.send(branch, packet)
  }
}
