import { ModelStatic } from 'sequelize';
import { ModelBook } from './Book';
import { ModelUser } from './User';
import { ModelLoan } from './Loan';
import { ModelRole } from './Role';
import { ModelAction } from './Action';
import { ModelPermission } from './Permission';
import { ModelPurchase } from './Purchase';
import { ModelSubscription } from './Subscription';
import { ModelRaffle } from './Raffle';

export interface Models {
	Book: ModelStatic<ModelBook>;
	User: ModelStatic<ModelUser>;
	Loan: ModelStatic<ModelLoan>;
	Role: ModelStatic<ModelRole>;
	Action: ModelStatic<ModelAction>;
	Permission: ModelStatic<ModelPermission>;
	Purchase: ModelStatic<ModelPurchase>;
	Subscription: ModelStatic<ModelSubscription>;
	Raffle: ModelStatic<ModelRaffle>;
}