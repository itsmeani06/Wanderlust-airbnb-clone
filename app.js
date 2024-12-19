const express = require("express");
const app=express();

const mongoose= require("mongoose");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const path=require("path");

const methodOverride=require("method-override");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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
//new route
app.get("/listings/new", (req,res)=>{
    res.render("listings/new.ejs");
})

//show route
app.get("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
})

//Create route
app.post("/listings", async(req,res)=>{
    
    const newListing= new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
}) 

//edit Route
app.get("/listings/:id/edit",async (req,res)=>{
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
})


//Update route
app.put("/listings/:id", async(req,res)=>{
    let {id}= req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async(req, res)=>{
    let {id}= req.params;
    let deletedListing=await Listing.findById(id);
    console.log(deletedListing);
    res.redirect("/listings");
})