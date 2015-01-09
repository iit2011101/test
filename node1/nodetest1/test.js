var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/nodetest1');


    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        // res.render('userlist', {
        //     "userlist" : docs
        //});
       // console.log(docs)


    });
