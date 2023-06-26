import HTTPService from "../services/httpService";
import { ApiEndPoint } from "../utils/ApiEndPoint";

interface IBody {
	email: string;
	password: string;
}
interface IRes {
	message: string;
	status: number;
	data: any;
}

export const loginApi = (body: IBody): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.login, body);
};

export const registerApi = (body: IBody): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.register, body);
};

export const profileApi = (): Promise<IRes> => {
	return HTTPService.get(ApiEndPoint.profile, {});
};

export const logoutApi = (): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.logout, {});
};

export const createWorkSpaceApi = (name: string): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.private.createWorkSpace, { name });
};

export const updateWorkSpaceApi = (): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.private.updateWorkSpace, {});
};

export const getByWorkSpaceApi = (): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.private.getByWorkSpace, {});
};

export const getWorkSpaceListApi = (): Promise<IRes> => {
	return HTTPService.get(ApiEndPoint.private.getWorkSpaceList, {});
};

export const uploadFileApi = ({ slug, data }: any): Promise<IRes> => {
	return HTTPService.put("/workspaces/" + slug + ApiEndPoint.private.uploadFile, data);
};

export const embeddingApi = (slug?: string, message?: string): Promise<IRes> => {
	return HTTPService.post("/workspaces/" + slug + ApiEndPoint.private.embedding, { message });
};

export const localSystemApi = (): Promise<IRes> => {
	return HTTPService.post(ApiEndPoint.private.localSystem, {});
};
