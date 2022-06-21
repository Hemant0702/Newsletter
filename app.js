const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const em = req.body.email;
    const pas = req.body.password;
    console.log(firstName);
    console.log(lastName);
    console.log(em);
    console.log(pas);
    
    const data = {
        members: [
            {
                email_address: em,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }
    const jsonData = JSON.stringify(data);
    const url = "https://us9.api.mailchimp.com/3.0/lists/afabf9513a";
    const options ={
        method: "POST",
        auth: "Hemant0702:174650326b358a04f56d90b6814d84a8-us9"
    }
    const request = https.request(url, options, function(response) {
        response.on("data",function(data){
            console.log(JSON.parse(data));
            console.log("status",response.statusCode);
            if(response.statusCode === 200)
            {
                res.sendFile(__dirname + "/success.html");
            }
            else
            {
                res.sendFile(__dirname + "/failure.html")
            }
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on 3000");
})

// api = 174650326b358a04f56d90b6814d84a8-us9;
// list id = afabf9513a

// const run = async () => {
//     const response = await client.lists.addListMember("list_id",
//         {
//             email_address: "Elinore.Grady9@gmail.com",
//             status: "pending",
//             merge_fields: {
//                 FNAME: "Elinore",
//                 LNAME: "Grady",
//                 BIRTHDAY: "01/22",
//                 ADDRESS: {
//                     addr1: "123 Freddie Ave",
//                     city: "Atlanta",
//                     state: "GA",
//                     zip: "12345",
//                 },
//             },
//         },
//         {
//             skipMergeValidation: false
//         }
//     );
// };


// run();