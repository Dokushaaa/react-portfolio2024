// make localhost img folder reciever:
export const devBaseImgUrl = "http://localhost/react-portfolio2024/public/img/";

export const baseImgUrl = "../../../public/img";
export const ImgUrl = "../../../public";
//const baseImgUrl = 'http://
export const urlPathPortfolioKey = "http://localhost/react-portfolio2024";
export const devApiUrl = `${urlPathPortfolioKey}/rest`;
export const devKey =
	"$2a$12$47wDvbLInZif/PVS8B6P3.7WxyJvUpBzZAWCsnWJUKq3nrn4qgmeO";

// fetch for uploading photo or file
export const fetchFormData = (url, fd = {}) => {
	const data = fetch(url, {
		method: "post",
		body: fd,
	})
		.then((res) => res.json())
		.catch((error) => {
			console.error(error + " api endpoint error");
		});

	return data;
};
// to use img at a div
// { `${devBaseImgUrl}/${item.(tableName)_(tableContent) }`}
// or
// { `${devBaseImgUrl}/${item.home_mainImg}`}
