const mongoose=require("mongoose");
const Chat=require("./models/chat.js");

main()
.then(()=>{
    console.log("connection successful");
})
.catch((err) => console.log(err));
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats=[
    {
    from:"Neha",
    to:"Priya",
    msg:"Send me your practice sheet",
    created_at:new Date(),
    },
    {
    from:"Rohit",
    to:"Mohit",
    msg:"Call me back",
    created_at:new Date(),
    },
    {
    from:"Amit",
    to:"Sumit",
    msg:"All the best",
    created_at:new Date(),
    },
    
]
Chat.insertMany(allchats);