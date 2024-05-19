import React from "react";
import {
	baseImgUrl,
	devBaseImgUrl,
} from "../../../../../../helpers/functions-general";
import useQueryData from "../../../../../../custom-hook/useQueryData";

const ProgLang = () => {
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const {
		isLoading,
		isFetching,
		error,
		data: proglang,
	} = useQueryData(
		isSearch ? "/v1/proglang/search" : "/v1/proglang", // endpoint
		isSearch ? "post" : "get", // method
		"proglang", //key
		// ["proglang", isSearch],
		{
			searchValue: keyword,
		}
	);
	return (
		<>
			<div className='skill__container  flex flex-col items-center md:grid md:grid-cols-4 md:gap-5 md:translate-x-[12.5%] w-full'>
				{proglang?.data.map((item, key) => (
					<div
						key={key}
						className='skill__card bg-primary m-2 rounded-br-xl rounded-tl-xl w-auto h-[calc(100%+10px)] md:h-1/2 size-[50rem] md:h-[calc(100%-10px)]  p-5 flex md:flex-col flex-row items-center gap-5 md:text-left text-center justify-center'>
						<img
							className='pb-5 md:size-full size-1/2'
							src={`${devBaseImgUrl}/${item.proglang_image}`}
							alt=''
						/>
						<h2>{item.proglang_title}</h2>
					</div>
				))}
			</div>
		</>
	);
};

export default ProgLang;
