import React from "react";
import { LiaEdit, LiaHistorySolid, LiaTrashAltSolid } from "react-icons/lia";
import { PiArchive } from "react-icons/pi";
import {
	setIsActive,
	setIsAdd,
	setIsDelete,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import ModalConfirm from "../../../../../partials/modals/ModalConfirm";
import ModalDelete from "../../../../../partials/modals/ModalDelete";
import NoData from "../../../../../partials/NoData";
import TableLoader from "../../../../../partials/TableLoader";

const UsersTable = ({ isLoading, user, isFetching, setItemEdit }) => {
	let counter = 1;
	const { store, dispatch } = React.useContext(StoreContext);
	const [isArchiving, setIsArchiving] = React.useState(0);
	const [id, setId] = React.useState("");

	// switches row to inacvtive state
	const handleArchive = (item) => {
		dispatch(setIsActive(true));
		setId(item.user_aid);
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
		setId(item.user_aid);
		// dispatch(setIsArchive(1));
		setIsArchiving(1);
	};
	// deletes row
	const handleDelete = (item) => {
		dispatch(setIsDelete(true));
		setId(item.user_aid);
	};
	return (
		<>
			<div>
				<div className='table-wrapper relative'>
					{/* {isFetching && <SpinnerFetching />} */}
					<table>
						<thead className='border-b border-secondary'>
							<tr>
								<th className='w-[20px]'>#</th>
								<th className='w-[50px]'>Name</th>
								<th className='w-[50px]'>Email</th>
								<th className='w-[60px]'>IsActive?</th>
								<th className='w-[20px]'>Date Time Updated</th>
								<th className='w-[20px]'>Actions</th>
							</tr>
						</thead>
						<tbody>
							{isLoading && (
								<tr>
									<td colSpan={9}>
										{isLoading && (
											<TableLoader
												count='20'
												cols='7'
											/>
										)}
									</td>
								</tr>
							)}

							{user?.data.length === 0 && (
								<tr>
									<td colSpan={9}>
										<NoData />
									</td>
								</tr>
							)}
							{user?.data.map((item, key) => (
								<tr key={key}>
									<td>{counter++}</td>
									<td>{item.user_name}</td>
									<td>{item.user_email}</td>
									<td>{item.user_is_active}</td>
									<td>{item.user_datetime}</td>
									<td className='table-action'>
										<ul>
											{item.user_is_active ? (
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
					queryKey={"user"}
					endpoint={`/v1/user/active/${id}`}
					isArchiving={isArchiving}
				/>
			)}
			{store.isDelete && (
				<ModalDelete
					position={"center"}
					queryKey={"user"}
					endpoint={`/v1/user/${id}`}
				/>
			)}
		</>
	);
};

export default UsersTable;
