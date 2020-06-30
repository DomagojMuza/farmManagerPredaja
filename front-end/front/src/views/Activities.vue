<template>
  <div class="hello">
    <div class="box">

      <input class="grad" type="text" v-model="search" placeholder="Search">

      <div>
        <button class="pagebutton" @click="clearParam()">Clear</button>
      </div>
      
      
      <div :class="{'active':error}">
        <p class="red item">{{this.error}}</p>
      </div>
      
      <transition-group name="weather">
      <div class="data" v-for="podatak in podaci" :key="podatak._id">
        <router-link class="fieldLink" :to="{ name: 'ActivityEdit', params: {_id: podatak._id} }">
          <div tag="date"><strong>Description: </strong> {{podatak.description}}</div>
          <div tag="time"><strong>Expense: </strong>{{podatak.expense}}</div>
          <i class="fas fa-minus-circle" title="Delete" @click.prevent="deleteActivity(podatak._id)"></i>
        </router-link>         
        </div>
      </transition-group> 
      <footer v-if="this.podaci.length !== 0"  class="footer">
        <button v-if="this.page > 0" class="pagebutton" @click="prev">prev</button>
        <button v-if="this.podaci.length === 5" class="pagebutton" @click="next">next</button>
      </footer>
      
    </div> 

  </div>
</template>

<script>
import _ from 'lodash'
import {Activity} from '@/services/activity'
export default {
  name: 'Weather',
  data(){
    return{
      podaci: [],
      page: 0,
      search:'',
      error: ''
    }
  },
  async created(){
    await this.getData()
    
  },
  methods: {
    async getData(){
      console.log(this.$route.params.field_id);
      try {
        const res = await Activity.Activites(undefined, undefined, this.$route.params.field_id)
        console.log(res);
        this.podaci = res.data.activities
      } catch (error) {
        this.error = error.data.error
      }
    },
    async next(){
      try {
        const res = await Activity.Activites(this.search, ++this.page, this.$route.params.field_id)
        console.log(res.data.activities);
        console.log(res.data.activities.length === 0);
        res.data.activities.length === 0 ? this.page-- : this.podaci = res.data.activities
      } catch (error) {
        this.error = error.data.error
      } 
    },
    async prev(){
      this.page = --this.page < 0 ? 0 : this.page
      try {
        const res = await Activity.Activites(this.search, this.page, this.$route.params.field_id)
        this.podaci = res.data.activities
      } catch (error) {
        this.error = error.data.error
      }
    },
    async deleteActivity(id){
      try {
        await Activity.DeleteActivity(id)
        await this.getData()
      } catch (error) {
        this.error = error.data.error
      }
    },
    async clearParam(){
      this.$route.params.field_id = undefined
      await this.getData()
    }
  },
  watch: {
    search: _.debounce(async function(val) {
      try {
        const res = await Activity.Activites(val, undefined, this.$route.params.field_id)
        this.podaci = res.data.activities
      } catch (error) {
        this.error = error.data.error
      }
    }, 500)
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

.pagebutton{
  margin: 10px;
  padding: 8px 15px;
  color: #fc5185;
  text-transform: uppercase;
  letter-spacing: 3px;
  border: none;
  outline: none;
  transition: .3s;
}

.pagebutton:hover{
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
  cursor: pointer;
}

.data:hover{
  transform: translate(-2px, 2px);
  box-shadow:inset 2px 2px 3px #364f6b, 
            inset -3px -3px 4px #c3c3c3;
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

strong{
  color: #364f6b;
}

.fa-minus-circle::before{
  margin: 7px;
}
.fa-minus-circle{
  transition: all .5s;
}
.fa-minus-circle:hover{
  transform: scale(1.5);
}

.fieldLink{
  text-decoration: none;
  list-style: none;
  color: #fc5185;
}

.weather-enter-active, 
.weather-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: left center;
}
.weather-enter, .weather-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0.5);
}

.weather-leave-active {
  position: absolute;
}

.weather-move {
  transition: transform .4s linear .3;
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
