<template>
    <div class="field">
        <p class="signUpHeader">Generate <strong class="farmManager">Report</strong> from activites</p>
        <div :class="{'active':error}">
            <p class="red item">{{this.error}}</p>
        </div>
        <label for="">From</label>
        <div>
            <input type="text" v-model="from" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Schedule date" id="activitySchedule">
        </div>

        <label for="">To</label>
        <div>
            <input type="text" v-model="to" onfocus="(this.type='date')" onblur="(this.type='text')" placeholder="Schedule date" id="activitySchedule">
        </div>

        <input class="updatebutton" @click="generateReport" type="submit" value="Generate report">
    </div>
</template>


<script>
import {Activity} from '@/services/activity'
import moment from 'moment'
import download from 'downloadjs'
export default {
    name: 'FieldEdit',
    data(){
        return{
            moment,
            from: '',
            to: '',
            error: ''
            
        }
    },
    methods: {
       async generateReport(){
           this.error = ''
           if(this.from > this.to || this.from === '' || this.to === ''){
               return this.error = 'Nedopusteno'
           }
           try {
            this.error = 'Processing...'
            const data = await Activity.PDFMaker(this.from, this.to)
            const date = moment().format('Do MM YYYY');
            download(data.data, `report-${date}.pdf`, data.data.type);
            this.error = ''
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
        flex-direction: column;
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

    #activitySchedule{
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
    #activitySchedule{
        width: 150px;
        height: 23px;
        font-size: 15px;
    }
    #activitySchedule::-webkit-inner-spin-button {
        display: none; 
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