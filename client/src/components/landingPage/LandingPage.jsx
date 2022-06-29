import React from "react";
import { Link } from 'react-router-dom';
import './landingpage.css';

export default function LandingPage() {
    return (
        <div className="landing">
            <h1 className="welcomeMsg">Bienvenidos a mi PI de Food</h1>
            <Link to='/home' id="click">
                <button className="homeButton">Inicio!!</button>
            </Link>
        </div>
    )
}
