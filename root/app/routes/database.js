const {getModels} = require('node-car-api');
const {getBrands} = require('node-car-api');
const client = require('./connection.js');
const create = require('./create.js');

async function getCarsNames(){
        var brands = await getBrands();
    console.log(brands);
    return brands;
}

var informations = [];

async function getCarInformations()
{
    var brands = []
    brands =await getCarsNames();
    console.log(brands);
    var count = 1;
    for (var i = 0, len = brands.length; i < len; i++) {
        var info = await getModels(brands[i]);
        if(info.length>0)
        {
            for (var j = 0, len2 = info.length; j < len2; j++) {
                
                informations.push({ index: {_index: "cars", _type: "car", _id: count  } })
                var obj = JSON.stringify(info[j]);
                var obj2 = JSON.parse(obj);
                var volume = parseInt(obj2.volume);
                if(volume == NaN || volume == null)
                    {
                        volume = 0;
                    }
                obj2.volume = volume;
                informations.push(obj2)
                count+=1;
                }
        }
    }
    return informations;
}



function Write(element){
    var fs = require('fs');
    
    fs.writeFile('cars.json', element, 'utf8', function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
    });
}

function Read()
{
    var fs = require('fs');

    fs.readFile('cars.json', 'utf8', function(err, data) {  
        if (err) throw err;
        
        console.log("Document read");
        return data;
    });
}

var AddToElasticSearch= function AddToES()
{
    return new Promise(async function(resolve, reject) {
    var info = await getCarInformations();
    client.bulk({
        body: info
    },function(err, resp) {
        resolve(resp)
    })
    });
                       
}

function Search()
{
    client.search({  
  index: 'cars',
  type: 'car',
  body: {
        "from" : 0, "size" : 10, 
      	"query": {
      		match_all:{} 
      	},
          "sort": [
                { "volume":   { "order": "desc" }}
          	]
      }
  
        
  
},function (error, response,status) {
    if (error){
      console.log("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
      })
    }
});
}

Search();