<template>
    <div>
        <input v-model="checkbox" type="checkbox" id="check">
        <label for="check">
            <i class="fas fa-bars" id="btn"></i>
            <i class="fas fa-times" id="cancle"></i>
        </label>
        <div class="navbar">
            <header>farmManger</header>
            <ul @click="close">
                <li>
                    <router-link v-if="this.$store.token" class="nav-link" to="/profile"><strong>Profile</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link" to="/weather"><strong>Weather</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link" to="/news"><strong>News</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link" to="/fields"><strong>Fields</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="subLink nav-link" to="/addfield"><strong>Add Field</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link" to="/activities"><strong>Activities</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link subLink" to="/addactivity"><strong>Add Activity</strong></router-link>
                </li>
                <li>
                    <router-link v-if="this.$store.token" class="nav-link subLink" to="/report"><strong>Report</strong></router-link>
                </li>
                <li>
                    <router-link v-if="!this.$store.token" class="nav-link" to="/signup"><strong>Sign up</strong></router-link>
                </li>
                <li>
                    <router-link v-if="!this.$store.token" class="nav-link" to="/"><strong>Login</strong></router-link>
                </li>
                <li>
                    <strong v-if="this.$store.token" @click="logout" class="delProfile">Logout</strong>
                </li>
                <li>
                    <strong v-if="this.$store.token" @click="deleteProfileModal" class="delProfile">Delete Profile</strong>
                </li>
            </ul>
   
        </div>
        <transition name="page-transition">
            <router-view class="view"></router-view>
        </transition>
        
    </div>
</template>

<script>
import Swal from 'sweetalert2'
import store from '@/store'
import {User} from '@/services/index'
export default {
    name:"Navbar",
    data(){
        return{
            checkbox: false,
            store
        }
    },
    methods: {
        close(){
            this.checkbox = !this.checkbox;
        },
        async deleteProfileModal(){
            Swal.fire({
            title: 'Leaving? :(',
            text: "After deleting account you can't revert it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#364f6b',
            cancelButtonColor: '#fc5185',
            confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
            if (result.value) {
                const res = await User.DeleteProfile()
                localStorage.clear()
                this.$store.token = false
                this.$store.user = false;
                console.log(res);
                    Swal.fire({
                    title: 'Deleted!',
                    text: `Your account(${res.data.email}) was deleted`,
                    confirmButtonColor: '#364f6b',
                    confirmButtonText: 'Close'
                    })
                this.$router.push({name: 'SignUp'})
            }
            })
        },
        logout(){
            localStorage.clear()
            this.$store.token = false
            this.$store.user = false;
            this.$router.push({name: 'Login'})
        }
    },
}
</script>


<style lang="css">

.subLink{
    font-size: 13px !important;
    padding-left: 35px !important;
}
.subLink:hover{
    padding-left: 55px !important;
}

.delProfile{
    cursor: pointer;
    color: #fc5185;
}

.delProfile:hover{
    color: #f0f0f0;
    background: #fc5185;
    box-shadow: 0 0 5px #fc5185, 0 0 15px #fc5185, 0 0 25px #fc5185
}

.navbar, ul, .nav-link, i{
    font-family: 'Roboto Mono', monospace;
    text-align: left;
    margin: 0px;
    padding: 0px;
    text-decoration: none;
    list-style: none;
    
}
strong{
    color: #f0f0f0;
}

.navbar{
    z-index: 100;
    position:fixed;
    left: -250px;
    width: 195px;
    height: 100%;
    background: #364f6b;
    transition: all .5s ease-in;
    overflow: scroll;
    overflow-x: hidden;
}

header{
    font-size: 30px;
    color: #fc5185;
    text-align: center;
    /* background: #17b978; */
    padding: 1px;
    font-weight: bold;
    user-select: none;
    line-height: 60px;
    padding: 5px;
}

.navbar ul a, .delProfile{
    /* display: block; */
    height: 100%;
    width: 100%;
    line-height: 50px;
    box-sizing: border-box;
    font-size: 20px;
    padding-left: 10px;
    text-align: center;
    transition: .5s;
}

ul li:hover a{
    padding-left: 30px;
}
.delProfile{
    display: block;
}

#check{
    display: none;
}

label #btn, label #cancle{
    position: absolute;
    cursor: pointer;
}

label #btn{
    left: 40px;
    top: 25px;
    font-size: 30px;
    transition: all .7s;
}

label #cancle{
    z-index: 1000;
    left: 160px;
    top: -175px;
    font-size: 25px;
    color:#f0f0f0;
    transition: all .5s ease-in;
    width: 25px;
}

#check:checked ~ .navbar{
    left: 0px;
}
#check:checked ~ .view{
    filter: blur(3px);
    width: 100%;
    height: 100%;
    background-color: #ccc;
    pointer-events: none;
    
}
#check:checked ~ label #btn{
    left: 195px;
    opacity: 0;
    pointer-events: none;
}

#check:checked ~ label #cancle{
    top: 0px;
}

@media only screen and (max-width: 800px){
    .navbar{
        position: absolute;
        top:0;
    }
    #check:checked ~ .navbar{
        height: 100%;
        top:0;
    }
}

@media only screen and (max-width: 600px){
    .view{
        margin-top:50px;
    }
}

.page-transition-enter-active {
  animation: swirl-in-fwd 1s;
}

.page-transition-leave-active {
  transition: all .3s;
  opacity: 0;
}

@keyframes swirl-in-fwd {
  0% {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
    opacity: 1;
  }
}
</style>