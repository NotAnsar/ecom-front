import axios from 'axios';

const url = 'http://127.0.0.1:8070/api/v1';

export const makeRequest = axios.create({
	withCredentials: true,
	baseURL: url,
	headers: {},
});

export default url;
