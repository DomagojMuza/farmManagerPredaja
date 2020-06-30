const csv = require('csv-parser');
const fs = require('fs');

//sluzi za procitati csv file u obliku JSON-a
let cropList = []
fs.createReadStream('../crops.csv', 'utf-8')
  .pipe(csv())
  .on('data', (data) => {
      //cita red po red i push-a "Item" u cropList
      //prije push-a svaki "item" split-a po , i uzima samo prvi element
      // npr Almonds, with shell => ["Almonds", "with shell"] - uzima samo Almonds
    cropList.push(data["Item"].split(",")[0])
  })
  .on('end', () => {

    cropList = [... new Set(cropList)].sort()
    cropList = JSON.stringify(cropList)

    fs.writeFile('crops.json', cropList, function (err) {
        if (err) return console.log(err);
        console.log('Upisano');
      })

    fs.readFile('crops.json', (err, data) => {
    if (err) throw err;
    let crops = JSON.parse(data);
    console.log(crops);
    });

  })

