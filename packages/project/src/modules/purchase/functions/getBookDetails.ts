import { sequelize } from 'src/global';
import { Models } from 'src/interface';
import { getPriceWithDiscount } from './helpers';

interface Props {
	bookType: string;
	bookPrice: number;
	subscriptionId: number;
	booksReadThisMonth: number;
}

export async function getBookDetails({
	bookType,
	bookPrice,
	subscriptionId,
	booksReadThisMonth,
}: Props) {
	let isFreeBook = false;
	let price = 0;
	let isPremiumSubscription = false;

	const { Subscription } = sequelize.models as unknown as Models;

	if (subscriptionId) {
		const subscription = await Subscription.findByPk(subscriptionId);
		if (subscription.type === 'premium') isPremiumSubscription = true;
		if (
			bookType === 'online' &&
			(isPremiumSubscription ||
				booksReadThisMonth < subscription.monthlyFreeBooks)
		)
			isFreeBook = true;
		if (!isFreeBook)
			price = getPriceWithDiscount(bookPrice, subscription.everyBookDiscount);
	} else price = bookPrice;

	return { isPremiumSubscription, isFreeBook, price };
}
