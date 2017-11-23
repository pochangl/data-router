import { DemuxRouter } from './DemuxRouter';
import { IRouterConfig } from './Router';

export interface INetworkRouterConfig extends IRouterConfig {
  prefix: string;
  route: string;
}

export interface INetworkRouterRoute<Packet> extends IDemuxRoute<Packet> {
  [address: string]: NetworkRouter<Packet>;
}

export interface IAddresssable extends IRouterConfig {
  routerConfig: INetworkRouterConfig;
  address: string = '';
  public configure(config: IRouerConfig): void;
}

export abstract class NetworkRouter<Packet> extends DemuxRouter<Packet, Packet> implements IAddressable {
  public route(id: string, data?: Input): NetworkRouter<Input, Output> {
    let router: NetworkRouter = super.route(id, data);
    router.configure({
      prefix: this.address,
      route: id,
    });
    return router;
  }

  public configure(config: INetworkRouterConfig): void {
    this.routerConfig = config;
    this.address = config.prefix + '.' + config.route;
    super.configure(config);
  }
}
