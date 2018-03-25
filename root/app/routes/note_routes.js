const {getModels} = require('node-car-api');
const {getBrands} = require('node-car-api');

var client = require('./connection.js');

module.exports =function(app, db) {

    app.get("/suv", (req,res) => {
        
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
        return res.send("search error: "+error)
    }
    else {
      console.log("--- Response ---");
      console.log(response);
      console.log("--- Hits ---");
      response.hits.hits.forEach(function(hit){
        console.log(hit);
          
      })
        return res.send(response.hits);
    }
});
    });
    
    app.get("/populate", (req,res) => {
        Delete();
        create();
        res.send("The request is send. Please verify the console to see the advancement");
        AddToES();
    });
}



var informations = []

async function getCarsNames(){
        var brands = await getBrands();
    return brands;
}


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
                console.log(obj2);
                informations.push(obj2)
                count+=1;
                }
        }
    }
    return informations;
}


async function AddToES()
{
    getBrands("PEUGEOT");
    var info = await getCarInformations();
    
    client.bulk({
        body: info
    },function(err, resp) {
        resolve(resp)
    })
                       
}


function Delete()
{
    client.indices.delete({index: 'cars'},function(err,resp,status) {  
      console.log("delete",resp);
    });
}

function create()
{
    
    client.indices.create({  
      index: 'cars'
    },function(err,resp,status) {
      if(err) {
        console.log(err);
      }
      else {
        console.log("create",resp);
      }
    });

}


