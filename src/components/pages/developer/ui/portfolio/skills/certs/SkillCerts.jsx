import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { devBaseImgUrl } from "../../../../../../helpers/functions-general";
import { GoPlus } from "react-icons/go";

const SkillCerts = ({ item, setModalShow }) => {
	const [showCerts, setShowCerts] = React.useState(false);
	const [isActive, setIsActive] = React.useState(false);
	const handleActive = () => {
		setIsActive(!isActive);
	};
	return (
		<>
			<div className='certs_container p-4 bg-header/90 hover:bg-header w-full transition-all duration-500 mb-[5px]'>
				<div
					className='flex justify-between items-center py-5 border-b border-stone-600 '
					onClick={handleActive}>
					<h4 className='text-3xl font-bold question'>{item.certs_title}</h4>
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
							src={`${devBaseImgUrl}/${item.certs_image}`}
							alt=''
						/>
						<h3>{item.certs_description}</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default SkillCerts;
