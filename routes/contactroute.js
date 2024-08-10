const express =require("express")
const router=express.Router();
const {
    getContact,
    getContactbyId,
    updateContact,
    createContact,
    deleteContact
}=require("../controllers/contactController");
const validToken=require("../middleware/validToken")

router.use(validToken)
router.route('/').get(getContact).post(createContact)
router.route('/:id').get(getContactbyId).delete(deleteContact).put(updateContact)




module.exports=router