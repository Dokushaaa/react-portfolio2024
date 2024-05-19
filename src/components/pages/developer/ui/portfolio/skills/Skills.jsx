import React from "react";

import useQueryData from "../../../../../custom-hook/useQueryData";
import SkillCerts from "./certs/SkillCerts";
import ProgLang from "./proglang/ProgLang";
import Projects from "./projects/Projects";
import EducationalBackground from "./background/EducationalBackground";

const Skills = () => {
	const [isSearch, setIsSearch] = React.useState(false);
	const [keyword, setKeyword] = React.useState("");
	const { data: projects } = useQueryData(
		isSearch ? "/v1/projects/search" : "/v1/projects", // endpoint
		isSearch ? "post" : "get", // method
		"projects", //key
		// ["projects", isSearch],
		{
			searchValue: keyword,
		}
	);
	const { data: certs } = useQueryData(
		isSearch ? "/v1/certs/search" : "/v1/certs", // endpoint
		isSearch ? "post" : "get", // method
		"certs", //key
		// ["certs", isSearch],
		{
			searchValue: keyword,
		}
	);
	const { data: background } = useQueryData(
		isSearch ? "/v1/background/search" : "/v1/background", // endpoint
		isSearch ? "post" : "get", // method
		"background", //key
		// ["background", isSearch],
		{
			searchValue: keyword,
		}
	);

	const [menuTab, setMenuTab] = React.useState("Programming Languages");
	const [isModalShow, setModalShow] = React.useState(false);

	const handleChangeMenu = (menu) => {
		setMenuTab(menu);
	};
	return (
		<>
			<section
				id='skills'
				className='skills h-auto w-full pt-[10rem]'>
				<div className='container'>
					<div className='skills__wrapper'>
						<h2 className='text-left h-[15rem] text-6xl py-5 opacity-60'>
							Experience: {menuTab}
						</h2>
						<div className='skills__menu  md:flex md:flex-row '>
							<div className='aside md:h-screen w-full md:w-1/4'>
								<ul className='skills__navbar text-3xl items-center flex flex-col mb-10 md:mb-0 md:w-full'>
									<li>
										<button
											className={`font-bold ${
												menuTab === "Programming Languages"
													? "active"
													: "font-medium"
											}`}
											onClick={() => handleChangeMenu("Programming Languages")}>
											Programming Languages
										</button>
									</li>
									<li>
										<button
											className={`font-bold ${
												menuTab === "Coding Projects" ? "active" : "font-medium"
											}`}
											onClick={() => handleChangeMenu("Coding Projects")}>
											Projects
										</button>
									</li>
									<li>
										<button
											className={`font-bold ${
												menuTab === "Certifications" ? "active" : "font-medium"
											}`}
											onClick={() => handleChangeMenu("Certifications")}>
											Certifications
										</button>
									</li>
									<li>
										<button
											className={`font-bold ${
												menuTab === "Background" ? "active" : "font-medium"
											}`}
											onClick={() => handleChangeMenu("Background")}>
											Background
										</button>
									</li>
								</ul>
							</div>
							<div className='main md:h-auto md:max-h-100rem w-full md:pl-10 pb-10 md:w-3/4'>
								{menuTab === "Programming Languages" && (
									<ProgLang setModalShow={setModalShow} />
								)}
								{menuTab === "Coding Projects" && (
									<>
										{projects?.data.map((item, key) => (
											<Projects item={item} />
										))}
									</>
								)}
								{menuTab === "Certifications" && (
									<>
										{certs?.data.map((item, key) => (
											<SkillCerts item={item} />
										))}
									</>
								)}
								{menuTab === "Background" && (
									<>
										{background?.data.map((item, key) => (
											<EducationalBackground item={item} />
										))}
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Skills;
