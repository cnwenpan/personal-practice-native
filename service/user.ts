import request from "../utils/request";
import { host } from './config'

export const login = (data: object) => {
    return request({
        url: `${host}/api/account/login`,
        method: 'POST',
        data
    })
}

export const register = (data: object) => {
    return request({
        url: `${host}/api/account/register`,
        method: 'POST',
        data
    })
}

