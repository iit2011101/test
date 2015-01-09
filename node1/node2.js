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

 exports.get = function(starttime, endtime , hubid ,callback){
 Alfred.find( {$and: [{timestamp : {$gt: starttime, $lt: endtime }},{ hub_id : hubid }]},function(err,energytest) {
  if (err) console.error(err);
     console.log("get method");
     console.dir(energytest);
})
}

exports.getlist = function(starttime,endtime,hubid , callback){
  Alfred.find( { $and :[ { timestamp : {$gt: starttime, $lt: endtime }},{ hub_id : hubid }]},{type : '_id'},function(err,energytest) {
      if (err) console.error(err);
      console.log(" getlist method");
      console.log(energytest);
 })
 }
  
exports.getById = function(id, callback){
Alfred.findOne({_id : id },function(err,energytest)  {
    if (err) console.error(err);
    console.log('get by id method');
    console.dir(energytest);

})
}

exports.deleteById = function(id) {
Alfred.remove( { _id : id },function(err)
{
	 if (err) console.error(err);
	 console.log('deleted by id');
 
})
}

exports.sum_power = function() {

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

}
