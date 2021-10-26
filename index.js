const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv")
dotenv.config();
const date = new Date();
const day = date.getDate();
const filename = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
app.use(cors({
    origin: "*"
}))

app.post('/write',async function(req,res){

    try {
        fs.mkdir('./txts/',(err)=>{
            if (err) throw err;
            fs.writeFile(`./txts/${filename}.txt`, `${date.toJSON()}`, function (err) {
                if (err) 
                    return console.log(err);
                console.log('TextFile created successfully');
            });
            res.json({
                message:"File created successfully"
            })
        })
        
        // console.log("File created successfully")
    } catch (error) {
        console.log(error)
    }
})
app.get('/read', function(req,res){
    try {
        fs.readdir("./txts",function (err,files){
            if(err) throw err;
            files.forEach(element => {
                if(path.extname(element)==".txt"){
                    console.log(element)
                }
            });
            res.json({
                message:"Files retrived successfully"
            })
        })
    } catch (error) {
        
    }
})

app.listen(PORT, function () {
    console.log(`The app is listening in port 3000`)
})