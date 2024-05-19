import React from "react";
import { IoIosContact, IoIosHome } from "react-icons/io";
import { MdEmojiEvents, MdOutlineMedicalInformation } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import DbLogo from "../../../../partials/svg/DbLogo";
import { Link } from "react-router-dom";

const DbNavigation = ({ pageHandler, setPageHanlder }) => {
	const handleChangeTab = (navChange) => {
		setPageHanlder(navChange);
	};
	return (
		<>
			<aside className='px-4 py-6 w-[250px] h-screen border-r border-line'>
				<div className='flex items-center gap-5'>
					<DbLogo />
					<h2 className='mb-0  text-justify transition-all duration-500'>
						Saavedra Portfolio: {pageHandler}
					</h2>
				</div>
				<ul className='dbnav'>
					<li
						className={`dbnav-link  ${
							pageHandler === "Dashboard" ? "active" : "font-medium"
						}`}>
						<RxDashboard />
						<button onClick={() => handleChangeTab("Dashboard")}>
							<Link to='/dashboard'>Dashboard</Link>
						</button>
					</li>
					<li
						className={`dbnav-link ${
							pageHandler === "Home" ? "active" : "font-medium"
						}`}>
						<IoIosHome />
						<button onClick={() => handleChangeTab("Home")}>
							{" "}
							<Link to='/HeroDb'>Home</Link>
						</button>
					</li>
					<li
						className={`dbnav-link ${
							pageHandler === "About" ? "active" : "font-medium"
						}`}>
						<MdOutlineMedicalInformation />
						<button onClick={() => handleChangeTab("About")}>
							<Link to='/AboutDb'>About</Link>
						</button>
					</li>
					<li
						className={`dbnav-link ${
							pageHandler === "Experience" ? "active" : "font-medium"
						}`}>
						<MdEmojiEvents />
						<button onClick={() => handleChangeTab("Experience")}>
							<Link to='/ExperienceDb'>Experience</Link>
						</button>
					</li>
					<li
						className={`dbnav-link ${
							pageHandler === "Contacts" ? "active" : "font-medium"
						}`}>
						<IoIosContact />
						<button onClick={() => handleChangeTab("Contacts")}>
							<Link to='/ContactsDb'>Contacts</Link>
						</button>
					</li>
				</ul>
			</aside>
		</>
	);
};

export default DbNavigation;
