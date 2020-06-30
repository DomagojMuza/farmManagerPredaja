const express = require('express');
const cors = require('cors');
var history = require('connect-history-api-fallback');
require('./db/mongoose')
require('./middleware/cron')

const UserRouter = require('./routes/user')
const FieldRoute = require('./routes/field')
const ActivityRoute = require('./routes/activity')
const PDFRoute = require('./routes/pdf')
const WeatherAndNews = require('./routes/weather_and_news')






const app = express();
app.use(cors())
app.use(history());
app.use(express.json())

if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/../public/'));
}

const port = process.env.PORT || 3000;


app.use(UserRouter)
app.use(FieldRoute)
app.use(ActivityRoute)
app.use(WeatherAndNews.WeatherRoute)
app.use(WeatherAndNews.NewsRoute)
app.use(PDFRoute)




 

app.listen(port, ()=>{
    console.log(`Server je na portu ${port}`);
})




