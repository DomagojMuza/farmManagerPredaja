<template>
  <div class="hello">
    <div class="box">
        <div class="news">
            <header class="footer">
                <button class="weatherbutton" @click="page--, getNews()">prev</button>
                {{page}}
                <button class="weatherbutton" @click="page++, getNews()">next</button>
            </header>
            <div :class="{'active':error}">
                <p class="red item">{{this.error}}</p>
            </div>
            <transition-group name="news">
                <div class="data" v-for="(article, index) in news" :key="index">
                <a v-bind:href="article.link" target="_blank">
                    <img v-bind:src="article.image">
                    <div class="title">{{article.title}}</div>
                    <div class="date">{{article.postDate}}</div>
                </a>
                </div>
            </transition-group>
            <footer v-if="news.length !== 0" class="footer">
                <button class="weatherbutton" @click="page--, getNews()">prev</button>
                {{page}}
                <button class="weatherbutton" @click="page++, getNews()">next</button>
            </footer>
        </div>
      
    </div>
    
    
    
    
    
  </div>
</template>

<script>
import {News} from '@/services/index'

export default {
  name: 'Weather',
  data(){
    return{
      news: [],
      page: 1,
      error: ''
    }
  },
  async created(){
      await this.getNews()
  },
  methods: {
    async getNews(){
      if(this.page <=0) return this.page = 1;
      try {
        this.news = []
        this.error = 'Loading...'
        let res = await News.news(this.page)
        this.news = res.data;
        this.error = ''
      } catch (error) {
          this.error = error
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


.data a{
  display:inline-block;
  width:100%;
  height:100%;
  color: #fc5185;
  text-decoration: none;
}

.data img{
  width: 40%;
  height: auto;
  border-radius: 10px;
}
.data .title{
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 13px;
}

.data .date{
  font-family: 'Baloo Chettan 2', cursive;
  font-size: 10px;
}

.data:hover{
  transform: translate(-2px, 2px);
  box-shadow:inset 2px 2px 3px #5e5e5e, 
            inset -3px -3px 4px #dddddd;
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
}

.news-enter-active, 
.news-leave-active {
  transition: opacity 0.3s, transform 0.3s;
  transform-origin: left center;
}
.news-enter, .news-leave-to /* .list-leave-active for <2.1.8 */ {
  opacity: 0;
  transform: scale(0.5);
}


.news-move {
  transition: transform .4s linear .3;
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
