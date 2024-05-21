import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImgUrl, setStorageRoute } from "../../../helpers/functions-general";
import { StoreContext } from "../../../../store/StoreContext";
import useSystemLogin from "../../../custom-hook/useSystemLogin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryData } from "../../../helpers/queryData";
import {
	setCredentials,
	setError,
	setIsLogin,
	setMessage,
} from "../../../../store/StoreAction";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputText } from "../../../helpers/FormInputs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SpinnerButton from "../../../partials/spinners/SpinnerButton";
import ModalError from "../../../partials/modals/ModalError";
import SpinnerWindow from "../../../partials/spinners/SpinnerWindow";

const Login = () => {
	const { store, dispatch } = React.useContext(StoreContext);
	const [showPassword, setShowPassword] = React.useState(false);
	// to navigate via complex instructions
	const navigation = useNavigate();
	const { loginLoading } = useSystemLogin();
	// mutation handler
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: (values) => queryData(`/v1/user/login`, "post", values),
		onSuccess: (data) => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["user"] });
			// show error box
			if (!data.success) {
				dispatch(setError(true));
				dispatch(setMessage(data.error));
			} else {
				if (store.isLogin) {
					delete data.data[0].user_password;
					dispatch(setCredentials(data.data[0]));
					setStorageRoute(data.data[1]);
					dispatch(setIsLogin(false));
					navigation("/dashboard");
				}
			}
		},
	});
	// password visibility hanlder
	const togglePassword = () => {
		setShowPassword(!showPassword);
	};

	const initVal = {
		user_email: "",
		password: "",
	};

	const yupSchema = Yup.object({
		user_email: Yup.string().required("Required").email("Invalid email"),
		password: Yup.string().required("Required"),
	});

	return (
		<>
			{loginLoading ? (
				<SpinnerWindow />
			) : (
				<div className='flex flex-col justify-center items-center h-screen w-full place-content-center'>
					<div className='max-w-[400px] w-full px-4 py-6 bg-primary'>
						<img
							src={`${ImgUrl}/MiniLogo.svg`}
							alt=''
						/>
						<h2>Login</h2>
						<Formik
							initialValues={initVal}
							validationSchema={yupSchema}
							onSubmit={async (values, { setSubmitting, resetForm }) => {
								// mutate data
								mutation.mutate(values);
							}}>
							{(props) => {
								return (
									<Form>
										<div className='input-wrap'>
											<InputText
												label='email'
												type='text'
												name='user_email'
											/>
										</div>
										<div className='input-wrap'>
											<InputText
												label='Password'
												type={showPassword ? "text" : "password"}
												name='password'
												disabled={mutation.isPending}
											/>
											{props.values.password && (
												<span
													className='absolute text-base translate-y-1/2 cursor-pointer bottom-1/2 right-2'
													onClick={togglePassword}>
													{showPassword ? (
														<FaEyeSlash className='fill-gray-400' />
													) : (
														<FaEye className='fill-gray-400' />
													)}
												</span>
											)}
										</div>
										<Link
											className='block text-right italic text-xs mb-5 hover:underline'
											to='/forgot-password'>
											Forgot Password
										</Link>
										<button
											className='btn justify-center py-4 w-full btn--accent text-center'
											type='submit'>
											{mutation.isPending ? <SpinnerButton /> : "Sign In"}
										</button>
									</Form>
								);
							}}
						</Formik>
					</div>
					{store.error && <ModalError position={"center"} />}
				</div>
			)}
		</>
	);
};

export default Login;
