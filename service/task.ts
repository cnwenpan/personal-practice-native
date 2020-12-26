import request from "../utils/request";
import {host} from './config'

export const repeatTask = () => {
    return request({
        url: `${host}/api/today/repeat`,
        method: 'POST'
    })
}

export const noRepeatTask = () => {
    return request({
        url: `${host}/api/today/noRepeat`,
        method: 'POST'
    })
}

export const taskUpdateStatus = (data:object) => {
    return request({
        url: `${host}/api/task/updateStatus`,
        method: 'POST',
        data
    })
}
