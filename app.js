
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"))

app.get("/", function(req, res){
	res.sendFile(__dirname + "/signup.html")
})
app.post("/", function(req, res){
	const firstName = req.body.fName;
	const lastName = req.body.lName;
	const email = req.body.email;

	const data = {
		members:[
			{
				email_address: email,
				status: "subscribed",
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName
				}
			}
		]
	}

	const jsonData = JSON.stringify(data);

	const url = "https://us17.api.mailchimp.com/3.0/lists/d4cec6998f";
	const options = {
		method:"POST",
		auth: "Sahir:5a240001ee68a512209ec2852a6a879c-us17"
	}

	const request =  https.request(url, options, function(response){
		response.on("data", function(data){
			
		})
		var checkCode = response.statusCode;
		if(checkCode === 200){
			res.sendFile(__dirname + "/success.html");
		}else{
			res.sendFile(__dirname + "/failure.html");
		}
	})

	request.write(jsonData);
	request.end();



})

	app.post("/failure", function(req, res){
		res.redirect("/");
	})







app.listen(process.env.PORT || 3000, function(){
	console.log("This server is running in port 3000")
})


// API key
// 5a240001ee68a512209ec2852a6a879c-us17

// List ID
// d4cec6998f