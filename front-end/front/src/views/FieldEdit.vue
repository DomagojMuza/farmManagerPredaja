<template>
    <div class="field">
        <form @submit.prevent="UpdateField()" method="post">
            <p class="fieldHeader">field <strong class="fieldHeaderName">Edit</strong></p>
            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>
            
            <div class="holder">Created at:</div><br>
                <div class="createdAt">
                    {{new Date(podaci.createdAt).getDate()}}.{{new Date(podaci.createdAt).getMonth()}}.{{new Date(podaci.createdAt).getFullYear()}}
                </div>
            <div class="holder">Last update:</div><br>
                <div class="updatedAt">
                    {{new Date(podaci.updatedAt).getDate()}}.{{new Date(podaci.updatedAt).getMonth()}}.{{new Date(podaci.updatedAt).getFullYear()}}
                </div>

            <div class="holder">Name</div><br>
            <div class="inputName">             
                <input v-model="podaci.name" type="text" name="" id="name" placeholder="Enter name" autocomplete="off">
            </div>

            <div class="holder">Culture</div><br>
            <div class="inputCulture">              
                <input v-model="podaci.culture" type="text" name="" id="culture" list="crop" placeholder="Enter valid culture" autocomplete="off">            
                <datalist id="crop">
                    <option v-for="crop in cropList" :key="crop" >{{crop}}</option>
                </datalist>
            </div>

            <div class="holder">Area</div><br>
            <div class="inputArea">
                <input v-model="podaci.area" type="text" name="" id="area" placeholder="Enter new password">
                <select v-model="podaci.unit" id="unit">
                    <option value="ha">ha</option>
                    <option value="m2">m&sup2;</option>
                    <option value="km2">km&sup2;</option>
                    <option value="ral">ral</option>
                </select>
            </div>
            <input class="updatebutton" type="submit" value="Update field">
        </form> 
    </div>
</template>


<script>
import {Field} from '@/services/field'
import cropList from '@/data/crops.json'

export default {
    name: 'FieldEdit',
    data(){
        return{
            podaci: {},
            error: '',
            cropList
        }
    },
    async created() {
        try {
            const res = await Field.OneField(this.$route.params._id)
            this.podaci = res.data
            console.log(this.podaci);
        } catch (error) {
            console.log(error.data.error);
        }
    },
    methods: {
       async UpdateField(){
           const body = {
               "name": this.podaci.name,
               "culture": this.podaci.culture,
               "unit": this.podaci.unit,
               "area": this.podaci.area
           }
            try {
                const res = await Field.EditField( this.$route.params._id, body)
                console.log(res);
                this.$router.push({path: '/fields'})
            } catch (error) {
                console.log(error.data.error);
            }
        } 
    }
    
}
</script>

<style lang="css" scoped>
    .field{
        font-family: 'Roboto Mono', monospace;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        }

    .fieldHeader{
        font-size: 40px;
        user-select: none;
        transition: all 2s;
    }

    .fieldHeaderName{
        color: #364f6b;
    }

    #culture, #area, #name, #unit{
        width: 300px;
        background: none;
        border: none;
        border-bottom: 1px solid #364f6b;
        outline: none;
        padding: 10px;
        font-size: 20px;
        /* border-radius: 5px; */
        color: #fc5185;  
    }

    .updatedAt, .createdAt{
        color: #364f6b;
        border-bottom: 1px solid #364f6b;
        user-select: none;
    }

    #unit{
        width: 80px;;
    }

    #area{
        width: 60px;
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
        user-select: none;
    }

@media only screen and (max-width: 450px){
    .active .item{
        height: 60px;
    }

}
</style>