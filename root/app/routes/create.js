var client = require('./connection.js');


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

var creation = function CreationOfIndex()
{
    Delete();
    create();
}
