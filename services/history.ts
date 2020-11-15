import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get} from './axios'

export async function getHistory() {
    const user = JSON.parse(SyncStorage.get('user'))
    console.log('user: ', user._id)
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        patient.medication = patient.medication.map(m => {
            m.pick_date = new Date(m.pick_date)
            return m
        })
        const sorted= patient.medication.slice().sort((a: any, b: any) => b.pick_date - a.pick_date)

        console.log('sorted', sorted)

        return sorted
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}

export async function getLastPick() {
    const user = JSON.parse(SyncStorage.get('user'))
    console.log('user: ', user._id)
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        patient.medication = patient.medication.map(m => {
            m.schedule_date = new Date(m.schedule_date)
            return m
        })
        patient.medication = patient.medication.filter(m => m.last_pick==true)
        console.log('patient.medication', patient.medication)
        const sorted= patient.medication.slice().sort((a: any, b: any) => b.schedule_date - a.schedule_date).reverse()
        
        console.log('sorted', sorted)

        return sorted[0]
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}