/* eslint-disable @typescript-eslint/no-unused-vars */
import {
	Controller,
	Get,
	Path,
	Route,
	Tags,
	Post,
	Body,
	Put,
	Delete,
	Security,
} from 'tsoa';
import { Subscription } from 'src/interface';

type ReqBodySubscription = Omit<
	Subscription,
	'createdAt' | 'updatedAt' | 'deletedAt' | 'id'
>;

@Route('subscription')
@Tags('Subscription')
@Security('jwt-auth')
export class SubscriptionController extends Controller {
	/**
	 * @summary Get all subscriptions
	 */
	@Get()
	@Security('jwt-auth')
	public async getAll(): Promise<Subscription[]> {
		return;
	}
	/**
	 * @summary Get subscription by Id
	 */
	@Get('{id}')
	@Security('jwt-auth')
	public async getById(@Path() id: number): Promise<Subscription> {
		return;
	}

	/**
	 * @summary Create new subscription
	 */
	@Post()
	@Security('jwt-auth')
	public async create(
		@Body()
		requestBody: ReqBodySubscription
	): Promise<Subscription> {
		return;
	}

	/**
	 * @summary Update subscription by Id
	 * @param id The subscription identifier
	 */
	@Put('{id}')
	@Security('jwt-auth')
	public async update(
		@Path() id: number,
		@Body()
		requestBody: ReqBodySubscription
	): Promise<Subscription> {
		return;
	}

	/**
	 * @summary Delete subscription by Id
	 * @param id The subscription identifier
	 */
	@Delete('{id}')
	@Security('jwt-auth')
	public async delete(@Path() id: number): Promise<Subscription> {
		return;
	}
	/**
	 * @summary Subscribe
	 * @param id The subscription identifier
	 */
	@Put('{id}/subscribe')
	@Security('jwt-auth')
	public async subscribe(@Path() id: number): Promise<string> {
		return 'Subscribed!';
	}
}
