const fs = require('file-system');
const express = require('express');
const csv = require('csvtojson');
const app = express();
const port = 8000;
const inputFile = './users.csv';
const outputFile = 'users.json'

app.get('/',(req,res)=>{
    res.json({message:`Server is Running on Port ${port} `})
});

app.get('/convert',(req,res)=>{
    res.send("Converting in process");
    csv()
    .fromFile(inputFile)
    .then((data)=>{
        let newData = data.map(({
            first_name,last_name,phone
        })=>{
let first = first_name;
let last = last_name;
let Phone = phone;
if(phone === ""){
    phone = "missing data";
}
return {first,last,phone}
        });
        fs.writeFile(outputFile,JSON.stringify(newData));
    })

})
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})