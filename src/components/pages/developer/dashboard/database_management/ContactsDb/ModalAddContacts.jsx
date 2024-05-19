import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Form, Formik } from "formik";
import React from "react";
import { LiaTimesSolid } from "react-icons/lia";
import * as Yup from "yup";
import { string } from "yup";
import {
	setError,
	setIsAdd,
	setMessage,
	setSuccess,
} from "../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../store/StoreContext";
import { InputText, InputTextArea } from "../../../../../helpers/FormInputs";
import { queryData } from "../../../../../helpers/queryData";
import ModalWrapper from "../../../../../partials/modals/ModalWrapper";
import SpinnerButton from "../../../../../partials/spinners/SpinnerButton";

const ModalAddContacts = ({ itemEdit }) => {
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsAdd(false));

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (values) =>
			queryData(
				itemEdit ? `/v1/contacts/${itemEdit.contacts_aid}` : `/v1/contacts`,
				itemEdit ? "put" : "post",
				// `/v1/contacts`,
				// `post`,
				values
			),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["contacts"] });
			if (data.success) {
				dispatch(setIsAdd(false));
				dispatch(setSuccess(true));
				dispatch(setMessage(`Successful Operation`));
			} else {
				dispatch(setError(true));
				dispatch(setMessage(data.error));
			}
		},
	});

	const initVal = {
		contacts_web: itemEdit ? itemEdit.contacts_web : "",
		contacts_userhandle: itemEdit ? itemEdit.contacts_userhandle : "",
		contacts_username: itemEdit ? itemEdit.contacts_username : "",
	};
	const yupSchema = Yup.object({
		contacts_web: string().required("Headline Required*"),
		contacts_userhandle: string().required("Subtext Required*"),
		contacts_username: string().required("Image Required*"),
	});
	return (
		<>
			<ModalWrapper>
				<div className='main-modal w-[300px] bg-primary text-content h-full'>
					<div className='modal-header p-4 relative'>
						<h2>New Entry?</h2>
						<button
							className='absolute top-[25px] right-4'
							onClick={handleClose}>
							<LiaTimesSolid />
						</button>
					</div>
					<div className='modal-body p-4'>
						<Formik
							initialValues={initVal}
							validationSchema={yupSchema}
							onSubmit={async (values) => {
								mutation.mutate(values);
							}}>
							<Form
								action=''
								className='flex flex-col h-[calc(100vh-110px)]'>
								<div className='grow overflow-y-auto'>
									<div className='input-wrap'>
										<InputText
											label='Main Text'
											type='text'
											name='contacts_web'
										/>
									</div>
									<div className='input-wrap'>
										<InputText
											label='Sub Text'
											type='text'
											name='contacts_userhandle'
										/>
									</div>
									<div className='input-wrap'>
										<InputText
											label='Iconic Image'
											type='text'
											name='contacts_username'
										/>
									</div>
								</div>
								<div className='form-action'>
									<button
										className='btn btn-form btn--accent w-1/2'
										type='submit'>
										{mutation.isPending ? <SpinnerButton /> : "Add"}
										{/* {<SpinnerButton />Add} */}
									</button>
									<button
										className='btn btn-form btn--cancel w-1/2'
										type='button'
										onClick={handleClose}>
										Cancel
									</button>
								</div>
							</Form>
						</Formik>
					</div>
				</div>
			</ModalWrapper>
		</>
	);
};

export default ModalAddContacts;
