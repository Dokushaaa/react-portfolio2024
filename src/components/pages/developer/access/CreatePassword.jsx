import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CreatePassword = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-full place-content-center'>
			<div className='max-w-[400px] w-full px-4 py-6 bg-primary'>
				{/* TODO :logo */}
				<img
					src='https://via.placeholder.com/100x100'
					alt=''
				/>
				<div className='text-center'>
					<FaCheckCircle className='text-accent block mx-auto my-5 text-4xl' />
					<h3>New Password Sent</h3>
					<p className='text-balance'>Please click the link below to login</p>
					<Link
						className='underline hover:text-accent'
						to='/login'>
						Login
					</Link>
				</div>
				<h2>Create Password</h2>
				<form
					className='mt-5'
					action=''>
					<div className='input-wrap mb-5'>
						<label htmlFor='Password'>New Password</label>
						<input type='text' />
					</div>
					<div className='input-wrap mb-10'>
						<label htmlFor='Password'>Confirm Password</label>
						<input type='text' />
					</div>
				</form>
				<div className='flex flex-row gap-2'>
					<button
						className='btn justify-center py-4 w-full btn--accent text-center'
						type='submit'>
						Create Password
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

export default CreatePassword;
