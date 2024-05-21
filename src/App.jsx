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
import UsersHome from "./components/pages/developer/dashboard/database_management/Users/UsersHome";
import PageNotFound from "./components/partials/PageNotFound";
import ProtectedRoute from "./components/pages/developer/access/ProtectedRoute";

function App() {
	const queryClient = new QueryClient();
	return (
		<>
			<QueryClientProvider client={queryClient}>
				<StoreProvider>
					{" "}
					<Router>
						<Routes>
							{/* <Route
								path='*'
								element={<PageNotFound />}
							/> */}
							<Route
								path='/*'
								element={<PageNotFound />}
							/>
							<Route
								path='/home'
								element={<Home />}
							/>

							<Route
								path='/dashboard'
								element={
									<ProtectedRoute>
										<DashboardHome />
									</ProtectedRoute>
								}
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
								path='/users'
								element={<UsersHome />}
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
