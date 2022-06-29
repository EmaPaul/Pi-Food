const axios=require('axios');
const {Recipe,Diet}=require('../db.js');
// const{API_KEY}=process.env;
// const{API_KEY_1}=process.env;
// // const{API_KEY_2}=process.env;// esperar 24 horas para que funcione!!
// const{API_KEY_3}=process.env;// esperar 24 horas!!
// const {API_KEY_4}=process.env;
// const {API_KEY_5}=process.env;
const {API_KEY_6}=process.env;
// const {API_KEY_7}=process.env;

/* se hiso la peticion de la informacion */

async function getApiInfo(){
    //const apiUrl=await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`)
    const apiUrl =  await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY_6}&addRecipeInformation=true&number=100`);
    const apiInfo = await apiUrl.data.results.map(e => {
        return {
            id: e.id,
            image: e.image,
            name: e.title,
            dietTypes: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
            dishTypes: e.dishTypes,
            steps: e.analyzedInstructions[0]?.steps.map(e => {
                return {
                    number: e.number,
                    step: e.step
                }
            })
        }
    })
    
    return apiInfo;
}

/*solicitando toda la informacion y incluyendo el modelo diet*/
async function getDbInfo(){
    return await Recipe.findAll({
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

/*solicitando la info por id*/
async function getApiById(id){
    return await axios.get (`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY_6}`)
}

/*solicitando toda la info por id*/
async function getDbById(id) {
    return await Recipe.findByPk(id, {
        include: {
            model: Diet,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    });
}

/*uniendo toda la info de la peticion de la api*/
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const totalInfo = apiInfo.concat(dbInfo)
    
    return totalInfo;
}


module.exports = {
    getAllRecipes,
    getApiById,
    getDbById,
}