import axios from 'axios';
import SyncStorage from 'sync-storage';


const apiUrl = 'http://192.168.0.55:8000'

export async function signIn(cpf: any) {
    try {
        let resp = await axios.get(`${apiUrl}/user/${cpf}`)
        SyncStorage.set('user', JSON.stringify(resp.data.user?.user?._id));
        return resp.data.user?.user?.passwordRegistered ? true : false
    } catch(e) {
        throw false
    }
}

export async function signIn2(user) {
    try {
        let resp = await axios.post(`${apiUrl}/authenticate`, {cpf: user.cpf, password: user.password})
        SyncStorage.set('user', JSON.stringify(resp.data.user));

        SyncStorage.set('token', resp.data.token);

        return true
    } catch(e) {
        throw false
    }
}

export async function registerPassword(id: any, password: any) {
    try {
        let resp = await axios.post(`${apiUrl}/register/${id}`, {password, passwordRegistered: true})
        console.log(resp.data)

        return true
    } catch(e) {
        throw false
    }
}
