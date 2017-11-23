import { DemuxRouter } from '../DemuxRouter';
import { IAttributeRouter } from './Interface';
import { AttributeStrategy } from './Strategy';

export abstract class AttributeRouter<Input, Output> extends DemuxRouter<Input, Output> implements IAttributeRouter<Input, Output> {
    public abstract dataAttribute: string;
    public abstract routingAttribute: string;
    protected strategy: AttributeStrategy<Input, Output> = new AttributeStrategy<Input, Output>();
}
