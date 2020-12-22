import {Alert} from "react-native";
import {getLocalData} from "./index";

interface RequestConfig {
    url: string,
    method: string,
    data: object
}


const request = async ({url, method, data}: RequestConfig) => {
    const myHeaders = new Headers();
    const token: string = await getLocalData('token') || ''
    myHeaders.append("token", token);
    myHeaders.append("Accept", 'application/json')
    myHeaders.append('Content-Type', 'application/json',)
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: method,
            headers: myHeaders,
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                const {success = false, msg = '未知错误', data = {}} = json;
                if (success) {
                    resolve(data)
                } else {
                    Alert.alert(msg)
                    reject(msg)
                }
            })
            .catch(e => {
                Alert.alert(e.toString())
                console.log(e)
            })
    })
}


export default request
