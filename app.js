const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));  //when the user enter into the input we have to require and use parser
app.use(express.static("public"));

app.get("/", function(req,res){
  console.log("I m working.");
  // console.log(__dirname);
  res.sendFile(__dirname + "\\signup.html");
});


app.post("/", function(req,res){

  const firstName = req.body.firstName;
  const lastName = req.body.lastNme;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME:lastName
        }
      }
    ]
  };
  const jsonData = JSON.stringify(data);

  const url = "https://us3.api.mailchimp.com/3.0/lists/5031c0e1a4";

  const options = {
    method: "POST",
    auth: "puchki:b7497ce3feb2c5f335cbe813ad42d659-us13"
  }

  const request = https.request(url,options,function(response){

    if(response.statusCode === 200){
      res.sendFile(__dirname + "\\success.html");
    }
    else{
      res.sendFile(__dirname + "\\failure.html");
    }

    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();

});

app.post("/failure", function(req,res){
  res.redirect("/");
})


app.listen(process.env.POST || 3000, function(){
  console.log("Server 3000 is working.");
});



// API Key
// b7497ce3feb2c5f335cbe813ad42d659-us13

// audience idea
// 5031c0e1a4

// url
// https://$API_SERVER.api.mailchimp.com/3.0/lists/
