const{Router}=require('express');
const router=Router();
const {Diet}=require('../db.js');
const {dietTypesDb}=require('../controlApp/TypesDiet.js');

router.get('/',async function(req, res){
    dietTypesDb.forEach(el=>{
        Diet.findOrCreate({
            where: {
                name:el
            }
        })
    })
    const dietsType=await Diet.findAll();
    res.send(dietsType)
})

module.exports = router;




