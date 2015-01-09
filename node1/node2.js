var mongo = require('mongoose');



mongo.connect('mongodb://localhost/energytest');

var db = mongo.connection;
var Schema = mongo.Schema;

db.on('error', console.error.bind(console, 'connection error:'));

var AlfredSchema = new Schema({
	hub_id : { type : String, required : true },
	socket : {type : Number, required : true},
	power : {type : Number},
	power_factor : {type : Number},
	voltage : {type : Number},
	current : {type : Number},
	devices_states : [Number],
	timestamp : {type : Date}	
}, { collection : 'alfreds' });


 var Alfred = mongo.model('Alfred',AlfredSchema);

 /*exports.get = function(starttime, endtime , hub_id ,callback){
 Alfred.find( {$and: [{timestamp : {$gt: starttime, $lt: endtime }},{ hub_id : hub_id }]},function(err,energytest) {
  if (err) console.error(err);
   console.log("first method");
   console.dir(energytest);
})
}*/

/*exports.getlist = function(starttime,endtime,hub_id , callback){
  Alfred.find( { $and :[ { timestamp : {$gt:1419618600000, $lt: 1419670893000 }},{ hub_id : 'hub' }]},{type : '_id'},function(err,energytest) {
      if (err) console.error(err);
      console.log("2nd method");
   //console.dir(energytest);
  
})
 }*/
  
 var map1 =  function() {
      	 emit(this.hub_id,this.power);  
 }
 var reduce1 = function(key,vals) {
          return Array.sum(vals);
 }
  
  Alfred.mapReduce ( {
      map: map1,
      reduce: reduce1,
  	  out :  {inline:1} 
  	},function(err,result){
  	 	console.log(result);
  	});
  
/*var myoutputSchema = new Schema ( {
   socket : {type : Number},
   value :  {type : Number}
 },{ collection : 'myoutput'});

 var Myoutput = mongo.model('Myoutput', myoutputSchema);
 
 /*Myoutput.find({},function(err,docs) {
  	if (err) console.error(err);
  	  console.log(docs);
  })*/
 /*var action = function (err, collection) {
    // Locate all the entries using find
    collection.find({'hub_id':'hub'}).toArray(function(err, results) {
        console.log(results);
    });
};

mongo.connection.db.collection('myoutput',action);

/*
exports.getById = function(id, callback){
Alfred.findOne({_id : id },function(err,energytest)  {
    if (err) console.error(err);
    console.log('3rd method');
    console.dir(energytest);

})
}

exports.deleteById = function(id) {
Alfred.remove( { _id : id },function(err)
{
	 if (err) console.error(err);
	 console.log('4th method');
})

}
*/


