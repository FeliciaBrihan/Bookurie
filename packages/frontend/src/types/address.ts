import { Address } from './e-commerce';

export interface TAddressStateProps {
	addresses: Address[];
	error: object | string | null;
}
