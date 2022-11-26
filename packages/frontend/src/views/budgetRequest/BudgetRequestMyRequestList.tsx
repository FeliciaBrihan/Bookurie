import BudgetRequestList from './BudgetRequestList';

const BudgetRequestMyRequestList = () => (
	<BudgetRequestList params={{ include: 'own' }} title="My Requests" />
);

export default BudgetRequestMyRequestList;
