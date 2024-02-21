import axios from 'axios';
import { AxiosResponse } from 'axios';
import {contentTypeJsonAndAccessControlAllow} from "./defaultHttpHeader";

export const axiosGet = async (uri: string): Promise<AxiosResponse> => {
    return axios.get(
        uri,
        {
            headers: contentTypeJsonAndAccessControlAllow
        }
    )
}

export const axiosPost = async<T> (data: T, uri: string): Promise<AxiosResponse> => {
    return axios.post(uri,
        data,
        {
        headers: contentTypeJsonAndAccessControlAllow
    })
}

export const axiosDelete = async <T>(data: T, uri: string):Promise<AxiosResponse> => {

    return axios.delete(uri,
        {data: data,
            headers: contentTypeJsonAndAccessControlAllow
    });
}



