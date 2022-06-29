import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import LandingPage from './components/landingPage/LandingPage.jsx';
import AddRecipe from './components/addRecipes/AddRecipe.jsx';
import RecipeDetails from './components/recipeDetails/RecipeDetails.jsx';

function App() {
  return (
    <BrowserRouter>
    <div className="App">    
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path="/home" exact component={HomePage}/>
        <Route path="/recipe" exact component={AddRecipe}/>
        <Route path="/home/:id" component={RecipeDetails}/>   
      </Switch>    
    </div>
    </BrowserRouter>
  );
}

export default App;
