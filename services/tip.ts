import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get} from './axios'

export async function getTips() {
    try {
        let { tip } = await get(`/tip`)

        return tip
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}