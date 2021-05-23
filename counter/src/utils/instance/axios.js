import originalAxios from "axios";
import isDevEnv from "../helper/isdevenv";

const getBaseURL = () => {
	return isDevEnv
		? "http://localhost:8080"
		: "https://dp-chxpos-api.bsthun.com";
};

const axios = originalAxios.create({
	baseURL: getBaseURL(),
	withCredentials: true,
});

axios.baseURL = getBaseURL();

// instance.defaults.headers.common["Authorization"] = CookieHelper.read(
// 	"auth-token"
// );

export default axios;
