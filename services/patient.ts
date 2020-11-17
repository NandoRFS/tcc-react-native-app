import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get, post} from './axios'

export function getUser() {
    const user = JSON.parse(SyncStorage.get('user'))
    return user
}
export async function getProfile() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)

        return patient
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}

export async function upProfile(id, body) {
    // const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await post(`/patient/${id}`, body)

        return patient
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}
