import axios from 'axios';
import SyncStorage from 'sync-storage';


const apiUrl = 'http://192.168.0.55:8000'


export async function get(path: String) {
    const token = SyncStorage.get('token')
    try {
        let resp = await axios.get(`${apiUrl}${path}`, 
        {
            headers: {
                Authorization: `Bearer ${token}` //the token is a variable which holds the token
            }
        })
        return resp.data
    } catch(e) {
        console.log('\n\nError: \n', e)
        throw e
    }
}

export async function post(path: String, body: Object) {
    const token = SyncStorage.get('token')
    try {
        let resp = await axios.post(`${apiUrl}${path}`, body, 
        {
            headers: {
                Authorization: `Bearer ${token}` //the token is a variable which holds the token
            }
        })
        return resp.data
    } catch(e) {
        console.log('\n\nError: \n', e)
        throw e
    }
}
