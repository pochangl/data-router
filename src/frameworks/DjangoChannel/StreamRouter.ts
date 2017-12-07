import { AttributeRouter } from '../../AttributeRouter';
import { IModelData, IStreamData } from './Interface';
import { StreamUpstreamStrategy } from './StreamUpstreamStrategy';

class StreamRouter extends AttributeRouter<IStreamData, IModelData> implements IUpstreamRouter<IModelData> {
  public dataAttribute: string = 'stream';
  public routingAttribute: string = 'payload';
  protected upstreamStrategy: StreamUpstreamStrategy = new StreamUpstreamStrategy();
  protected socket:

  public send (stream: string, data: IStreamData): void {
    let packet: IStreamData = this.upstreamStrategy.getData(branch, data);
    this.socket.send(packet)
  }
}
