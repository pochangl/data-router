import { RouterNode } from '../Router';
import { IDemuxNode, IDemuxRouterConfig } from './Interface';

export class DemuxNode<Input> extends RouterNode<Input> implements IDemuxNode<Input> {
  protected branch: string;

  public configure(config: IDemuxRouterConfig<Input>): void {
    super.configure(config);
    this.branch = config.demux.branch;
  }
}
