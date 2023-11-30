import axios from "axios";

const newRequest = axios.create({
	baseURL: "https://fiverr-app-gm7u.onrender.com/api/",
	withCredentials: true,
});

export default newRequest;
