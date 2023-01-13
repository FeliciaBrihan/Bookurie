/* eslint-disable no-mixed-spaces-and-tabs */

import { ModelBook, ModelSubscription, ModelUser } from 'src/interface';

export function getBookDiscountPrice(
	book: ModelBook,
	subscription: ModelSubscription,
	loggedUser: ModelUser
) {
	if (subscription) {
		if (subscription.type === 'premium') {
			return {
				...book.toJSON(),
				pricePromo:
					book.typeFormat === 'printed'
						? Math.round(
								book.price - (book.price * subscription.everyBookDiscount) / 100
						  )
						: 0,
			};
		}
		if (subscription.type === 'basic') {
			const pricePromo =
				book.typeFormat === 'printed'
					? Math.round(
							book.price - (book.price * subscription.everyBookDiscount) / 100
					  )
					: loggedUser.booksReadThisMonth < subscription.monthlyFreeBooks
					? 0
					: Math.round(
							book.price - (book.price * subscription.everyBookDiscount) / 100
					  );
			return { ...book.toJSON(), pricePromo };
		}
	}
	return { ...book.toJSON() };
}
