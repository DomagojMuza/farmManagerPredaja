<template>
    <div class="field">
        <form @submit.prevent="UpdateActivity()" method="post">
            <p class="fieldHeader">Activity <strong class="fieldHeaderName">Edit</strong></p>
            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>
            
            <div class="holder">Created at:</div><br>
                <div class="createdAt">
                    {{moment(podaci.createdAt).format("Do MMM YYYY")}}
                </div>
            
            <div class="holder">Description</div><br>
            <div class="inputName">             
                <input v-model="podaci.description" type="text" name="" id="name" placeholder="Enter description" autocomplete="off">
            </div>
            
            <div class="holder">Scheduled at:</div><br>
                <div class="updatedAt">
                    {{moment(podaci.scheduledAt).format("Do MMM YYYY")}}
                </div>

            <div class="holder">Expense</div><br>
            <div class="inputName">             
                <input v-model="podaci.expense" type="number" name="" id="name" placeholder="Enter description" autocomplete="off">
            </div>

            <div class="holder">Field</div><br>
            <div class="crops">            
                <select v-model="podaci.field" id="field">
                    <option value="undefined" selected>Select field</option>
                    <option v-for="field in fields" :key="field._id" :value="field._id">{{field.name}}</option>
                </select>
            </div>

            <div class="holder">Culture</div><br>
            <div class="inputCulture">              
                <input v-model="podaci.reminder" class="reminder" type="checkbox" id="activityReminder" name="reminder">
                <label class="reminderLabel" for="reminder">Remind me</label><br>
            </div>
            <input class="updatebutton" type="submit" value="Update field">
        </form> 
    </div>
</template>


<script>
import {Field} from '@/services/field'
import {Activity} from '@/services/activity'
import moment from 'moment'
export default {
    name: 'FieldEdit',
    data(){
        return{
            moment,
            podaci: {},
            error: '',
            fields: []
        }
    },
    async created() {
        console.log();
        try {
            const resA = await Activity.OneActivity(this.$route.params._id)
            const resF = await Field.Fields(undefined, undefined, true)
            console.log(resF);
            this.fields = resF.data
            this.podaci = resA.data
            console.log(this.podaci);
        } catch (error) {
            console.log(error.data.error);
        }
    },
    methods: {
       async UpdateActivity(){
           const body = {
               "description": this.podaci.description,
               "expense": this.podaci.expense,
               "field": this.podaci.field,
               "reminder": this.podaci.reminder
           }
            try {
                const res = await Activity.EditActivity( this.$route.params._id, body)
                console.log(res);
                this.$router.push({path: '/activities'})
            } catch (error) {
                console.log(error);
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

    #culture, #area, #name, #activityReminder, #field{
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
    #name{
        text-align: center;
        color:#364f6b;
    }

    #field{
        width: 150px;
        color:#364f6b
    }

    #activityReminder{
        width: 40px;
    }

    .updatedAt, .createdAt{
        color: #364f6b;
        border-bottom: 1px solid #364f6b;
        user-select: none;
    }

    .reminderLabel{
        color: #364f6b;
        font-weight: 800;
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