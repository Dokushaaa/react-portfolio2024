import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import useQueryData from "../../../../../custom-hook/useQueryData";
import Footer from "../../../../../partials/footer/Footer";

const ContactMe = () => {
	return (
		<>
			<section
				id='contacts'
				className='CTA h-auto md:py-10 w-full pt-[5rem] bg-contactBG'>
				<div className='container'>
					<div className='contact__wrapper'>
						<h2 className='text-right text-6xl py-5 opacity-80'>Contacts</h2>
						<div className='flex flex-col items-center h-full gap-5 md:my-10'>
							<h2 className='text-6xl w-full md:w-1/2 text-center mb-0 '>
								Have a project in Mind?
							</h2>
							<h2 className='text-6xl w-full md:w-1/2 text-center mb-10 '>
								Let's get to work.
							</h2>
							<div className='md:flex flex flex-col md:flex-row md:items-center gap-5 pb-10 md:pb-0'>
								<button className='btn btn--contactme '>
									<Link
										target='_blank'
										to='mailto:saavedraarrisss@gmail.com'
										className='flex gap-5 items-center text-lg pl-5'>
										Say Hello
										<FaArrowRight className='text-2xl md:ml-10' />
									</Link>
								</button>
								<button className='btn btn--contactme text-center '>
									<Link
										target='_blank'
										to='https://www.linkedin.com/in/arris-jeff-saavedra-a6787a260'
										className='px-10 text-lg'>
										My LinkedIn
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</>
	);
};

export default ContactMe;
