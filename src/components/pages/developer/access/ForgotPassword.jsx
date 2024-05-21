import React from "react";
import Logo from "../../../partials/svg/Logo";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../helpers/queryData";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import { InputText } from "../../../helpers/FormInputs";
import ModalError from "../../../partials/modals/ModalError";
import { ImgUrl } from "../../../helpers/functions-general";
import { setError, setMessage } from "../../../../store/StoreAction";

const ForgotPassword = () => {
	const { store, dispatch } = React.useContext(StoreContext);
	const [verifySuccess, setVerifySuccess] = React.useState(false);

	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (values) => queryData(`/v1/user/reset`, "post", values),
		onSuccess: (data) => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["user"] });
			// show error box
			if (!data.success) {
				dispatch(setError(true));
				dispatch(setMessage(data.error));
			} else {
				setVerifySuccess(true);
			}
		},
	});

	const initVal = { item: "" };
	const yupSchema = Yup.object({
		item: Yup.string().required("Required").email("Invalid Email"),
	});

	return (
		<div className='h-screen w-full flex justify-center items-center'>
			<div className='max-w-[400px] w-full px-4 py-8 bg-primary'>
				<img
					src={`${ImgUrl}/MiniLogo.svg`}
					alt=''
				/>
				{verifySuccess ? (
					<div className='text-center'>
						<FaCheckCircle className='text-accent block mx-auto my-5 text-4xl' />
						<h3>Reset Email Sent</h3>
						<p className='text-balance'>
							Please check your email to the reset password instruction
						</p>
					</div>
				) : (
					<>
						<h2>Forgot Password</h2>
						<Formik
							initialValues={initVal}
							validationSchema={yupSchema}
							onSubmit={async (values, { setSubmitting, resetForm }) => {
								mutation.mutate(values);
							}}>
							{(props) => {
								return (
									<Form className='w-full mt-5'>
										<div className='input-wrap mb-10'>
											<InputText
												label='Registered Email'
												name='item'
												type='email'
											/>
										</div>

										<div className='flex flex-row gap-2'>
											<button
												className='btn justify-center py-4 w-full btn--accent text-center'
												type='submit'>
												Reset Password
											</button>
											<button
												className='btn justify-center py-4 w-full btn--cancel text-center'
												type='submit'>
												Return
											</button>
										</div>
									</Form>
								);
							}}
						</Formik>
					</>
				)}
			</div>

			{store.error && <ModalError position={"center"} />}
		</div>
	);
};

export default ForgotPassword;
