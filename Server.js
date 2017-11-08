var express=require('express');
var app=express();
var path = require('path');
var watson=require('.//app.js');
app.use(express.static(__dirname + '/public'));
var router = express.Router();
var  message=[{"Type":"Received","Author":"Watson","Text":"This is watson","TimeStamp":new Date()}]

router.get('/',function(req,res){
    
    res.sendFile(path.join(__dirname, '/', 'public','/','Views', 'index.html'));
   // res.json(message);
    //console.log(path.join(__dirname, '/', 'Client','/','Views', 'index.html'));
});

var bodyParser = require('body-parser');// to read data from req.body
//var multer = require('multer');//to read objectified data
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
var sentdata={};
var  message=[]
app.post('/watson',function (req, res, next) {

            // /console.log(JSON.stringify(sentdata));
            message.push(req.body);
            console.log({
                      input:req.body,workspace_id: '6158aa0e-620c-4d57-aa03-e9bca3462dbb'
                     });
                     watson.message({
                        input:{ text: req.body.Text },
                        workspace_id: '6158aa0e-620c-4d57-aa03-e9bca3462dbb'
                    }, function(err, response) {
                        if (err) {
                          console.error(err);
                        } else {
                                var text='';
                            sentdata.Author="Watson";
                            sentdata.Type="Received";
                            if(response.output.text.length>1){
                                for(data in response.output.text ){
                                text=text+'\n'+response.output.text[data];
                                }
                            }
                            else
                            text=response.output.text[0];
                            sentdata.Text=text;
                            sentdata.Author=new Date();
                            console.log(JSON.stringify(response));
                            message.push(sentdata)
                            res.json(message);
                        }
                    }); 
   
  });
//console.log(path.join(__dirname));
app.use('/',router);

app.listen(3000);
module.exports=app;