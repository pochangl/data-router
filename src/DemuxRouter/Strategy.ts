/*

  Router is a class to determine where the data should go
*/
import { Strategy } from '../Router';
import { IDemuxRouter, IDemuxStrategy, IDemuxStrategyConfig, IDemuxUnwrappedData } from './Interface';
import { DemuxNode } from './Node';

export abstract class DemuxStrategy<Input, Output> extends Strategy<Input, Output> implements IDemuxStrategy<Input, Output> {
  protected router: IDemuxRouter<Input, Output>;
  public unwrap(data: Input): IDemuxUnwrappedData<Output> {
    return {
      routes: this.getRoutes(data),
      data: this.getData(data),
    };
  }
  public configure(config: IDemuxStrategyConfig<Input, Output>): void {
    this.router = config.router;
  }
  public createBranch(branch: string, data: Input): DemuxNode<Output> {
    let node: DemuxNode<Output> = new DemuxNode();
    node.configure({
      parent: this.router,
      demux: {
        branch: branch,
      },
    });
    return node;
  }
}
