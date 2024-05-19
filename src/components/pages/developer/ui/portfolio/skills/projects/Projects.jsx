import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import useQueryData from "../../../../../../custom-hook/useQueryData";
import { devBaseImgUrl } from "../../../../../../helpers/functions-general";

const Projects = ({ item, setModalShow }) => {
	const [isActive, setIsActive] = React.useState(false);
	const handleActive = () => {
		setIsActive(!isActive);
	};

	return (
		<>
			<div className='projects_container p-4 bg-header/90 w-full hover:bg-header  transition-all duration-500 mb-[5px]'>
				<div
					className='flex justify-between items-center py-5 border-b border-stone-600 '
					onClick={handleActive}>
					<h4 className='text-3xl font-bold question'>{item.projects_title}</h4>
					<GoPlus
						className={`text-4xl ${
							isActive ? "rotate-45" : "rotate-0"
						} transition-all`}
					/>
				</div>
				<div
					className={`answer ${
						isActive ? "max-h-[2000px]" : "max-h-[0]"
					} overflow-hidden transition-all h-full`}>
					<div
						className='transition-all mt-5'
						// do not use unless as a last resort like pos-absolute
					>
						<img
							className='pb-5 md:size-full size-full'
							src={`${devBaseImgUrl}/${item.projects_image}`}
							alt=''
						/>
						<h3>{item.projects_description}</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Projects;
