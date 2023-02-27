import React from 'react';
import {
	createBrowserRouter,
	Navigate,
	RouterProvider,
} from 'react-router-dom';

import AuthLayout from './pages/auth.layout';
import SignInPage from './pages/auth/signin';
import SignupPage from './pages/auth/signup';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to='/auth/signup' />,
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'signin',
				element: <SignInPage />,
			},
			{
				path: 'signup',
				element: <SignupPage />,
			},
		],
	},
]);

const AppRouter: React.FC = () => {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
};

export default AppRouter;
