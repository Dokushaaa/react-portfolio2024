import React from "react";

import { Link } from "react-router-dom";
import { FaCheckCircle, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { StoreContext } from "../../../../store/StoreContext";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { InputText } from "../../../helpers/FormInputs";
import { getUrlParam, ImgUrl } from "../../../helpers/functions-general";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { setError, setMessage } from "../../../../store/StoreAction";
import { queryData } from "../../../helpers/queryData";

const CreatePassword = () => {
	const { dispatch } = React.useContext(StoreContext);
	const [isPasswordNew, setIsPasswordNew] = React.useState(false);
	const [verifySuccess, setVerifySuccess] = React.useState(false);
	const [isPasswordConfirm, setIsPasswordConfirm] = React.useState(false);

	// param key getter:
	const paramKey = getUrlParam().get("key");

	const initVal = { new_password: "", confirm_password: "", key: paramKey };
	// , key: paramKey
	const yupSchema = Yup.object({
		new_password: Yup.string().required("Required"),
		confirm_password: Yup.string()
			.required("Required")
			.oneOf([Yup.ref("new_password"), null], "Passwords does not match."),
	});

	// mutation handler:
	const queryClient = useQueryClient();
	const mutation = useMutation({
		mutationFn: (values) => queryData("/v1/user/password", "post", values),
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
						<h3>New Password Set!</h3>
						<p className='text-balance'>Please click the link below to login</p>
						<Link to='/login'>Login</Link>
					</div>
				) : (
					<>
						<h2>Create Password</h2>
						<Formik
							initialValues={initVal}
							validationSchema={yupSchema}
							onSubmit={async (values, { setSubmitting, resetForm }) => {
								mutation.mutate(values);
							}}>
							{(props) => {
								return (
									<Form className='w-full'>
										<div className='input-wrapper'>
											<InputText
												label='New Password'
												type={isPasswordNew ? "password" : "text"}
												name='new_password'
												disabled={mutation.isPending}
											/>
											{props.values.new_password && (
												<button
													onClick={() => setIsPasswordNew(!isPasswordNew)}
													className='absolute top-1/2 right-3 '
													type='button'>
													{isPasswordNew ? (
														<FaRegEye className='text-black' />
													) : (
														<FaRegEyeSlash className='text-black' />
													)}
												</button>
											)}
										</div>

										<div className='input-wrapper'>
											<InputText
												label='Confirm Password'
												type={isPasswordConfirm ? "password" : "text"}
												name='confirm_password'
												disabled={mutation.isPending}
											/>
											{props.values.confirm_password && (
												<button
													onClick={() =>
														setIsPasswordConfirm(!isPasswordConfirm)
													}
													className='absolute top-1/2 right-3'
													type='button'>
													{isPasswordConfirm ? (
														<FaRegEye className='text-black' />
													) : (
														<FaRegEyeSlash className='text-black' />
													)}
												</button>
											)}
										</div>

										<div className='flex flex-row gap-2 items-center'>
											<button
												className='btn btn--accent w-full p-4 justify-center'
												type='submit'>
												Create Password
											</button>
											<button className='btn btn--cancel w-full p-4 justify-center '>
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
		</div>
	);
};

export default CreatePassword;
