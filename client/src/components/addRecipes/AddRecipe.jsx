import React from "react";
import { useState, useEffect } from 'react'
import { useDispatch, useSelector, } from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import { getDietTypes, addRecipe } from '../../actions/index'
import './addrecipe.css';


function validate(input) {
    const errors = {};
    if (!input.name) errors.name = 'Porfavor coloque el nombre';
    if(!input.image) errors.image = 'Porfavor coloque un link';
    if (!input.summary) errors.summary = 'porfavor coloque un comentario sobre su receta';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'El puntaje solo debe ser entre 1 y 100 puntos';
    if (!input.steps.length) errors.steps = 'Porfavor coloque los pasos para su receta';
    if (!input.dietTypes.length) errors.dietTypes ='seleccione tipos de dietas';
    return errors;
};


export default function AddRecipe() {
    const dispatch = useDispatch();
    const dietTypes = useSelector(state => state.dietTypes);
    const history = useHistory();
    const [errors, setErrors] = useState({})
    
    const [input, setInput] = useState({
        name: ''  ,
        image:'',
        summary: '',
        healthScore: '',
        steps: '',
        dietTypes: []
    })
    

    useEffect(() => {
        dispatch(getDietTypes());
    }, [dispatch]);

    function handleChange(e) {
        e.preventDefault();
        setInput((prevInput) => {  
            const newInput = {
                ...prevInput,
                [e.target.name]: e.target.value
            }
            const validations = validate(newInput);
            setErrors(validations)
            return newInput
        });

    };
    
    function handleCheckBox(e) {
       
        let newArray = input.dietTypes;
        let find = newArray.indexOf(e.target.value);
        
        if (find >= 0) {
            newArray.splice(find, 1)
        } else {
            newArray.push(e.target.value)
        }
        
        setInput({
            ...input,
            dietTypes: newArray
        });
        const validations = validate(input);
        setErrors(validations)
        
    }
    
    function handleSubmit(e) {
         e.preventDefault();

         if (Object.values(errors).length > 0) {
             alert("Porfavor complete la informacion requerida");
         } else if (
            input.name === '' && 
            input.image === '' &&
            input.summary === '' && 
            input.healthScore === '' &&
            input.steps === '' &&
            !input.dietTypes.length) {
            alert("complete el formulario");}
        else {
            dispatch(addRecipe(input));
            alert('Nueva receta creada!!')
            setInput({
                name: "",
                image: "",
                summary: '',
                healthScore: '',
                steps: [],
                dietTypes: []
            });
            history.push('/home')
        }
    };


    
    return (
        <div className="addRecipe">
            <h1 className="msg">Crea tu receta!!</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="form">
                    <div className="prettierForm">
                        <div className="nameInput">
                            <label className="msgs">Name:</label>
                            <input className="inputs" name="name" type="text" value={input.name} onChange={e => handleChange(e)}/>
                            {errors.name && (
                                <span className="errors">{errors.name}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Image:</label>
                            <input className="inputs" name="image" type="text" value={input.image} onChange={e => handleChange(e)}/>
                            {errors.image && (
                                <span className="errors">{errors.image}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Summary:</label>
                            <textarea name="summary" type="text" rows="4" cols="30" value={input.summary} onChange={e => handleChange(e)}/>
                            {errors.summary && (
                                <span className="errors">{errors.summary}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Health Score:</label>
                            <input name="healthScore" type="number" value={input.healthScore} onChange={e => handleChange(e)}/>
                            {errors.healthScore && (
                                <span className="errors">{errors.healthScore}</span>
                            )}
                        </div>
                        <div className="nameInput">
                            <label className="msgs">Steps:</label>
                            <textarea name="steps" type="text" rows="4" cols="40" value={input.steps} onChange={e => handleChange(e)}/>
                            {errors.steps && (
                                <span className="errors">{errors.steps}</span>
                            )}
                        </div>
                    </div>
        
                    <div className="checkSelect">
                        <label className="msgs">Diet Types:</label>
                        {dietTypes.map(d =>{
                            return (
                                <div key={d} className="checks">
                                    <label className="dietTypes">{d}</label>
                                    <input className="checks" type="checkbox" name={d} value={d} selected={input.dietTypes.includes(d)} onChange={e => handleCheckBox(e)}/>
                                </div>
                            )
                        })}
                        {errors.dietTypes && (
                            <span className="errors">{errors.dietTypes}</span>
                        )}
                    </div>
                </div>
                <button className="submitButton" type="submit">Agregar Receta</button>
                <Link to="/home"><button className="goBackButton">Regresar 🔁</button></Link>
            </form>
        </div>



    )

};