import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Dashboard = Loadable(lazy(() => import('views/dashboard')));

const BudgetRequest = Loadable(lazy(() => import('views/budgetRequest')));

const UserList = Loadable(lazy(() => import('views/user/UserList')));
const RoleList = Loadable(lazy(() => import('views/user/RoleList')));

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
			path: '/users',
			element: <UserList />,
		},
		{
			path: '/roles',
			element: <RoleList />,
		},
	],
};

export default MainRoutes;