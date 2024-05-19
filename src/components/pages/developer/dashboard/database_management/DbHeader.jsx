import React from "react";
import { CiBellOn, CiDark } from "react-icons/ci";
import {
	LiaAngleDownSolid,
	LiaKeySolid,
	LiaUserCircle,
	LiaSignInAltSolid,
} from "react-icons/lia";
import { Link } from "react-router-dom";

const DbHeader = () => {
	//   const handleChangeColorTheme =(color) =>{
	//     if(localStorage.getItem("theme")=== "white"){
	//       localStorage.setItem('theme',"dark")}
	//       else{
	//         localStoreage.setItem("theme", "white")}

	//       };
	// document.querySelector("body").setAttribute('class', "");
	// document.querySelector("body").setAttribute('class', localStorage.getItem("theme"));
	return (
		<>
			<header className='header px-4 py-3 border-b border-line'>
				<div className='flex justify-end items-center gap-4 w-full relative'>
					<button className='text-3xl'>
						<CiDark />
					</button>
					<button className='text-3xl'>
						<CiBellOn />
					</button>
					<img
						className='rounded-full object-cover size-[40px]'
						src='https://via.placeholder.com/40x40'
						alt=''
					/>
					<div>
						<button className='flex items-center gap-5'>
							Mun, Bambang <LiaAngleDownSolid />{" "}
						</button>
						<div className='header-dropdown hidden absolute bg-primary p-4 rounded-md right-0 top-[calc(100%+10px)] text-center shadow-sm border-2'>
							<img
								className='rounded-full object-cover size-[40px] mx-auto'
								src='https://via.placeholder.com/40x40'
								alt=''
							/>
							<h4 className='mb-1'>Muh, Bambang</h4>
							<p className='text-sm w-[150px] truncate'>
								muh.bambang@gmail.com
							</p>
							<ul className='flex flex-row gap-5 items-center justify-center'>
								<li>
									<Link
										to='#'
										className='text-2xl'>
										<LiaUserCircle />
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-2xl'>
										<LiaKeySolid />
									</Link>
								</li>
								<li>
									<Link
										to='#'
										className='text-2xl'>
										<LiaSignInAltSolid />
									</Link>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</header>
		</>
	);
};

export default DbHeader;
