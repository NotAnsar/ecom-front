import axios from 'axios';
import url from './store/url';

export const makeRequest = axios.create({
	withCredentials: true,
	baseURL: url,
	headers: {},
});

export default url;
