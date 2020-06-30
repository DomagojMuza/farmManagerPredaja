<template>
    <div class="signup">
        <form @submit.prevent="signUp" method="post">
            <p class="signUpHeader">Login to <strong class="farmManager">farmManager</strong></p>

            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>

            <div class="inputEmail">                
                <input v-model="body.email" type="text" name="" id="email" placeholder="Enter valid email" autocomplete="off">
                
            </div>
            <div class="inputPassword">
                <input v-model="body.password" :type="passwordFieldType" name="" id="password" placeholder="Enter password">
                <i @click="switchVisibility" class="fas fa-eye"></i>
                <p class="forgotpass" @click="passmodal">Forgot password?</p>
            </div>
            <input class="weatherbutton" type="submit" value="Login">
        </form> 
    </div>
</template>


<script>
import {User} from '@/services/index'
import Swal from 'sweetalert2'
import store from '@/store'
export default {
    name: 'Login',
    data(){
        return{
            body:{
                email: '',
                password: ''
            },
            error: '',
            passwordFieldType: 'password',
            store
        }
    },
    methods: {
        async signUp(){
            try {
                let res = await User.Login(this.body)
                this.store.user = true
                this.$store.token = res.data.token
                await localStorage.setItem("token", res.data.token);
                this.$router.push('fields')
            } catch (error) {
                this.error = error.data.error
            }  
        },
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        },
        async passmodal(){
            Swal.fire({
                title: 'Enter your email',
                input: 'text',
                background: '#f0f0f0',
                confirmButtonColor: '#fc5185',
                cancelButtonColor: '#364f6b',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Look up',
                showLoaderOnConfirm: true,
                preConfirm: async (login) => {
                    try {
                        const res = await User.PasswordResetMail(login)
                        console.log(res);
                        return res.data
                    } catch (error) {
                        return error.data
                    }
                },
                allowOutsideClick: () => !Swal.isLoading()
                }).then((res) =>{
                    if (res.value) {
                        Swal.fire({
                            background: '#f0f0f0',
                            title: res.value
                        })
                    }
                })
        }
        
    },
}
</script>


<style lang="css" scoped>
    .signup{
        font-family: 'Roboto Mono', monospace;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
    }

    .signUpHeader{
        font-size: 40px;
        user-select: none;
        transition: all 2s;
    }

    .farmManager{
        color: #364f6b;
    }

    #email, #password, #passwordRepeat{
        width: 300px;
        background: #364f6b;
        border: none;
        outline: none;
        padding: 10px;
        font-size: 20px;
        border-radius: 5px;
        color: #fc5185;
        margin: 5px 0;
    }

    .inputPassword{
        margin-left: 28px;
    }

    .forgotpass{
        width: 150px;
        font-size: 15px;
        margin: 0px;
        padding-left: 5px;
        text-align: left;
        margin-left: 60px;
        cursor: pointer;
        transition: all .2s;
    }

    .forgotpass:hover{
        color: #f0f0f0;
        background: #fc5185;
        box-shadow: 0 0 2px #fc5185, 0 0 8px #fc5185, 0 0 15px #fc5185;
        border-radius: 5px;
    }

    .fa-eye{
        padding-top : 16.5px;
        padding-left: 5px;
        font-size: 20px;
        cursor: pointer;
    }

    .red {
        color: red;
    }

    .item {
        opacity: 0; 
        height: 0;
        transition: opacity 0.5s, height 0.5s 0.1s;
    }

    .active .item {
        opacity: 1;
        height: 30px;
        transition: opacity 0.3s 0.3s, height 0.5s;
    }

    .weatherbutton{
        margin: 10px;
        padding: 8px 15px;
        color: #fc5185;
        text-transform: uppercase;
        letter-spacing: 3px;
        border: none;
        outline: none;
        transition: .3s;
        }

    .weatherbutton:hover{
        color: #f0f0f0;
        background: #fc5185;
        box-shadow: 0 0 5px #fc5185, 0 0 15px #fc5185, 0 0 25px #fc5185
    }

@media only screen and (max-width: 450px){
    .inputPassword{
        margin-left: 0px;
    }
    .fa-eye{
        display: none;
    }
    .active .item{
        height: 60px;
    }

}
</style>