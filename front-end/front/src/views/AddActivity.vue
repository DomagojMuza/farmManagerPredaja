<template>
    <div class="signup">
        <form @submit.prevent="AddActivityForm" method="post">
            <p class="signUpHeader">Add new <strong class="farmManager">Activity</strong></p>

            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>

            <div class="desc">                
                <input v-model="body.description" type="text" name="" id="description" placeholder="Description" autocomplete="off">
            </div>
            <div class="price">    
                <input type="number" v-model="body.expense" id="expense" placeholder="Expense">        
            </div>
            <div class="schedule">
                <input type="text" v-model="body.scheduledAt" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Schedule date" id="activitySchedule">
            </div>
            <div class="crops">            
                <select v-model="body.field" id="field">
                    <option value="undefined" selected>Select field</option>
                    <option v-for="field in fields" :key="field._id" :value="field._id">{{field.name}}</option>
                </select>
            </div>
            <div class="inputactivityReminder"> 
                <input v-model="body.reminder" class="reminder" type="checkbox" id="activityReminder" name="reminder">
                    <label class="reminderLabel" for="reminder">Remind me</label><br>                     
            </div>
            <input class="weatherbutton" type="submit" value="Add Activity">
        </form> 
    </div>
</template>


<script>
import {Activity} from '@/services/activity'
import {Field} from '@/services/field'
export default {
    name: 'AddActivity',
    data(){
        return{
            body:{
                description: undefined,
                expense: undefined,
                reminder: false,
                scheduledAt: undefined,
                field: undefined
            },
            error: '',
            fields: []
        }
    },
    async created() {
        
        try {
            const res = await Field.Fields(undefined, undefined, true)
            this.fields = res.data
        } catch (error) {
            this.error = error.data.error
        }
    },
    methods: {
        async AddActivityForm(){
            this.error = ''
            for (let [value] of Object.entries(this.body)) {
            console.log(value ,this.body[value]);
            this.body[value] = this.body[value] === null || this.body[value] === "" ? undefined : this.body[value]
        }
           try {
                const res = await Activity.AddActivity(this.body)
                console.log(res);
                this.$router.push('Activities')
           } catch (error) {
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

    .signUpHeader{
        font-size: 40px;
        user-select: none;
        transition: all 2s;
    }

    .farmManager{
        color: #364f6b;
    }

    #description, #activityReminder, #units, #expense, #activitySchedule ,#field{
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

    #field{
        width: 150px;
    }

    #units{
        width: 80px;
        margin-left: 10px;
        font-size: 18px;
    }

    #activityReminder{
        width: 40px;
    }

    #activitySchedule{
        width: 150px;
        height: 23px;
        font-size: 15px;
    }
    #activitySchedule::-webkit-inner-spin-button {
        display: none; 
    }

    .inputPassword{
        margin-left: 28px;
    }
    
    #expense{
        width: 200px;
    }

    .reminderLabel{
        color: #364f6b;
        font-weight: 800;
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