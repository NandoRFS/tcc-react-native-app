import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get} from './axios'

export async function getMedication() {
    const user = JSON.parse(SyncStorage.get('user'))
    console.log('user: ', user._id)
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        let ids = []
        let sorted = patient.medication.filter(m => {
            if(!ids.includes(m.medication_id)) {
                ids.push(m.medication_id)
                return m
            }
        })
        let search = []
        for(let medicine of sorted) {
            let { medication } = await get(`/medication/${medicine.medication_id}`)
            search.push(medication)
        }

        console.log('sorted', sorted)
        console.log('search', search)

        return search
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}

export async function getDailyMedication() {
    const user = JSON.parse(SyncStorage.get('user'))
    console.log('user: ', user._id)
    try {
        let { patient } = await get(`/patient/user/${user._id}`)


        let sorted = []
        for (let m of patient.medication) {
            if(m.last_pick==true) {
                let { medication } = await get(`/medication/${m.medication_id}`)
                m.medication_id = medication
                sorted.push(m)
            }
        }

        console.log('ALELEUIA', sorted)

        return sorted
    } catch(e) {
        console.log('ERROU :(')
        throw false
    }
}

export async function getTreatment() {
    const user = JSON.parse(SyncStorage.get('user'))
    console.log('user: ', user._id)
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        let ids = []
        let sorted = patient.medication.filter((m: any) => m.last_pick == true)
        
        let search = []

        for(let medicine of sorted) {
            let { medication } = await get(`/medication/${medicine.medication_id}`)
            search.push(medication)
        }
        console.log('KLDSHNDJKGBSKtreatment: ')
        let treatment = search.map((item: any) => {
            if(item.treatment.length > 0 )
                return true
            else
                false
            })

        console.log('KLDSHNDJKGBSKtreatment: ', treatment)
        
        return treatment.includes(true) ? search : []
    } catch(e) {
        console.log('ERROU :(8')
        throw false
    }
}
