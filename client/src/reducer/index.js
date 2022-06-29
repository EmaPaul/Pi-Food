import { 
  GET_RECIPES, 
  ADD_RECIPE, 
  DIET_TYPE_FILTER, 
  ALPHABETICAL_SORT, 
  SCORE_SORT, 
  SEARCH_RECIPE, 
  GET_DIET_TYPES,
  GET_RECIPE_DETAILS,
  FILTER_CREATED,
  DELETE_RECIPE,
} from '../actions/types'


const initialState = {
  recipes: [],
  allRecipes: [],
  dietTypes: [],
  recipeDetails: [],
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_RECIPES:
          return {
            ...state,
            recipes: action.payload,
            allRecipes: action.payload
          };

        case DIET_TYPE_FILTER:

        const allrecipes=state.allRecipes;
        const filterRecipesDiet= action.payload==="ALL"? allrecipes: allrecipes.filter(r=>r.dietTypes.find(diets=>diets.toLowerCase()===action.payload.toLowerCase()))
     
        return{
          ...state,
          recipes:filterRecipesDiet
        }

        case FILTER_CREATED:
          const allrecipes2 = state.allRecipes;
          const filterCreate = action.payload ==="creado"? allrecipes2.filter(el=>el.id.length>10):allrecipes2.filter(el=>!el.id.length>10)

          return{
            ...state,
            recipes: action.payload==="TODOS"? allrecipes2: filterCreate
          }
          
        case ALPHABETICAL_SORT:   
          let sortedRecipes = [...state.recipes]       
          sortedRecipes = action.payload === 'atoz' ?
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() > b.name.toLowerCase()){
              return 1;
            } 
            if (a.name.toLowerCase() < b.name.toLowerCase()){
              return -1;
            } 
            return 0;
          }) :
          state.recipes.sort(function(a, b) {
            if (a.name.toLowerCase() < b.name.toLowerCase()){
              return 1;
            } 
            if (a.name.toLowerCase() > b.name.toLowerCase()){
              return -1;
            } 
            return 0;
          });          
          return {
            ...state,
            recipes: sortedRecipes
          };

        case SCORE_SORT:
          let sortedRecipesByScore = [...state.recipes] 
          sortedRecipesByScore=action.payload === 'max'? state.recipes.sort((a,b)=>{
              if(a.healthScore < b.healthScore){
                return 1;
              }
              if(a.healthScore > b.healthScore){
                return -1
              }
              return 0;
          }):
            state.recipes.sort((a,b)=>{
              if(a.healthScore < b.healthScore){
                return -1;
              }
              if(a.healthScore > b.healthScore){
                return 1
              }
              return 0;
            })
          return {
            ...state,
            recipes: sortedRecipesByScore
          };

        case SEARCH_RECIPE:
          return {
            ...state,
            recipes: action.payload,
            allRecipes:action.payload
          };
            
        case GET_RECIPE_DETAILS:
          return {
            ...state,
            recipeDetails: action.payload,
          };

        case ADD_RECIPE:
          return {
            ...state,
          }

        case GET_DIET_TYPES:
          return {
            ...state,
            dietTypes: action.payload
          }
        
        case DELETE_RECIPE:
          return{
            ...state,
          }
      
        default:
          return state;
    }
  }

  /*presentado el dia 23/06/2021 estado del proyecto : APROBADO!!*/