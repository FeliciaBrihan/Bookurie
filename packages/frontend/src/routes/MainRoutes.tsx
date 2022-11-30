import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));

const BudgetRequest = Loadable(lazy(() => import('views/budgetRequest')));

const UserList = Loadable(lazy(() => import('views/user/UserList')));
const RoleList = Loadable(lazy(() => import('views/user/RoleList')));
const ActionList = Loadable(lazy(() => import('views/user/ActionList')));
const LoanList = Loadable(lazy(() => import('views/loan/LoanList')));
const BookList = Loadable(lazy(() => import('views/book/BookList')));
const PermissionList = Loadable(
	lazy(() => import('views/user/PermissionList'))
);

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
	path: '/',
	element: (
		<AuthGuard>
			<MainLayout />
		</AuthGuard>
	),
	children: [
		{
			path: '/dashboard',
			element: <Dashboard />,
		},
		{
			path: '/budget-request',
			element: <BudgetRequest />,
		},
		{
			path: '/books',
			element: <BookList />,
		},
		{
			path: '/loans',
			element: <LoanList />,
		},
		{
			path: '/users',
			element: <UserList />,
		},
		{
			path: '/roles',
			element: <RoleList />,
		},
		{
			path: '/actions',
			element: <ActionList />,
		},
		{
			path: '/permissions',
			element: <PermissionList />,
		},
	],
};

export default MainRoutes;
