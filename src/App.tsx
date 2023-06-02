/* eslint-disable @typescript-eslint/no-unused-vars */
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import './app.scss';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { MainLayout } from './layouts/MainLayout';
import { NotFoundView } from './views/NotFoundView';
import { MainView } from './views/MainView';
import { useEffect, useState } from 'react';
import { IngradientsView } from './views/IngradientsView';
import { CartView } from './views/CartView';
import { useAppSelector } from './redux/hooks/hooks';
import { HistoryView } from './views/HistoryView';
import { PizzaDetailView } from './views/PizzaDetailsView';
import { AllPizzaView } from './views/AllPizzaView';
import { LoginView } from './views/AuthPages/LoginView';
import { useAuth } from './redux/hooks/useAuth';
import { ProtectedRoute } from './Routes/ProtectedRoute';
import { AdminLayout } from './layouts/AdminLayout';
import { OverviewAdmIngradientView } from './views/AuthPages/OverviewAdmIngradientView';
import { EditPizzaView } from './views/AuthPages/EditPizzaView';

const LocalSelectView: React.FC = () => {
	return (
		<div className="w-full h-screen flex justify-center items-center bg-white/20">
			<h1 className="text-dark/60 text-lg">Select an item</h1>
		</div>
	);
};

function App() {
	useEffect(() => {
		AOS.init();
		AOS.refresh();
	}, []);

	const [dark, setDark] = useState(true);
	const { basicLoading } = useAppSelector((state) => state.basicReducer);

	const { GetProtect } = useAuth();

	return (
		<main
			className={`${dark ? 'dark' : ''} bg-light ${
				basicLoading && 'overflow-hidden h-screen'
			}`}>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<MainView />} />
					<Route path="/allpizza" element={<AllPizzaView />} />
					<Route path="/ingradients" element={<IngradientsView />} />
					<Route path="/cart" element={<CartView />} />
					<Route path="/history" element={<HistoryView />} />
					<Route path="/pizza/:id" element={<PizzaDetailView />} />
				</Route>

				{/* {GetProtect() && (
					<Route path="/admin" element={<Outlet />}>
						<Route index element={<>overview all</>} />
						<Route path="pizza" element={<>pizza overview all</>} />
					</Route>
				)} */}
				{/* {!GetProtect() && <Route path="/login" element={<LoginView />} />} */}

				{/* {GetProtect() ? (
					<Route path="/admin" element={<Outlet />}>
						<Route index element={<>overview all</>} />
						<Route path="pizza" element={<>pizza overview all</>} />
					</Route>
				) : (
					<Navigate to={'/login'} replace />
				)}
				<Route
					path="/login"
					element={
						GetProtect() ? <Navigate to={'/admin'} replace /> : <LoginView />
					}
				/> */}

				<Route
					path="/login"
					element={
						<ProtectedRoute
							protectedContent={<LoginView />}
							elsePath={'/admin'}
							getProtected={!GetProtect()}
						/>
					}
				/>

				<Route
					path="/admin"
					element={
						<ProtectedRoute
							protectedContent={<AdminLayout />}
							elsePath={'/login'}
							getProtected={GetProtect()}
						/>
					}>
					<Route index element={<LocalSelectView />} />
					<Route path="update_pizza/:id" element={<EditPizzaView />} />
					<Route path="ingradients" element={<OverviewAdmIngradientView />} />
					<Route path="*" element={<Navigate to={'/admin'} replace />} />
				</Route>

				<Route path="*" element={<NotFoundView />} />
			</Routes>
		</main>
	);
}

export default App;
