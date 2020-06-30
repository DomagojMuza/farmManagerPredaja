<template>
    <div class="signup">
        <form @submit.prevent="ProfileUpdate" method="post">
            <p class="profileHeader">My <strong class="farmManager">Profile</strong></p>

            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>

            <div class="holder">Username</div><br>
            <div class="inputUsername">             
                <input v-model="data.username" type="text" name="" id="username" placeholder="Enter desired username" autocomplete="off" disabled>
            </div>

            <div class="holder">Email</div><br>
            <div class="inputEmail">              
                <input v-model="data.email" type="text" name="" id="email" placeholder="Enter valid email" autocomplete="off" disabled>
            </div>

            <div class="holder">Password</div><br>
            <div class="inputPassword">
                <input v-model="body.password" :type="passwordFieldType" name="" id="password" placeholder="Enter new password">
                <i @click="switchVisibility" class="fas fa-eye"></i>
            </div>
            <input class="updatebutton" type="submit" value="Update Profile">
        </form> 
    </div>
</template>


<script>
import {User} from '@/services/index'
export default {
    name: 'Profile',
    data(){
        return{
            data:{},
            body:{
                password: ''
            },
            error: '',
            passwordFieldType: 'password',
        }
    },
    async created() {
        console.log(localStorage.getItem('token'));
        const res = await User.Profile()
        if(res.status === 401) this.$router.push('login')
        this.data = res.data
    },
    methods: {
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
        },
        async ProfileUpdate(){
            try {
                await User.ProfileUpdate(this.body)
            } catch (error) {
                console.log(error);
                this.error = error.data.error
            }
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

    .profileHeader{
        font-size: 40px;
        user-select: none;
        transition: all 2s;
    }

    .farmManager{
        color: #364f6b;
    }

    #email, #password, #username{
        text-align: center;
        width: 300px;
        background: none;
        border: none;
        border-bottom: 1px solid #364f6b;
        outline: none;
        padding: 10px;
        font-size: 20px;
        /* border-radius: 5px; */
        color: #364f6b;
        
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

    .updatebutton{
        margin: 10px;
        padding: 8px 15px;
        color: #fc5185;
        text-transform: uppercase;
        letter-spacing: 3px;
        border: none;
        outline: none;
        transition: .3s;
        }

    .updatebutton:hover{
        color: #f0f0f0;
        background: #fc5185;
        box-shadow: 0 0 5px #fc5185, 0 0 15px #fc5185, 0 0 25px #fc5185
    }

    .holder{
        font-weight: bold;
        margin-top: 15px;
        margin-bottom: -10px;
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