const express = require("express");
const app=express();

const mongoose= require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const path=require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));


const Listing= require("./models/listing.js");
main().then(()=>{
    console.log("Connected to DB");
}).catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL)
};

// app.get("/testListing",async (req,res)=>{
//     let sampleimage=new Listing({
//         title: "My villa",
//         description: "By the beach",
//         price:12000,
//         location:"Bangalore,Karnataka",
//         country:"India"
//     });
//     await sampleimage.save();
//     console.log("sample was saved");
//     res.send("Successfull testing");
// })
app.get("/", (req,res)=>{
    res.send("Hi, i am root");
});

//Index page route
app.get("/listings",async (req,res)=>{
   const allListings =await Listing.find({});
   res.render("listings/index.ejs",{allListings});
});
app.listen(8080,()=>{
    console.log("App is listening to port 8080");
})