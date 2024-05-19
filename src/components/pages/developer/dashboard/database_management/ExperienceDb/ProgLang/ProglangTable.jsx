import React from "react";
import TableLoader from "../../../../../../partials/TableLoader";
import NoData from "../../../../../../partials/NoData";
import { LiaEdit, LiaHistorySolid, LiaTrashAltSolid } from "react-icons/lia";
import { PiArchive } from "react-icons/pi";
import SpinnerFetching from "../../../../../../partials/spinners/SpinnerFetching";
import ModalConfirm from "../../../../../../partials/modals/ModalConfirm";
import ModalDelete from "../../../../../../partials/modals/ModalDelete";
import { StoreContext } from "../../../../../../../store/StoreContext";
import {
	setIsActive,
	setIsAdd,
	setIsDelete,
} from "../../../../../../../store/StoreAction";

const ProglangTable = ({
	isLoadingProgLang,
	proglang,
	isFetchingProgLang,
	setItemEdit,
}) => {
	let counter = 1;
	const { store, dispatch } = React.useContext(StoreContext);
	const [isArchiving, setIsArchiving] = React.useState(0);
	const [id, setId] = React.useState("");
	// switches row to inacvtive state
	const handleArchive = (item) => {
		dispatch(setIsActive(true));
		setId(item.proglang_aid);
		// dispatch(setIsArchive(0));
		setIsArchiving(0);
	};
	// edits the parent row's values:
	const handleEdit = (item) => {
		setItemEdit(item);
		dispatch(setIsAdd(true));
	};
	// swtitches row to active state
	const handleRestore = (item) => {
		dispatch(setIsActive(true));
		setId(item.proglang_aid);
		// dispatch(setIsArchive(1));
		setIsArchiving(1);
	};
	// deletes row
	const handleDelete = (item) => {
		dispatch(setIsDelete(true));
		setId(item.proglang_aid);
	};
	return (
		<>
			<div>
				<div className='table-wrapper relative'>
					{/* {isFetchingProgLang && <SpinnerFetching />} */}
					<table>
						<thead className='border-b border-secondary'>
							<tr>
								<th className='w-[20px]'>#</th>
								<th className='w-[50px]'>Title</th>
								<th className='w-[50px]'>Description</th>
								<th className='w-[60px]'>Image</th>
								<th className='w-[60px]'>IsActive?</th>
								<th className='w-[20px]'>Published Date</th>
								<th className='w-[20px]'>Created</th>
								<th className='w-[20px]'>Date Time Updated</th>
								<th className='w-[20px]'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{isLoadingProgLang && (
								<tr>
									<td colSpan={9}>
										{isLoadingProgLang && (
											<TableLoader
												count='20'
												cols='7'
											/>
										)}
									</td>
								</tr>
							)}

							{proglang?.data.length === 0 && (
								<tr>
									<td colSpan={9}>
										<NoData />
									</td>
								</tr>
							)}
							{proglang?.data.map((item, key) => (
								<tr key={key}>
									<td>{counter++}</td>
									<td>{item.proglang_title}</td>
									<td>{item.proglang_description}</td>
									<td>{item.proglang_image}</td>
									<td>{item.proglang_is_active}</td>
									<td>{item.proglang_published_date}</td>
									<td>{item.proglang_created}</td>
									<td>{item.proglang_datetime}</td>
									<td className='table-action'>
										<ul>
											{item.proglang_is_active ? (
												<>
													<li>
														<button
															className='tooltip'
															data-tooltip='Archive'
															onClick={() => handleArchive(item)}>
															<PiArchive />
														</button>
													</li>
													<li>
														<button
															className='tooltip'
															onClick={() => handleEdit(item)}
															data-tooltip='Edit'>
															<LiaEdit />
														</button>
													</li>
												</>
											) : (
												<>
													<li>
														<button
															className='tooltip'
															data-tooltip='Restore'
															onClick={() => handleRestore(item)}>
															<LiaHistorySolid />
														</button>
													</li>
													<li>
														<button
															className='tooltip'
															data-tooltip='Delete'
															onClick={() => handleDelete(item)}>
															<LiaTrashAltSolid />
														</button>
													</li>
												</>
											)}
										</ul>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			{store.isActive && (
				<ModalConfirm
					position={"center"}
					queryKey={"proglang"}
					endpoint={`/v1/proglang/active/${id}`}
					isArchiving={isArchiving}
					// setIsSuccess={setIsSuccess}
					// setMessage={setMessage}
					// setIsError={setIsError}
				/>
			)}
			{store.isDelete && (
				<ModalDelete
					position={"center"}
					// handleDelete={handleDelete}
					queryKey={"proglang"}
					endpoint={`/v1/proglang/${id}`}
					// setIsSuccess={setIsSuccess}
					// setMessage={setMessage}
					// setIsError={setIsError}
				/>
			)}
		</>
	);
};

export default ProglangTable;
