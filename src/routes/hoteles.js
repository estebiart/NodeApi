const {Router} = require('express');
const router = Router();

const mysqlConnection = require('../database');
//ROUTES
router.get('/', (req,res)=>{
        mysqlConnection.query('SELECT*FROM hotel', (err,rows,fields) =>{
          if(!err){
               res.json(rows);
            } else {
                console.log(err);
            }
        })


});
router.get('/id', (req,res)=>{
    const{ id } = req.params;
    mysqlConnection.query('SELECT*FROM hotel WHERE id=?', (err,rows,fields) =>{
      if(!err){
           res.json(rows);
        } else {
            console.log(err);
        }
    })


});
module.exports=router;