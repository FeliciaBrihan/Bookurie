import BudgetRequestList from './BudgetRequestList';

const BudgetRequestMyApprovalList = () => (
	<BudgetRequestList params={{ type: 'approval' }} title="My Approvals" />
);

export default BudgetRequestMyApprovalList;
