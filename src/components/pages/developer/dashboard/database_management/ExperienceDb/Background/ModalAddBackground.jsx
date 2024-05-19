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
} from "../../../../../../../store/StoreAction";
import { StoreContext } from "../../../../../../../store/StoreContext";
import useUploadPhoto from "../../../../../../custom-hook/useUploadPhoto";
import {
	InputFileUpload,
	InputText,
	InputTextArea,
} from "../../../../../../helpers/FormInputs";
import { devBaseImgUrl } from "../../../../../../helpers/functions-general";
import { queryData } from "../../../../../../helpers/queryData";
import ModalWrapper from "../../../../../../partials/modals/ModalWrapper";
import SpinnerButton from "../../../../../../partials/spinners/SpinnerButton";

const ModalAddBackground = ({ itemEdit }) => {
	const { dispatch, store } = React.useContext(StoreContext);
	const handleClose = () => dispatch(setIsAdd(false));
	// add upload
	const { uploadPhoto, handleChangePhoto, photo } = useUploadPhoto(
		`/v1/upload/photo`,
		dispatch
	);

	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (values) =>
			queryData(
				itemEdit
					? `/v1/background/${itemEdit.background_aid}`
					: `/v1/background`,
				itemEdit ? "put" : "post",
				// `/v1/background`,
				// `post`,
				values
			),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["background"] });
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
		background_title: itemEdit ? itemEdit.background_title : "",
		background_image: itemEdit ? itemEdit.background_image : "",
		background_description: itemEdit ? itemEdit.background_description : "",
	};
	const yupSchema = Yup.object({
		background_title: string().required("Headline Required*"),
		// background_image: string().required("Image Required*"),
		background_description: string().required("Description Required*"),
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
								uploadPhoto();
								mutation.mutate({
									...values,
									background_image:
										(itemEdit && itemEdit.background_image === "") || photo
											? photo === null
												? itemEdit.background_image
												: photo.name
											: values.background_image,
								});
							}}>
							<Form
								action=''
								className='flex flex-col h-[calc(100vh-110px)]'>
								<div className='grow overflow-y-auto'>
									<div className='input-wrap'>
										{photo || (itemEdit && itemEdit.background_image !== "") ? (
											<img
												src={
													photo
														? URL.createObjectURL(photo) // preview
														: itemEdit.background_image // check db
														? devBaseImgUrl + "/" + itemEdit.background_image
														: null
												}
												alt='Photo'
												className='rounded-tr-md rounded-tl-md h-[200px] max-h-[200px] w-full object-cover object-center m-auto'
											/>
										) : (
											<span className='min-h-20 flex items-center justify-center'>
												<span className='text-accent mr-1'>Drag & Drop</span>{" "}
												photo here or{" "}
												<span className='text-accent ml-1'>Browse</span>
											</span>
										)}

										{(photo !== null ||
											(itemEdit && itemEdit.background_image !== "")) && (
											<span className='min-h-10 flex items-center justify-center'>
												<span className='text-accent mr-1'>Drag & Drop</span>{" "}
												photo here or{" "}
												<span className='text-accent ml-1'>Browse</span>
											</span>
										)}

										{/* <FaUpload className="opacity-100 duration-200 group-hover:opacity-100 fill-dark/70 absolute top-0 right-0 bottom-0 left-0 min-w-[1.2rem] min-h-[1.2rem] max-w-[1.2rem] max-h-[1.2rem] m-auto cursor-pointer" /> */}
										<InputFileUpload
											label='Photo'
											name='Photo'
											type='file'
											id='myFile'
											accept='image/*'
											title='Upload photo'
											onChange={(e) => handleChangePhoto(e)}
											onDrop={(e) => handleChangePhoto(e)}
											className='opacity-0  absolute right-0 bottom-0 left-0 m-auto cursor-pointer h-full '
										/>
									</div>
									<div className='input-wrap'>
										<InputText
											label='Main Text'
											type='text'
											name='background_title'
										/>
									</div>
									<div className='input-wrap '>
										<InputTextArea
											className='h-[10rem] resize-none'
											label='Description'
											type='text'
											name='background_description'
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

export default ModalAddBackground;
