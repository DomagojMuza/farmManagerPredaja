<template>
    <div class="signup">
        <form @submit.prevent="SetPassword" method="post">
            <p class="signUpHeader">Set up new <strong class="farmManager">Password</strong></p>

            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>

            <div class="inputPassword">
                <input v-model="body.password" :type="passwordFieldType" name="" id="password" placeholder="Enter password">
                <i @click="switchVisibility" class="fas fa-eye"></i>
            </div>
            <div class="inputPasswordRepeat">
                <input v-model="passwordRepeat" type="password" name="" id="passwordRepeat" placeholder="Repeat your password">
            </div>
            <input class="weatherbutton" type="submit" value="Sign Up">
        </form> 
    </div>
</template>


<script>
import {User} from '@/services/index'
export default {
    name: 'SignUp',
    data(){
        return{
            body:{
                password: ''
            },
            passwordRepeat: '',
            error: '',
            passwordFieldType: 'password',
        }
    },
    created() {
        console.log("usao je na passreset");
        console.log(this.$route.params.token);
    },
    methods: {
        async SetPassword(){
            if(this.body.password != this.passwordRepeat) return this.error = "Passwords do not match"
            try {
                await User.SetNewPassword(this.body, this.$route.params.token)
                this.$router.push({name: 'Login'})
            } catch (error) {
                console.log(error);
                this.error = error.data.error
            }
        },
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
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

    #email, #password, #passwordRepeat, #username{
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