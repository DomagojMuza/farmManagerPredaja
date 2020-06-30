import {headers, SetHeaders, Service, PDF} from '@/services/index'



let Activity = {
    async AddActivity(body) {
        SetHeaders()
        try {
            return await Service.post('/activity', body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async Activites(search, skip, field_id){
        SetHeaders()
        console.log("field id",field_id);
        try {
            return await Service.get(`/activity?title=${search}&skip=${skip}&field=${field_id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async OneActivity(id){
        SetHeaders()
        try {
            return await Service.get(`/oneactivity/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async EditActivity(id, body){
        SetHeaders()
        try {
            return await Service.patch(`/activity/${id}`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async DeleteActivity(id){
        SetHeaders()
        try {
            return await Service.delete(`/activity/${id}`,{headers})
        } catch (error) {
            throw error.response
        }
    },
    async PDFMaker(from, to){
        SetHeaders()
        try {
            return await PDF.get(`/pdf?from=${from}&to=${to}`, {headers})
        } catch (error) {
            throw error.response
        }
    }
}


export {Activity}