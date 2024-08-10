const asyncHander=require("express-async-handler")
const contact=require("../models/contactModel")
//desc get all contact
//route GET /api/contacts
//access private
const getContact=asyncHander(async (req,res)=>{
    const contacts= await contact.find({userid: req.loginUser.id});
    res.status(200).json(contacts)
})

//desc create contact
//route POST /api/contacts
//access private
const createContact=asyncHander(async (req,res)=>{
    console.log(req.body);
    const{name,email,phone}=req.body
    if(!name || !email|| !phone){
        res.status(400)
        throw new console.error("fill all field");
    }
    const contacts=await contact.create({
        name,
        email,
        phone,
        userid: req.loginUser.id
    })
    res.status(201).json(contacts)
})

//desc get contact by id
//route GET /api/contacts/:id
//access private
const getContactbyId=asyncHander(async (req,res)=>{
    const contacts= await contact.findById(req.params.id);
    if(!contacts){
        res.status(404)
        throw new Error("not found")
    }
    res.status(200).json(contacts)
})


//desc update contact 
//route PUT /api/contacts/:id
//access private
const updateContact=asyncHander(async (req,res)=>{
    const contacts= await contact.findById(req.params.id);
    if(!contacts){
        res.status(404)
        throw new Error("not found")
    }
    const updateContact= await contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    )
    res.status(200).json(updateContact)
})

//desc delete contact
//route DELETE /api/contacts/:id
//access private
const deleteContact = asyncHander(async (req, res) => {
    const contacts = await contact.findByIdAndDelete(req.params.id);
    if (!contacts) {
        res.status(404);
        throw new Error("Contact not found");
    }

   // await contact.remove();
    res.status(200).json(contacts);
});
module.exports={getContact,getContactbyId,updateContact,createContact,deleteContact}