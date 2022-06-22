const bodyParser = require('body-parser');
const express = require('express');
const request = require ('request');
const https =require ('https');

const app = express();
app.use (express.static('public'));
app.use (bodyParser.urlencoded({extended: true}))

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port 3000!`));

app.get ("/", function (req, res) {
    res.sendFile(__dirname + '/signup.html');
} );


app.post ("/", function (req,res){
  
    const firstName = req.body.fname
    const lastName = req.body.lname 
    const Email = req.body.email
     
    const data = { members: [
        {
            email_address: Email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }
    ]
};

    const jasondata = JSON.stringify(data);
    
    const options = {
        method: 'POST',
        auth: 'Harazem:c06279869e0853820d5050a8c6afbca8-us11'
    }
    const url = 'https://us11.api.mailchimp.com/3.0/lists/1cbbf674b3'
    
    const request = https.request(url,options, function (response) {
     
        if (response.statusCode === 200) {
           res.sendFile (__dirname + '/success.html')
        }  else {
            res.sendFile (__dirname + '/failure.html')
        }


            response.on ("data", function(data) {
            console.log (JSON.parse(data))
        })

    })

    request.write (jasondata);
    request.end();
})


app.post ('/failure', function (req,res) {
    res.redirect('/')
    // res.sendFile(__dirname + '/signup.html')

})

// 1cbbf674b3

// c06279869e0853820d5050a8c6afbca8-us11