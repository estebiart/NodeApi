const {Router} = require('express');
const router = Router();

//ROUTES
router.get('/', (req,res)=>{
    const data ={
        "name": "prueba"
    };
    res.json(data);
});

module.exports=router;