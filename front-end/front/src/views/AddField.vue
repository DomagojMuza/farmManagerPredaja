<template>
    <div class="signup">
        <form @submit.prevent="AddFieldForm" method="post">
            <p class="signUpHeader">Add new <strong class="farmManager">Field</strong></p>

            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>

            <div class="inputFieldName">                
                <input v-model="body.name" type="text" name="" id="fieldName" placeholder="Name" autocomplete="off">
            </div>
            <div class="crops">    
                <input type="text" v-model="body.culture" id="cropType" list="crop" placeholder="Crop" autocomplete="off">            
                <datalist id="crop">
                    <option v-for="crop in cropList" :key="crop" >{{crop}}</option>
                </datalist>
            </div>
            <div class="inputFieldArea">                
                <input v-model="body.area" type="number" name="" id="fieldArea" placeholder="Area" autocomplete="off">
                <select v-model="body.unit" id="units" >
                    <option value="ha">ha</option>
                    <option value="m2">m&sup2;</option>
                    <option value="km2">km&sup2;</option>
                    <option value="ral">ral</option>
                </select>
            </div>
            <input class="weatherbutton" type="submit" value="Add Field">
        </form> 
    </div>
</template>


<script>
import {Field} from '@/services/field'
import cropList from '@/data/crops.json'
import store from '@/store'
export default {
    name: 'AddField',
    data(){
        return{
            body:{
                name: '',
                culture: '',
                area: '',
                unit: 'ha'
            },
            error: '',
            store,
            cropList
        }
    },
    methods: {
        async AddFieldForm(){
            console.log(this.body);
            try {
                await Field.InputField(this.body)
                this.$router.push('Fields')
            } catch (error) {
                this.error = error.data.error.message
            }  
        }
    },
}
</script>


<style lang="css" scoped>
    datalist{
        position: absolute;
    }

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

    #fieldName, #fieldArea, #units, #cropType{
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

    #units{
        width: 80px;
        margin-left: 10px;
        font-size: 18px;
    }

    #fieldArea{
        width: 100px;
    }

    .inputPassword{
        margin-left: 28px;
    }
    
    #cropType{
        width: 280px;
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

</style>