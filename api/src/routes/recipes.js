const {Router}=require('express');
const router=Router();
const {getApiById,getDbById,getAllRecipes}=require('../controlApp/getInfo.js');
const {Recipe}=require('../db.js');



router.get('/',async function(req, res){
    const {name}=req.query;
    let allRecipes = await getAllRecipes()    
        
    if (name) {
        let recipeByName = await allRecipes.filter(e => e.name.toLowerCase().includes(name.toString().toLowerCase()));
           
         if (recipeByName.length) {
            let recipes1 = recipeByName.map(e => {
                return {
                    id: e.id,
                    image: e.image,
                    name: e.name,
                    dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
                }
            })
            res.status(200).send(recipes1); 
        }else{
            res.status(404).send('receta no existente')
        }  
    }else {
        let recipes2 = allRecipes.map(e => {
            return {
                id: e.id,  
                image: e.image,
                name: e.name,
                healthScore: e.healthScore,
                dietTypes: e.dietTypes ? e.dietTypes : e.diets.map(e => e.name),
            }
        })
        res.status(200).send(recipes2);
    }
})



router.get('/:id', async function (req,res){
    const {id}=req.params;
    try{
        if(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(id)){
            let dbRecipesId=await getDbById(id);
            res.status(200).send(dbRecipesId);
        }else{
            let apiRecipesId=await getApiById(id);
            if(apiRecipesId.data.id){
                let recipeDetails={
                    image: apiRecipesId.data.image,
                    name: apiRecipesId.data.title,
                    dishTypes: apiRecipesId.data.dishTypes,
                    dietTypes: apiRecipesId.data.diets,
                    summary: apiRecipesId.data.summary,
                    healthScore: apiRecipesId.data.healthScore,
                    steps: apiRecipesId.data.analyzedInstructions[0]?.steps.map(e => {
                    return {
                        number: e.number,
                        step: e.step
                    }
                })
            }
            res.status(200).send(recipeDetails);
        }
        
    } 
    }catch{
        res.status(404).send("id no valido")
    }


})


router.delete('/:id',async function(req, res){
    try{
        let id=req.params.id;
        await Recipe.destroy({
            where: {id:id},
        })
        res.status(200).send("receta eliminada correctamente")
    }catch(err){
        res.status(404).send("la receta no pudo ser eliminada")
    }
})



module.exports = router;