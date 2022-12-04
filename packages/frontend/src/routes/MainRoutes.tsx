import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

const Products = Loadable(lazy(() => import('views/e-commerce/Products')));
const ProductDetails = Loadable(
	lazy(() => import('views/e-commerce/ProductDetails/'))
);
const ProductCheckout = Loadable(
	lazy(() => import('views/e-commerce/Checkout'))
);

const UserList = Loadable(lazy(() => import('views/user/UserList')));
const RoleList = Loadable(lazy(() => import('views/user/RoleList')));
const ActionList = Loadable(lazy(() => import('views/user/ActionList')));
const LoanList = Loadable(lazy(() => import('views/loan/LoanList')));
const PurchaseList = Loadable(
	lazy(() => import('views/purchase/PurchaseList'))
);
const BookList = Loadable(lazy(() => import('views/e-commerce/ProductList')));
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
			element: <Products />,
		},
		{
			path: '/e-commerce/product-details/:id',
			element: <ProductDetails />,
		},
		{
			path: '/e-commerce/checkout',
			element: <ProductCheckout />,
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
			path: '/purchases',
			element: <PurchaseList />,
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
