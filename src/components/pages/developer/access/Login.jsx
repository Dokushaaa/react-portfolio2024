import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
	return (
		<div className='flex flex-col justify-center items-center h-screen w-full place-content-center'>
			<div className='max-w-[400px] w-full px-4 py-6 bg-primary'>
				<img
					src='https://via.placeholder.com/200x200'
					alt=''
				/>
				<h2>Login</h2>
				<form
					className='mt-5'
					action=''>
					<div className='input-wrap'>
						<label htmlFor='Email'>Email</label>
						<input type='text' />
					</div>
					<div className='input-wrap'>
						<label htmlFor='Password'>Password</label>
						<input type='text' />
					</div>
					<Link
						className='block text-right italic text-xs mb-5 hover:underline'
						to='/forgot-password'>
						Forgot Password
					</Link>
					<button
						className='btn justify-center py-4 w-full btn--accent text-center'
						type='submit'>
						Sign In
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
