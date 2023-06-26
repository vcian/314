/* eslint-disable @typescript-eslint/ban-ts-comment */
import axios, { AxiosResponse } from "axios";
import { cookieKeys } from "../constants/constants";
import store from "../store";
import { onLogOut } from "../store/AuthReducer";
import { setLoading } from "../store/LoadingReducer";
import { getEncryptedCookie, toastError } from "../utils/CommonFuncation";

const axiosInstance = axios.create({
	baseURL: "http://13.232.39.15:4000"
});

const errorInterceptor = (errorResponse: any) => {
	store.dispatch(setLoading(false));
	if (errorResponse) {
		const { message, status } = errorResponse.data;
		if (status === 401) {
			// @ts-ignore
			store.dispatch(onLogOut());
		} else {
			toastError(message);
		}
	}
};

axiosInstance.interceptors.request.use(
	(req) => {
		const cookie = getEncryptedCookie(cookieKeys.cookieUser);
		if (cookie && cookie.token) {
			// @ts-ignore
			req.headers.Authorization = `Bearer ${cookie.token}`;
		}
		return req;
	},
	(err) => {
		// catches client side error like no internet etc
		return Promise.reject(err);
	}
);

axiosInstance.interceptors.response.use(
	(req) => {
		return req;
	},
	(err) => {
		errorInterceptor(err.response);
		return Promise.reject(err);
	}
);

export default class HTTPService {
	static get<T = never, R = AxiosResponse<T>>(url: string, params?: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.get(url, { params })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static put<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.put(url, body)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static post<T = never, R = AxiosResponse<T>>(url: any, body: any, params?: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.post(url, body, params && { params })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}

	static delete<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.delete(url, { data: body })
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}
	static patch<T = never, R = AxiosResponse<T>>(url: string, body: any): Promise<R> {
		return new Promise((resolve, reject) => {
			axiosInstance
				.patch(url, body)
				.then((response) => resolve(response.data))
				.catch((error) => reject(error.response || error));
		});
	}
}
