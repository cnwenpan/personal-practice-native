import request from "../utils/request";
import {host} from './config'

export const list =()=>{
    return request({
        url:`${host}/api/diary/list`,
        method:'POST',
    })
}
export const update =(data:object)=>{
    return request({
        url:`${host}/api/diary/update`,
        method:'POST',
        data
    })
}

export const add =(data:object)=>{
    return request({
        url:`${host}/api/diary/add`,
        method:'POST',
        data
    })
}


