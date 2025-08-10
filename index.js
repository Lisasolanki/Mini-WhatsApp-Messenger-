const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
const Chat=require("./models/chat.js");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//Index route
app.get("/chats",async(req,res)=>{
    let chats=await Chat.find();
    console.log(chats);
    res.render("index.ejs",{chats});
})

//New Route
// Show form to create new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs");
});

// Handle form submission to create new chat
app.post("/chats", async (req, res) => {
    const { from, to, msg } = req.body; // get data from form
    let newChat = new Chat({
        from,
        to,
        msg,
        created_at: new Date()
    });
    try {
        await newChat.save();
        console.log("Chat was saved");
        res.redirect("/chats");
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving chat");
    }
});

//edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id}=req.params;
    let chat=await Chat.findById(id);
    res.render("edit.ejs",{chat})
})

//update route
app.put("/chats/:id",async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    console.log(newMsg);
    let updatedChat=await Chat.findByIdAndUpdate(
        id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    console.log(updatedChat);
    res.redirect("/chats");
})

//delete route
app.delete("/chats/:id", async(req,res)=>{
    let {id}=req.params;
    let deletedchat=await Chat.findByIdAndDelete(id);
    console.log(deletedchat);
    res.redirect("/chats");

});



app.get("/",(req,res)=>{
    res.send("root is working");
})
app.listen(8080,()=>{
    console.log("server is listening on port 8080");
})