import axios from 'axios'


let Service = axios.create({
    baseURL: "/api",
    timeout: 10000
})

let PDF = axios.create({
    baseURL: "api",
    timeout: 10000,
    responseType:'blob'
})

var headers ={}

const SetHeaders = () =>{
    headers = {'Authorization':'Bearer ' + localStorage.getItem('token')}
}

let Weather = {
    async nextDays(grad){
        try {
            return await Service.get('/weather/nextDays?grad='+ grad)
        } catch (error) {
            console.log("next ",error);
            throw error.response
        }
    },
    async today(grad){    
        try {
            const res =  await Service.get('/weather/today?grad='+ grad)
            console.log(res);
            return res
        } catch (error) {
            console.log("today ",error);
            throw error.response
        }
    }
}
let News = {
    news(page){
        return Service.get(`/news?page=${page}`)
    }
}


let User = {
    async signUp(form){
        try {
            return await Service.post('/users', form)            
        } catch (error) {
            throw error.response;
        }
    },
    async Login(form){
        try {
            return await Service.post('/users/login', form)
        } catch (error) {
            // console.log(error.response);
            throw error.response;
        }
    },
    async Profile(){
        SetHeaders()
        try {
            return await Service.get('users/me', {headers})
        } catch (error) {
            console.log(error.response.status);
            throw error.response;
        }
    },
    async ProfileUpdate(form){
        SetHeaders()
        try {
            return await Service.patch('/users/me', form, {headers})
        } catch (error) {
            console.log(error.response);
            throw error.response;
        }
    },
    async DeleteProfile(){
        SetHeaders()
        try {
            return await Service.delete('/users/me', {headers})
        } catch (error) {
            throw error.response;
        }
    },
    async PasswordResetMail(email){
        try {
            const res =  await Service.post('/users/passreset', {email})
            console.log("res", res);
            return res
        } catch (error) {
            console.log("error", error);
            throw error.response;
        }
    },
    async SetNewPassword(body, token){
        try {
            const res =  await Service.post(`/users/passreset/${token}`, body)
            console.log("res", res);
            return res
        } catch (error) {
            console.log(error);
            throw error.response;
        }
    }
}




export {Service, PDF, Weather, News, User, headers, SetHeaders}