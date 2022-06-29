import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes, dietTypeFilter, aplhabeticalSort, scoreHealthSort, filterbyCreated} from '../../actions/index.js';
import Recipe from '../recipeCard/Recipe';
import { Link } from 'react-router-dom'
import Paged from '../Paginado/Paged';
import SearchBar from '../searchBar/SearchBar.jsx';
import './home.css'


let prevId = 1;

export default function Home() {
    
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const [order,setOrder] = useState('')
 
    
    const [page, setPage] = useState(1);
    const [recipesPage, setRecipesPage] = useState(9);
    
    const quantityRecipesPage = page * recipesPage;
    const firstRecipePage = quantityRecipesPage - recipesPage;
    const showRecipesPage = allRecipes.slice(firstRecipePage, quantityRecipesPage);

    const paged = function(pageNumber) {
        setPage(pageNumber)
    };


    useEffect(() => {
        dispatch(getRecipes())
    }, [dispatch]);


    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes());
        setPage(1);
    }

    function handleDietTypeFilter(e) {
        e.preventDefault();
        dispatch(dietTypeFilter(e.target.value));
        setPage(1);
    }

    function handlecreateFilter(e){
        e.preventDefault();
        dispatch(filterbyCreated(e.target.value));
        setPage(1);
    }


    function handleAlphabeticalSort(e) {
        e.preventDefault();                
        dispatch(aplhabeticalSort(e.target.value))
        setPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }
    

    function handleScoreSort(e) {
        e.preventDefault();                
        dispatch(scoreHealthSort(e.target.value))
        setPage(1);
        setOrder(`Ordenado ${e.target.value}`);
        
    }


    return(
        <div className="home">
            <h1 className="initialMsg">Busquemos una receta saludable!!</h1>
            <div>
                <button className="refreshButton" onClick={handleClick}>Recarga 🔁</button>
                <Link to="/recipe">
                    <button className="addButton">Agregar ➕ recetas!!</button>
                </Link>

            </div>
            <div className="select">
                <label className="filters">Orden Alfabetico:</label>
                <select className="select"  name="alphabetical" onChange={e => handleAlphabeticalSort(e)}>
                    <option disabled selected>Alphabetical</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <label className="filters">HS:</label>
                <select className="select" name="numerical" onChange={e => handleScoreSort(e)}>
                    <option disabled selected>HealthScore</option>
                    <option value="min">HealthScore MIN</option>
                    <option value="max">HealthScore MAX</option>
                </select>
                <label className="filters">Tipo de Dieta:</label>
                <select className="select" name="diets" onChange={e => handleDietTypeFilter(e)}  >
                    <option disabled selected>Select...</option>
                    <option value="ALL">Todas las dietas</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Ketogenic</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto vegetarian">Lacto-Vegetarian</option>
                    <option value="ovo vegetarian">Ovo-Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescatarian">Pescatarian</option>
                    <option value="paleolithic">Paleolithic</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole 30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
                <label className="filters">Filtro Creados:</label>
                <select className="select" name="created" onChange={e=>handlecreateFilter(e)}>
                <option disabled selected>Select...</option>
                <option value="TODOS">por defecto</option>
                <option value="creado">creados</option>
                </select>
               
            </div>

            <Paged recipesPage={recipesPage} allRecipes={allRecipes.length} paged={paged}/>
           
            <SearchBar/>

            <div className="allrecipes">
            {
                showRecipesPage?.map(e => {
                    return (
                        <div className="eachRecipe" key={prevId++}>
                            
                            <Link className="linkRecetas" to={`home/${e.id}`}>
                                <Recipe
                                    image={e.image}
                                    name={e.name}                      
                                    dietTypes={e.dietTypes}
                                    />
                                    
                            </Link>
                            
                        </div>
                    )
                })
               
            }  
            </div>
            
           
        </div>

            




    )
}