import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import './index.css';
import { Layout } from './layout/Layout/Layout';
import { Cart } from './pages/Cart/Cart';
import { Error } from './pages/Error/Error';
import { Product } from './pages/Product/Product';
import './reset.css';
import axios from 'axios';
import { PREFIX } from './helpers/API';
import { AuthLayout } from './layout/Auth/AuthLayout';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { RequireAuth } from './helpers/RequireAuth';
import { Provider } from 'react-redux';
import { store } from './store/store';

const Menu = lazy(() => import('./pages/Menu/Menu'));

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<RequireAuth>
				<Layout />
			</RequireAuth>
		),
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback={<div>Загрузка...</div>}>
						<Menu />
					</Suspense>
				)
			},
			{
				path: '/cart',
				element: <Cart />
			},
			{
				path: 'product/:id',
				element: <Product />,
				errorElement: <Error />,
				loader: async ({ params }) => {
					return defer({
						data: axios
							.get(`${PREFIX}/products/${params.id}`)
							.then(data => data)
							.catch(error => error)
					});
				}
			}
		]
	},
	{
		path: '*',
		element: <Error />
	},
	{
		path: '/auth',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			{
				path: 'register',
				element: <Register />
			}
		]
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
