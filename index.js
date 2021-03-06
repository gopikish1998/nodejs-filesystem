const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3000;
const date = new Date();
const day = date.getDate();
const filename = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;
app.use(cors({
    origin: "*"
}))

app.post('/write',async function(req,res){
    try {
        fs.access('./txts',(err)=>{
            if (err) {
                fs.mkdir('./txts', (err)=>{
                    fs.writeFile(`./txts/${filename}.txt`, `${date.toJSON()}`, function (err) {
                        if (err) 
                            return console.log(err);
                        console.log('TextFile created successfully');
                    });
                    res.json({
                        message:"File created successfully"
                    })
                })
            }
            else{
                    fs.writeFile(`./txts/${filename}.txt`, `${date.toJSON()}`, function (err) {
                        if (err) 
                            return console.log(err);
                        console.log('TextFile created successfully');
                    });
                    res.json({
                        message:"File created successfully"
                    })
            }
        })
        // console.log("File created successfully")
    } catch (error) {
        console.log(error)
    }
})
app.get('/read', function(req,res){
    let data=[]
    try {
        fs.readdir("./txts",function (err,files){
            if(err) throw err;
            files.forEach(element => {
                if(path.extname(element)==".txt"){
                    console.log(element)
                    data.push(element)
                }
            });
            res.json({data,
                message:"Files retrived successfully"
            })
        })
    } catch (error) {
        
    }
})

app.listen(PORT, function () {
    console.log(`The app is listening in port 3000`)
})