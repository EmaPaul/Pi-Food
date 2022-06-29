import axios from 'axios';
import { GET_RECIPES, GET_RECIPE_DETAILS, DIET_TYPE_FILTER, ALPHABETICAL_SORT, SCORE_SORT, SEARCH_RECIPE, GET_DIET_TYPES, FILTER_CREATED} from './types';

export function getRecipes() {
    return async function(dispatch) {

    try{
        var response= await axios.get(`http://localhost:3001/recipes`);
        return dispatch({
            type: GET_RECIPES, 
            payload: response.data
        })
    }catch(err){
        console.log(err)
    }   

}};

export function getRecipesByName(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`http://localhost:3001/recipes?name=${payload}`);
            return dispatch({
                type: SEARCH_RECIPE, 
                payload: response.data
            })
        } catch {
            return alert ('Recipe Not Found')
        }
    }
}

export function getDietTypes() {
    return async function(dispatch) {
        try{
            var response = await axios.get(`http://localhost:3001/diets`);
            return dispatch({
                type: GET_DIET_TYPES, 
                payload: response.data.map(d => d.name)
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export function addRecipe(payload) {
    return async function(dispatch) {
        try {
            var response = await axios.post(`http://localhost:3001/recipe`, payload);
            return response;
        } catch (error) {
            console.log(error)
        }
    }
}


export function getRecipesDelete(id){
    return async function(dispatch){
        try{
            var response = await axios.delete(`http://localhost:3001/recipes/${id}`);
            return response;
        }catch (error) {
            console.log(error)
        }
    }
}


export function getRecipeDetails(id) {
    return async function(dispatch) {
        try {
            var response = await axios.get(`http://localhost:3001/recipes/${id}`);
            return dispatch({
                type: GET_RECIPE_DETAILS, 
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

export function dietTypeFilter(payload) {
    return {
        type: DIET_TYPE_FILTER,
        payload:payload
    }
};


export function aplhabeticalSort(payload) {
    return {
        type: ALPHABETICAL_SORT,
        payload:payload
    }
};

export function scoreHealthSort(payload) {
    return {
        type: SCORE_SORT,
        payload:payload
    }
}

export function filterbyCreated(payload){
    return{
        type:FILTER_CREATED,
        payload:payload
    }
}