import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const ForgotPassword = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-full place-content-center'>
			<div className='max-w-[400px] w-full px-4 py-6 bg-primary'>
				<img
					src='https://via.placeholder.com/100x100'
					alt=''
				/>
				<div className='text-center'>
					<FaCheckCircle className='text-accent block mx-auto my-5 text-4xl' />
					<h3>Reset Password Email Sent</h3>
					<p className='text-balance'>
						Please Check your email for the reset password instruction
					</p>
				</div>
				<h2>Forgot Password</h2>
				<form
					className='mt-5'
					action=''>
					<div className='input-wrap -scroll-mb-10'>
						<label htmlFor='Email'>Registered Email</label>
						<input type='text' />
					</div>
				</form>
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
			</div>
		</div>
	);
};

export default ForgotPassword;
