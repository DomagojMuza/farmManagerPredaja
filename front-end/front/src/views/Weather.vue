<template>
  <div class="hello">
    <div class="box">

      <input class="grad" type="text" v-model="grad" placeholder="Enter city name">
      <div class="buttons">
        <button class="weatherbutton" @click="prognozaToday">Today</button>
        <button class="weatherbutton" @click="prognozaNextDays">Next days</button>
      </div>
      
      <div :class="{'active':error}">
        <p class="red item">{{this.error}}</p>
      </div>
      
      <transition-group name="weather">
      <div tag="all" class="data" v-for="podatak in podaci.prognoza" :key="podatak.temp">
          <img tag="icon" v-bind:src="podatak.icon">
            <div tag="date">{{podatak.datum}}</div>
            <div tag="time">{{podatak.vrijeme}}</div>
            <div tah="temp">{{podatak.temp}}</div>            
        </div>
      </transition-group> 
    </div>    
  </div>
</template>

<script>
import {Weather} from '@/services/index'

export default {
  name: 'Weather',
  data(){
    return{
      podaci: [],
      news: [],
      page: 1,
      grad:'',
      error: ''
    }
  },
  created(){

  },
  methods: {
    async prognozaNextDays(){
      try {
        let res = await Weather.nextDays(this.grad)
        console.log(res);
        this.podaci = res.data;
      } catch (error) {
        console.log(error);
        this.error = error.data.error
      }
      
      
    },
    async prognozaToday(){
      try {
        let res = await Weather.today(this.grad)
        console.log(res);
        this.podaci = res.data
      } catch (error) {
        console.log(error);
        this.error = error.data.error
      }
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  display: grid;
  /* grid-template-columns: 8fr 2fr; */
}
.box{
  margin: 10px 0;
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

.grad{
  outline: none;
  font-size: 40px;
  font-weight: 900;
  text-shadow: 5px 2px 4px white;
  font-family: 'Baloo Chettan 2', cursive;
  color: #fc5185;
  border:none;
  background-color: #f0f0f0;
  text-align: center;
  border-radius: 100px;
  box-shadow:inset 3px 3px 5px #364f6b, 
            inset -3px -3px 5px #c3c3c3;
  /* transform: translateX(20%) */
}

.data{
  font-family: 'Roboto Mono', monospace;
  margin:35px auto;
  padding: 10px 0;
  width: 40%;
  text-shadow: 5px 2px 4px white;
  font-size: 25px;
  font-weight: bold;
  border-radius: 30px;
  box-shadow: 6px 6px 8px #364f6b, 
              -3px -3px 5px #c3c3c3;
  animation: 1s cubic-bezier(0.445, 0.050, 0.550, 0.950) both;
}

.data img{
  background: #43dde6;
  border-radius: 20px;
  box-shadow:inset 3px 3px 4px #364f6b, 
            inset -2px -2px 3px #c3c3c3;
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

.news{
  overflow: hidden;
  margin-top: 100px;
}

.newsHeader{
  color:#364f6b;
}

.article{
  text-align:right;
  margin: 10px 20px 20px 10px;
  border-radius: 20px;
  padding: 10px;
  color: #fc5185;
  box-shadow: 2px 2px 4px #364f6b, 
              -3px -3px 5px #c3c3c3;
}

.article a{
  display:inline-block;
  width:100%;
  height:100%;
  color: #fc5185;
  text-decoration: none;
}

.article img{
  width: 40%;
  height: auto;
  border-radius: 10px;
}
.news .title{
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 13px;
}

.news .date{
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 10px;
}

.article:hover{
  transform: translate(-2px, 2px);
  box-shadow:inset 2px 2px 3px #5e5e5e, 
            inset -3px -3px 4px #dddddd;
}


.weather-enter-active {
  animation: slide-in-left 2s;
}

.weather-leave-active {
  transition: all .3s;
  opacity: 0;
}

.news-enter-active {
  animation: slide-in-back 2s;
}

.news-leave-active {
  animation: slide-in-back 0.5s reverse;
}

.newstitle-enter-active, .newstitle-leave-active {
  opacity: 0;
}
.newstitle-enter, .newstitle-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes slide-in-left {
  
  0% {
    transition-delay: 5s;
    transform: translateX(-600px);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {         
    transform: translateX(0);;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {
    transform: translateX(-68px);
    animation-timing-function: ease-in;
  }
  72% {         
    transform: translateX(0);;
    animation-timing-function: ease-out;
  }
  81% {
    transform: translateX(-28px);
    animation-timing-function: ease-in;
  }
  90% {         
    transform: translateX(0);;
    animation-timing-function: ease-out;
  }
  95% {            
    transform: translateX(-8px);
   animation-timing-function: ease-in;
  }
  100% {         
    transform: translateX(0);;
    animation-timing-function: ease-out;
  }
}

@keyframes slide-in-back {
  0% {    
    transform: scale(0);
    animation-timing-function: ease-in;
    opacity: 0;
  }
  38% {    
    transform: scale(1);;
    animation-timing-function: ease-out;
    opacity: 1;
  }
  55% {      
    transform: scale(0.7);
    animation-timing-function: ease-in;
  }
  72% {    
    transform: scale(1);;
    animation-timing-function: ease-out;
  }
  81% {       
    transform: scale(0.84);
    animation-timing-function: ease-in;
  }
  89% {    
    transform: scale(1);;
    animation-timing-function: ease-out;
  }
  95% {       
    transform: scale(0.95);
    animation-timing-function: ease-in;
  }
  100% {    
    transform: scale(1);;
    animation-timing-function: ease-out;
  }
}





@media only screen and (max-width: 700px) {
  .hello {
    grid-template-columns: none;
  }

  .data{
    width: 90%;
  }

  .grad{
    max-width: 95vw;
    font-size: 30px;
    
  }

  .news-enter-active {
    animation: slide-in-left 2s;
}

  .news-leave-active {
    animation: slide-in-left 0.5s reverse;
  }
}

@media only screen and (max-width: 350px){
  .grad{
    font-size: 25px;
  }
}
</style>
