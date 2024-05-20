import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AboutHome from "./components/pages/developer/dashboard/database_management/AboutDb/AboutHome";
import ContactsHome from "./components/pages/developer/dashboard/database_management/ContactsDb/ContactsHome";
import ExperienceHome from "./components/pages/developer/dashboard/database_management/ExperienceDb/ExperienceHome";
import { StoreProvider } from "./store/StoreContext";
import DashboardHome from "./components/pages/developer/dashboard/database_management/DashboardHome";
import HeroHome from "./components/pages/developer/dashboard/database_management/HeroDb/HeroHome";
import Home from "./components/pages/developer/ui/portfolio/home/Home";
import Login from "./components/pages/developer/access/Login";
import ForgotPassword from "./components/pages/developer/access/ForgotPassword";
import CreatePassword from "./components/pages/developer/access/CreatePassword";
const NotFound = () => {
	return (
		<>
			<div className='404pager'>
				<div className='flex flex-col justify-center items-center h-screen'>
					<h1 className='text-accent text-3xl'>
						<span className='italic'>404</span> - Page Not Found
					</h1>
					<p>Sorry, the page you are looking for could not be found.</p>
					<img
						src='/public/404.gif'
						alt='ducking-around'
						className='size-[20rem] transition-all rounded-md border-2 border-gradient-to-r from-blue-500 to-purple-500'
					/>
				</div>
			</div>
		</>
	);
};

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					{" "}
					<Router>
						<Routes>
							<Route
								path='/home'
								element={<Home />}
							/>
							<Route
								path='*'
								element={<NotFound />}
							/>
							<Route
								path='/admin'
								element={<DashboardHome />}
							/>
							<Route
								path='/HeroDb'
								element={<HeroHome />}
							/>
							<Route
								path='/AboutDb'
								element={<AboutHome />}
							/>
							<Route
								path='/ExperienceDb'
								element={<ExperienceHome />}
							/>
							<Route
								path='/ContactsDb'
								element={<ContactsHome />}
							/>
							<Route
								path='/dashboard'
								element={<DashboardHome />}
							/>
							<Route
								path='/login'
								element={<Login />}
							/>
							<Route
								path='/forgot-password'
								element={<ForgotPassword />}
							/>
							<Route
								path='/create-password'
								element={<CreatePassword />}
							/>
						</Routes>
					</Router>
				</StoreProvider>
			</QueryClientProvider>
		</>
	);
}

export default App;
