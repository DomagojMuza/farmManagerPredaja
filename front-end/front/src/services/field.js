import {headers, SetHeaders, Service} from '@/services/index'


let Field = {
    async InputField(body){
        SetHeaders()
        try {
            return await Service.post('/fields', body, {headers})
        } catch (error) {
            console.log(error.response);
            throw error.response
        }
    },
    async Fields(search, skip, short){
        console.log("short", short);
        SetHeaders()
        try {
            return await Service.get(`/fields?title=${search}&skip=${skip}&short=${short}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async OneField(id){
        SetHeaders()
        try {
            return await Service.get(`/fields/${id}`, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async EditField(id, body){
        SetHeaders()
        try {
            return await Service.patch(`/fields/${id}`, body, {headers})
        } catch (error) {
            throw error.response
        }
    },
    async DeleteField(id){
        SetHeaders()
        try {
            return await Service.delete(`/fields/${id}`,{headers})
        } catch (error) {
            throw error.response
        }
    },
}

export {Field}