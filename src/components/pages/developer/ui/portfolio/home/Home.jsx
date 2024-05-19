import React from "react";

import {
	baseImgUrl,
	devBaseImgUrl,
	ImgUrl,
} from "../../../../../helpers/functions-general";
import { Link } from "react-router-dom";
import {
	FaBook,
	FaFacebook,
	FaInstagram,
	FaLinkedin,
	FaReact,
	FaTwitter,
} from "react-icons/fa";

import Header from "../../../../../partials/header/Header";
import About from "../about/About";
import Skills from "../skills/Skills";
import ContactMe from "../contact/ContactMe";
import useQueryData from "../../../../../custom-hook/useQueryData";
import Footer from "../../../../../partials/footer/Footer";

const Home = () => {
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const { data: hero } = useQueryData(
		isSearch ? "/v1/hero/search" : "/v1/hero", // endpoint
		isSearch ? "post" : "get", // method
		"hero", //key
		// ["hero", isSearch],
		{
			searchValue: keyword,
		}
	);
	return (
		<>
			<Header />

			<section
				id='home'
				className='home max-h-[54rem] h-screen w-full py-[10rem]'>
				{hero?.data.map((item, key) => (
					<div className='homeBanner z-[99]'>
						<div className='container'>
							<h2 className='home__header mb-10 text-7xl opacity-70'>Home</h2>
							<div className='homeBanner__wrapper w-full flex md:flex-row  flex-col gap-2 md:justify-evenly md:gap-10 items-center md:py-14'>
								<div className='homeBanner__img rounded-br-lg  rounded-tl-lg bg-wavyBG md:w-[32.5rem] w-[22.5rem] md:h-auto h-[22.5rem] py-2 h-auto flex items-right md:mb-0 mb-5 rounded-rb-md'>
									<img
										className='w-auto rounded-br-lg shadow-xl md:scale-90 scale-95 hover:scale-100  hover:animate-spin transition-all  md:animate-loading2md duration-500  animate-loading2sm'
										src={`${devBaseImgUrl}/${item.hero_image}`}
										alt=''
									/>
								</div>
								<div className='homeBanner__text text-center md:text-justify px-5 md:px-0'>
									<h1 className='uppercase md:text-5xl lg:text-7xl xl:text-9xl'>
										{item.hero_title}
									</h1>
									<div className='block-header'>
										<h2 className='md:text-4xl pl-[10rem]'>Web Developer</h2>
									</div>
									<div className='homeBanner__textBtn  w-full flex gap-5 justify-center md:justify-start'>
										<button className='btn btn-primary text-white flex flex-row items-center text-primary w-1/8 md:w-1/4  gap-2'>
											<FaBook />
											<Link className='text-center'>Get to know me more?</Link>
										</button>
										<button className='hidden md:flex btn btn-primary text-white flex-row items-center text-primary w-1/4'>
											<Link className='text-center'>Coding</Link> <FaReact />
										</button>
									</div>
								</div>
							</div>
							<div className='home__text text-center w-full py-10 md:py-0 md:text-2xl'>
								<p className='text-center md:text-left pb-5'>
									{item.hero_description}
								</p>
								<p className='text-center md:text-left'>{item.hero_context}</p>
							</div>
						</div>
					</div>
				))}
			</section>

			<About />
			<Skills />
			<ContactMe />
		</>
	);
};

export default Home;
