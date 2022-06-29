const {Router}=require('express');
const router=Router();
const { Recipe, Diet } = require('../db.js');

router.post('/', async (req, res, next) => {
    try {
        const { name, summary, image ,healthScore, steps, dietTypes } = req.body

        const newRecipe = await Recipe.create({
            name,
            image,
            summary,
            healthScore,
            steps,
            dietTypes
        })
        for(let i=0;i<dietTypes.length;i++){
            let dietTypesRecipeDb = await Diet.findAll({
                where: {name: dietTypes[i].toLowerCase()}
            })
            newRecipe.addDiet(dietTypesRecipeDb)
        }
        
        res.status(200).send(newRecipe)  
    } catch (error) {
        next(error)
    };
});



module.exports = router;