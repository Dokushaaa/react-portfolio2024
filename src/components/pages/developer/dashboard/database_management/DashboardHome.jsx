import React from "react";
import { StoreContext } from "../../../../../store/StoreContext";
import DbNavigation from "./DbNavigation";
import DbHeader from "./DbHeader";
import useQueryData from "../../../../custom-hook/useQueryData";
import { Link } from "react-router-dom";

const DashboardHome = () => {
	const { store, dispatch } = React.useContext(StoreContext);
	// const { store, dispatch } = React.useContext(StoreContext);
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const [itemEdit, setItemEdit] = React.useState(null);
	const [pageHandler, setPageHanlder] = React.useState("Dashboard");

	// hero counter
	const { data: hero } = useQueryData(
		isSearch ? "/v1/hero/search" : "/v1/hero", // endpoint
		isSearch ? "post" : "get", // method
		"hero", //key
		// ["hero", isSearch],
		{
			searchValue: keyword,
		}
	);
	// about counter
	const { data: about } = useQueryData(
		isSearch ? "/v1/about/search" : "/v1/about", // endpoint
		isSearch ? "post" : "get", // method
		"about", //key
		// ["about", isSearch],
		{
			searchValue: keyword,
		}
	);
	// proglang counter
	const { data: proglang } = useQueryData(
		isSearch ? "/v1/proglang/search" : "/v1/proglang", // endpoint
		isSearch ? "post" : "get", // method
		"proglang", //key
		// ["proglang", isSearch],
		{
			searchValue: keyword,
		}
	);
	// projects counter
	const { data: projects } = useQueryData(
		isSearch ? "/v1/projects/search" : "/v1/projects", // endpoint
		isSearch ? "post" : "get", // method
		"projects", //key
		// ["projects", isSearch],
		{
			searchValue: keyword,
		}
	);
	// certs counter
	const { data: certs } = useQueryData(
		isSearch ? "/v1/certs/search" : "/v1/certs", // endpoint
		isSearch ? "post" : "get", // method
		"certs", //key
		// ["certs", isSearch],
		{
			searchValue: keyword,
		}
	);
	// background counter
	const { data: background } = useQueryData(
		isSearch ? "/v1/background/search" : "/v1/background", // endpoint
		isSearch ? "post" : "get", // method
		"background", //key
		// ["background", isSearch],
		{
			searchValue: keyword,
		}
	);
	// contacts counter
	const { data: contacts } = useQueryData(
		isSearch ? "/v1/contacts/search" : "/v1/contacts", // endpoint
		isSearch ? "post" : "get", // method
		"contacts", //key
		// ["contacts", isSearch],
		{
			searchValue: keyword,
		}
	);
	return (
		<section className='flex overflow-x-hidden'>
			{/* set tab menu if active later */}
			<DbNavigation
				pageHandler={pageHandler}
				setPageHanlder={setPageHanlder}
			/>
			<main className='w-[calc(100%-250px)]'>
				<DbHeader />
				<div className='flex relative'>
					<div className={`main-wrapper transition-all px-4 py-3 w-full`}>
						<div className='flex justify-between items-center'>
							<h1 className='leading-none mb-0'>{pageHandler}</h1>
							<button className='btn btn--accent'>
								<Link
									className='px-2'
									to='http://localhost/phpmyadmin/index.php?route=/database/structure&db=react_portfoliomain'
									target='_blank'>
									Database Link
								</Link>
							</button>
						</div>
						<div className='tab flex justify-between items-center my-8 border-b border-line '>
							{/* <StudentSearchBar
								setIsSeach={setIsSeach}
								setKeyword={setKeyword}
							/> */}
							<h4>---Search bar placeholder---</h4>
							{/* <button
								className='btn btn--accent flex items-center gap-2'
								onClick={handleAdd}>
								Add New
								<FiPlus />
							</button> */}
						</div>
						<ul className='items-count'>
							{/* Hero DB */}
							<li className='items-card'>
								<h1>Hero Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											hero?.data.length === 0 ? "text-red-400" : "text-accent"
										}`}>
										{hero?.data.length}
									</span>
								</p>
								<small className='underline text-stone-500'>
									<Link to='/HeroDb'>Click here to view Home Table</Link>
								</small>
							</li>
							{/* About DB */}
							<li className='items-card'>
								<h1>About Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											about?.data.length === 0 ? "text-red-400" : "text-accent"
										}`}>
										{about?.data.length}
									</span>
								</p>
								<small className='underline text-stone-500'>
									<Link to='/AboutDb'>Click here to view About Table</Link>
								</small>
							</li>
							{/* experience DB */}
							<li className='items-card'>
								<h1>Programming Languages Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											proglang?.data.length === 0
												? "text-red-400"
												: "text-accent"
										}`}>
										{proglang?.data.length}
									</span>
								</p>
							</li>
							<li className='items-card'>
								<h1>Projects Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											projects?.data.length === 0
												? "text-red-400"
												: "text-accent"
										}`}>
										{projects?.data.length}
									</span>
								</p>
							</li>
							<li className='items-card'>
								<h1>Certificates Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											certs?.data.length === 0 ? "text-red-400" : "text-accent"
										}`}>
										{certs?.data.length}
									</span>
								</p>
							</li>
							<li className='items-card'>
								<h1>Background Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											background?.data.length === 0
												? "text-red-400"
												: "text-accent"
										}`}>
										{background?.data.length}
									</span>
								</p>
							</li>
							{/* Hero DB */}
							<li className='items-card'>
								<h1>Contacts Section</h1>
								<p className='text-2xl'>
									Items Count:
									<span
										className={`items-count-span px-2 ${
											contacts?.data.length === 0
												? "text-red-400"
												: "text-accent"
										}`}>
										{contacts?.data.length}
									</span>
								</p>
								<small className='underline text-stone-500'>
									<Link to='/ContactsDb'>Click here to view Home Table</Link>
								</small>
							</li>
						</ul>
					</div>
				</div>
			</main>
		</section>
	);
};

export default DashboardHome;
