import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRecipesByName } from '../../actions/index.js';
import './searchbar.css';


export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    function handleChange(e) {    
        e.preventDefault();    
        setInput(e.target.value);
    };



    function handleSubmit(e) {
       
        try {
            dispatch(getRecipesByName(input));
            
        } catch (error) {            
            return error;
        }

        setInput('')
        
    };

   

    return (
        <div className="search">
            <input type="text" className="searchInput" placeholder="Search recipe by name" value={input} onChange={e => handleChange(e)}/>
            <button className="searchButton" type="submit" onClick={handleSubmit}>Search</button>
        </div>
    )

};