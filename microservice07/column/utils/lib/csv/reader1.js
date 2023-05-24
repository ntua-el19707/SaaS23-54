const fs = require('fs');
const csv = require('csv-parser');
 

 

 function  getJsonFromFile(file){
  const csvFilePath = 'column.csv';
  const jsonObject = {
    Title: ('',''),
    Subtitle: ('',''),
    XAxis: '',
    categories: [],
    YAxis: '',
    series: []
  };
   
  let currentSeries = null;
  let yValues = [];
   
  fs.createReadStream(csvFilePath)
    .pipe(csv({ headers: false }))
    .on('data', (row) => {
      const key = row[0];
      const text = row[1];
      const align = row[2];
   
      if (key === "Title") {
        jsonObject.Title = {text,align};
      } else if (key === "Subtitle") {
        jsonObject.Subtitle = {text,align};
      } else if (key === "XAxis") {
        jsonObject["XAxis"] = text;
      } else if (key === "categories") {
        jsonObject.categories = JSON.parse(text);
      } else if (key === "YAxis") {
        jsonObject["YAxis"] = text;
      } else if (key === "name") {
        if (currentSeries) {
          jsonObject.series.push({
            name: currentSeries,
            data: yValues.slice(1)  // Exclude the first null value
          })
          yValues = [];
        }
        currentSeries = text;
      } else if (currentSeries && row[2] !== undefined) {
    
        yValues.push(Number(row[1]));
      }
    })
    .on('end', () => {
      if (currentSeries) {
        jsonObject.series.push({
          name:currentSeries,
          data: yValues.slice(1)  // Exclude the first null value
        });
      }
      console.log(JSON.stringify(jsonObject, null, 2));
    });
 }
 module.exports ={getJsonFromFile}