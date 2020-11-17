import axios from 'axios';
import SyncStorage from 'sync-storage';

import {get} from './axios'
import {getProfile, upProfile} from './patient'

export async function getMedication() {
    const user = JSON.parse(SyncStorage.get('user'))
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

        return search
    } catch(e) {
        throw false
    }
}

export async function getDailyMedication() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)


        let sorted = []
        for (let m of patient.medication) {
            if(m.last_pick==true) {
                let { medication } = await get(`/medication/${m.medication_id}`)
                m.medication_id = medication
                m.medicationObj = medication
                sorted.push(m)
            }
        }

        return sorted
    } catch(e) {
        throw false
    }
}

export function isMedicated(medication: any) {
    let sorted = medication.filter((m: any) => m.last_pick == true)

    let result = false

    for(let medicine of sorted) {
        medicine.medication_id = medication
            
        medicine.treatment = medicine.treatment.map(t => {
            
            if((t.medicated) && (new Date(t.main_date).getDate() == new Date(Date.now()).getDate()) && (new Date(t.main_date).getMonth() == new Date(Date.now()).getMonth())) {
                result = true
            }

            return t
        })
    }

    console.log('result', result)

    return result
}

export async function getTreatment() {
    const user = JSON.parse(SyncStorage.get('user'))
    try {
        let { patient } = await get(`/patient/user/${user._id}`)
        let ids = []
        let sorted = patient.medication.filter((m: any) => m.last_pick == true)
        
        let search = []

        for(let medicine of sorted) {
            let { medication } = await get(`/medication/${medicine.medication_id}`)
            medicine.medication_id = medication
            medicine.medicationObj = medication
   
            medicine.treatment = medicine.treatment.map(t => {
                if((t.medicated) && (new Date(t.main_date).getDate() == new Date(Date.now()).getDate()) && (new Date(t.main_date).getMonth() == new Date(Date.now()).getMonth())) {
                    medicine.medicateToday = true
                }

                return t
            })
                

            search.push(medicine)
        }
        let treatment = search.map((item: any) => {
            // console.log('sucesso getTreatment 1: ', item)
            // return item
            if(item.treatment.length > 0 )
                return true
            else
                return false
            })

        
        
        return treatment.includes(true) ? search : []
    } catch(e) {
        console.log('error getTreatment')
        return false
    }
}

export async function updateTreatment(initMedication = false, medicateDate = new Date(Date.now()), mainDate = new Date()) {
    const treatment = {
        main_date: medicateDate,
        medicate_date: mainDate,
        medicated: true
    }

    let profile = await getProfile()

    let treatmentArray: { main_date: string | Date; medicate_date: Date; medicated: boolean; }[] = []
    // SEPARAR PARA não initMedication
    if(initMedication) {
        for(let i = 1; i <= 30; i++) {
            treatmentArray.push({
                main_date: i == 1 ? medicateDate : new Date(mainDate.setDate(mainDate.getDate() + 1)),
                medicate_date: i == 1 ? medicateDate : '',
                medicated: i == 1 ? true : false
            })
        }
        profile.medication = profile.medication.map((m) => {
            if(m.last_pick==true) {
                m.treatment = [...treatmentArray]
            } 
    
            return m
            
        })
    } else {
        profile.medication = profile.medication.map((m) => {
            if(m.last_pick==true) {
                m.treatment = m.treatment.map(t => {
                    if((new Date(t.main_date).getDate() == new Date(Date.now()).getDate()) && (new Date(t.main_date).getMonth() == new Date(Date.now()).getMonth())) {
                        console.log('entra no if')
                        t.medicate_date = new Date(Date.now())
                        t.medicated = true
                    }

                    return t
                })
            }

            return m
        })
    }
    
    // profile.medication[].treatment[]
    console.log(profile)


    let profileUpdated = await upProfile(profile._id, profile)

    return profileUpdated
}


