import React from 'react';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipeDetails, getRecipesDelete} from '../../actions';
import { Link, useHistory} from 'react-router-dom'
import "./recipedetails.css";

export default function RecipeDetails(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;
    const history =useHistory();

    useEffect(() => {
        dispatch(getRecipeDetails(id))
    }, [dispatch, id]);
    
    function handleDelete(e){
        e.preventDefault();
        dispatch(getRecipesDelete(id));
        history.push('/home');
        alert("Receta eliminada con exito!!")
    }

    const recipeDetails = useSelector(state => state.recipeDetails);
    
    return (
        
        <div className="details" key={id}>            
                  
            <div className="divimg">
                <img className="detailImg" 
                src={recipeDetails.image} alt="Pic not found"/>
            </div>

            <h1 className="texts">{recipeDetails.name}</h1>

            {recipeDetails.dishTypes ?
            <div className="ddsh">
                <h2 className="texts">Dish Type: </h2>
                {recipeDetails.dishTypes?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                })}
            </div> :
            <br />
            }

            <div className="ddsh">
                <h2 className="texts">Diet Type: </h2> 
                {recipeDetails.dietTypes ? recipeDetails.dietTypes.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e}>{e}</h2>
                    )
                }) :
                recipeDetails.diets?.map(e => {
                    return(
                        <h2 className="dishesanddiets" key={e.name}>{e.name}</h2>
                    )
                })}
            </div>

            <div className="ddsh">
                <h3 className="texts">Summary: </h3>
                <p className="summary">{recipeDetails.summary?.replace(/<[^>]*>/g, '')}</p>
            </div>
            
            <div className="ddsh">
                <h3 className="scores">HealthScore: {recipeDetails.healthScore}</h3>
            </div>   

            <div className="ddsh">
                <h3 className="texts">Steps: </h3>
                <ul className="steps">{Array.isArray(recipeDetails.steps) ? recipeDetails.steps.map(e => {
                    return(
                        <li key={e.number}>{e.step}</li>
                        )
                }) :
                <li>{recipeDetails.steps}</li>
                }</ul>
            </div> 

            <Link to="/home">
                <button className="backButton">Regresar🔁</button>
                {
                    id.includes('-')?<button className="backButton" onClick={handleDelete}>Delete ❌</button>: <label></label>
                }
            </Link>
            <Link to="//home/mod/:id">
                {
                    id.includes('-')?<button className="backButton" >EDITAR 🔰</button>: <label></label>
                }
            </Link>

        </div>

    )      
        
}