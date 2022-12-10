const express = require("express");
const mongoose = require("mongoose");
const cors=require('cors');
const app = express();
mongoose.connect("mongodb+srv://ashik123:7872145792@cluster0.iptlfq6.mongodb.net/project?retryWrites=true&w=majority");
app.use(express.json());
app.use(cors());
const tblSchema = new mongoose.Schema({
    projectref: String,
    projectname: String,
    company:String,
    country:String
  });


app.get("/tabledata", async (req, res) => {
    let db=mongoose.model('projectdetail',tblSchema);
  let data = await db.find();
  res.send(data);
});

app.post("/insert", async (req, res) => {
    const{projectref,projectname,country,company}=req.body;
    let db=mongoose.model('projectdetail',tblSchema);
  let data = new db({projectref,projectname,country,company})
  await data.save();
  console.log(data);
  return res.json({
    msg: "Data Added Successful",
    status: true,
  });
});

app.listen( process.env.PORT|| 4000);