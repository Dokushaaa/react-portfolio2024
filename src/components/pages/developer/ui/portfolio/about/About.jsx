import React from "react";
import {
	devBaseImgUrl,
	ImgUrl,
} from "../../../../../helpers/functions-general";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { PiDownloadSimpleFill } from "react-icons/pi";
import useQueryData from "../../../../../custom-hook/useQueryData";

const About = () => {
	const socials = [
		<FaFacebook />,
		<FaInstagram />,
		<FaLinkedin />,
		<FaTwitter />,
		<GrMail />,
	];

	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const { data: about } = useQueryData(
		isSearch ? "/v1/about/search" : "/v1/about", // endpoint
		isSearch ? "post" : "get", // method
		"about", //key
		// ["about", isSearch],
		{
			searchValue: keyword,
		}
	);
	const { data: contacts } = useQueryData(
		isSearch ? "/v1/contacts/search" : "/v1/contacts", // endpoint
		isSearch ? "post" : "get", // method
		"contacts", //key
		// ["contacts", isSearch],
		{
			searchValue: keyword,
		}
	);
	return (
		<>
			<section
				id='about'
				className='about md:px-5 pt-[10rem] w-full h-auto md:h-screen '>
				<div className='container'>
					<div className='about__wrapper  md:flex md:flex-col md:gap-5 md:justify-around'>
						<h2 className='about__header mb-10 text-7xl text-right opacity-70'>
							About
						</h2>
						{about?.data.map((item, key) => (
							<div
								key={key}
								className='flex flex-col md:flex-row md:gap-10  justify-around w-full'>
								<div className='about__img md:w-1/2 relative mb-5 md:mb-0'>
									<img
										className='object-cover  z-999 border-gradient-br-blue-green-gray-900 gradient-border-3 size-[500px] bg-wavyBG rounded-xl'
										src={`${devBaseImgUrl}/${item.about_image}`}
										alt=''
									/>
									<div className='-translate-y-[35rem] md:-translate-y-[25rem] absolute'>
										<img
											className='md:animate-planetmd animate-planet z-99 '
											src={`${ImgUrl}/planet-svgrepo-com.svg`}
											alt=''
										/>
									</div>
								</div>
								<div className='about__text flex flex-col gap-5 w-full md:text-left text-justify md:px-5 md:w-1/2 '>
									<h3 className='text-center md:text-left'>
										{item.about_title}
									</h3>
									<p>{item.about_description}</p>
									<ul className='socialicons flex flex-col md:flex-row gap-5 justify-around md:items-center  md:w-[66%] text-2xl'>
										{contacts?.data.map((contacts, key) => (
											<li key={key}>
												<button>
													<Link
														target='_blank'
														to={contacts.contacts_userhandle}>
														{socials[key]}
														<p className='text-white'>
															/{contacts.contacts_username}
														</p>
													</Link>
												</button>
											</li>
										))}
									</ul>
									
									<button className='w-[66%] btn btn--yellow md:btn-yellow-cv rounded-br-xl  flex justify-center md:self-start self-center  text-center rounded-bl-xl'>
										<Link className='flex flex-row items-center gap-5'>
											Download CV <PiDownloadSimpleFill className='text-2xl' />
										</Link>
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</>
	);
};

export default About;
