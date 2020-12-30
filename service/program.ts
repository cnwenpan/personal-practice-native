import request from "../utils/request";
import {host} from './config'

export const list =()=>{
    return request({
        url:`${host}/api/program/list`,
        method:'POST',
    })
}

export const add =(data:any)=>{
    return request({
        url:`${host}/api/program/add`,
        method:'POST',
        data,
    })
}

export const update =(data:any)=>{
    return request({
        url:`${host}/api/program/update`,
        method:'POST',
        data
    })
}
