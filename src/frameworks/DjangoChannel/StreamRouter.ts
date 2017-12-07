import { DemuxRouter } from '../../DemuxRouter';
import StreamStrategy from './StreamStrategy';


class StreamRouter extends DemuxRouter<IStreamData, IModelData> implements IUpstreamRouter<IModelData> {
  protected strategy: StreamStrategy = new StreamStrategy ();
  protected upstreamStrategy: StreamUpstreamStrategy = new StreamUpstreamStrategy();
  public send (stream: string, data: IStreamData): void {
    let packet = this.upstreamStrategy.getData(branch, data);
    this.socket.send(packet)
  }
}
