import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get} from './axios'

export async function getHistory() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        patient.medication = patient.medication.map(m => {
            m.pick_date = new Date(m.pick_date)
            return m
        })
        const sorted= patient.medication.slice().sort((a: any, b: any) => b.pick_date - a.pick_date)


        return sorted
    } catch(e) {
        throw false
    }
}

export async function getLastPick() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        patient.medication = patient.medication.map(m => {
            m.schedule_date = new Date(m.schedule_date)
            return m
        })
        patient.medication = patient.medication.filter(m => m.last_pick==true)
        const sorted= patient.medication.slice().sort((a: any, b: any) => b.schedule_date - a.schedule_date).reverse()
        

        return sorted[0]
    } catch(e) {
        throw false
    }
}

export async function getLastMedication() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)


        let sorted = []
        for (let m of patient.medication) {
            if(m.last_pick==true) {
                let { medication } = await get(`/medication/${m.medication_id}`)
                m.medicationObj = medication
            }

            sorted.push(m)
        }

        let result = []
        
        for(let med of sorted) {
            for(let t of med.treatment) {
                if(t.medicated) {
                    t.medName = med.medicationObj?.name
                    result.push(t)
                }
            }
            
        }

        console.log('result', result)

        return result
    } catch(e) {
        throw false
    }
}