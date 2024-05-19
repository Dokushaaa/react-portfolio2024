import React from "react";
import { FiPlus } from "react-icons/fi";
import useQueryData from "../../../../../custom-hook/useQueryData";
import Toast from "../../../../../partials/Toast";
import ModalError from "../../../../../partials/modals/ModalError";
import DbHeader from "../DbHeader";
import DbNavigation from "../DbNavigation";

import { IoIosHome } from "react-icons/io";
import { setIsAdd } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import ModalAddExperience from "./ModalAddExperience";
import ModalAddProgLang from "./ProgLang/ModalAddProgLang";
import {
	default as ExpreienceTable,
	default as ProglangTable,
} from "./ProgLang/ProglangTable";
import ProjectsTable from "./Projects/ProjectsTable";
import ModalAddProjects from "./Projects/ModalAddProjects";
import CertsTable from "./Certs/CertsTable";
import ModalAddCerts from "./Certs/ModalAddCerts";
import BackgroundTable from "./Background/BackgroundTable";
import ModalAddBackground from "./Background/ModalAddBackground";
import { FaCertificate, FaCode } from "react-icons/fa";
import { GrProjects } from "react-icons/gr";
import { MdCastForEducation } from "react-icons/md";

const ExperienceHome = () => {
	const { store, dispatch } = React.useContext(StoreContext);
	// const { store, dispatch } = React.useContext(StoreContext);
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const [itemEdit, setItemEdit] = React.useState(null);
	const [pageHandler, setPageHanlder] = React.useState("Experience");
	const [sectionSelect, setSectionSelect] = React.useState(
		"Programming Languages"
	);
	const handleChangeCategory = (navChange) => {
		setSectionSelect(navChange);
	};
	// add experience row:
	// proglang table
	const {
		isLoadingProgLang,
		isFetchingProgLang,
		errorProglang,
		data: proglang,
	} = useQueryData(
		isSearch ? "/v1/proglang/search" : "/v1/proglang", // endpoint
		isSearch ? "post" : "get", // method
		"proglang", //key
		// ["proglang", isSearch],
		{
			searchValue: keyword,
		}
	);
	// projects table
	const {
		isLoadingProjects,
		isFetchingProjects,
		errorProjects,
		data: projects,
	} = useQueryData(
		isSearch ? "/v1/projects/search" : "/v1/projects", // endpoint
		isSearch ? "post" : "get", // method
		"projects", //key
		// ["projects", isSearch],
		{
			searchValue: keyword,
		}
	);
	// certs table
	const {
		isLoadingCerts,
		isFetchingCerts,
		errorCerts,
		data: certs,
	} = useQueryData(
		isSearch ? "/v1/certs/search" : "/v1/certs", // endpoint
		isSearch ? "post" : "get", // method
		"certs", //key
		// ["certs", isSearch],
		{
			searchValue: keyword,
		}
	);
	// background table
	const {
		isLoadingBackground,
		isFetchingBackground,
		errorBackground,
		data: background,
	} = useQueryData(
		isSearch ? "/v1/background/search" : "/v1/background", // endpoint
		isSearch ? "post" : "get", // method
		"background", //key
		// ["background", isSearch],
		{
			searchValue: keyword,
		}
	);

	const handleAdd = () => {
		// callbacks via store folder
		dispatch(setIsAdd(true));
		setItemEdit(null);
	};
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
							<h1 className='leading-none mb-0'>
								Experience Database: {sectionSelect}
							</h1>
						</div>
						<div className='tab flex justify-between items-center my-8 border-b border-line '>
							{/* <StudentSearchBar
								setIsSeach={setIsSeach}
								setKeyword={setKeyword}
							/> */}
							<ul className='category_selector flex flex-row'>
								<li
									className={`category_link ${
										sectionSelect === "Programming Languages"
											? "active"
											: "font-medium"
									}`}>
									<button
										className='flex flex-row gap-3 items-center'
										onClick={() =>
											handleChangeCategory("Programming Languages")
										}>
										<FaCode className='flex items-center' /> Programming
										Languages
									</button>
								</li>
								<li
									className={`category_link ${
										sectionSelect === "Projects" ? "active" : "font-medium"
									}`}>
									<button
										className='flex flex-row gap-3 items-center'
										onClick={() => handleChangeCategory("Projects")}>
										<GrProjects className='flex items-center' /> Projects
									</button>
								</li>
								<li
									className={`category_link ${
										sectionSelect === "Certs" ? "active" : "font-medium"
									}`}>
									<button
										className='flex flex-row gap-3 items-center'
										onClick={() => handleChangeCategory("Certs")}>
										<FaCertificate className='flex items-center' />
										Certificates
									</button>
								</li>
								<li
									className={`category_link ${
										sectionSelect === "Background" ? "active" : "font-medium"
									}`}>
									<button
										className='flex flex-row gap-3 items-center'
										onClick={() => handleChangeCategory("Background")}>
										<MdCastForEducation className='flex items-center' />
										Background
									</button>
								</li>
							</ul>

							<button
								className='btn btn--accent flex items-center gap-2'
								onClick={handleAdd}>
								Add New {pageHandler} : {sectionSelect}
								<FiPlus />
							</button>
						</div>
						{sectionSelect === "Programming Languages" && (
							<>
								<ProglangTable
									setItemEdit={setItemEdit}
									isLoadingProgLang={isLoadingProgLang}
									proglang={proglang}
									isFetchingProgLang={isFetchingProgLang}
								/>

								{store.isAdd && <ModalAddProgLang itemEdit={itemEdit} />}
							</>
						)}
						{sectionSelect === "Projects" && (
							<>
								{/* <div>hehe</div> */}

								<ProjectsTable
									setItemEdit={setItemEdit}
									isLoadingProjects={isLoadingProjects}
									projects={projects}
									isFetchingProjects={isFetchingProjects}
								/>

								{store.isAdd && <ModalAddProjects itemEdit={itemEdit} />}
							</>
						)}
						{sectionSelect === "Certs" && (
							<>
								<CertsTable
									setItemEdit={setItemEdit}
									isLoadingCerts={isLoadingCerts}
									certs={certs}
									isFetchingCerts={isFetchingCerts}
								/>

								{store.isAdd && <ModalAddCerts itemEdit={itemEdit} />}
							</>
						)}
						{sectionSelect === "Background" && (
							<>
								<BackgroundTable
									setItemEdit={setItemEdit}
									isLoadingBackground={isLoadingBackground}
									background={background}
									isFetchingBackground={isFetchingBackground}
								/>

								{store.isAdd && <ModalAddBackground itemEdit={itemEdit} />}
							</>
						)}
					</div>
				</div>
			</main>
			{/* {sectionSelect ? "Background"() : ()} */}

			{store.success && <Toast />}
			{store.error && <ModalError position={"center"} />}
		</section>
	);
};

export default ExperienceHome;
