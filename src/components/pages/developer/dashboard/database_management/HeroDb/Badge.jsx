import React from "react";
import { FiPlus } from "react-icons/fi";
import useQueryData from "../../../../../custom-hook/useQueryData";
import ModalError from "../../../../../partials/modals/ModalError";
import Toast from "../../../../../partials/Toast";
import DbHeader from "../DbHeader";
import DbNavigation from "../DbNavigation";

import { setIsAdd } from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import ModalAddbadge from "./ModalAddbadge";
import HeroTable from "./HeroTable";

const Badge = () => {
	const { store, dispatch } = React.useContext(StoreContext);
	// const { store, dispatch } = React.useContext(StoreContext);
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const [itemEdit, setItemEdit] = React.useState(null);
	const [pageHandler, setPageHanlder] = React.useState("Home");
	const {
		isLoading,
		isFetching,
		error,
		data: badge,
	} = useQueryData(
		isSearch ? "/v1/badge/search" : "/v1/badge", // endpoint
		isSearch ? "post" : "get", // method
		"badge", //key
		// ["badge", isSearch],
		{
			searchValue: keyword,
		}
	);
	// add badge row:
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
							<h1 className='leading-none mb-0'>badge Database</h1>
						</div>
						<div className='tab flex justify-between items-center my-8 border-b border-line '>
							{/* <StudentSearchBar
								setIsSeach={setIsSeach}
								setKeyword={setKeyword}
							/> */}
							<h1>Search This</h1>
							<button
								className='btn btn--accent flex items-center gap-2'
								onClick={handleAdd}>
								Add New
								<FiPlus />
							</button>
						</div>

						{/* change this */}
							<HeroTable
								setItemEdit={setItemEdit}
								isLoading={isLoading}
								badge={badge}
								isFetching={isFetching}
							/>
						
					</div>
				</div>
			</main>
			{store.isAdd && <ModalAddbadge itemEdit={itemEdit} />}
			{store.success && <Toast />}
			{store.error && <ModalError position={"center"} />}
		</section>
	);
};

export default Badge;
