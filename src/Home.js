import React from 'react'
import "./Home.css"
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
    let lat;
    let log;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            lat = position.coords.latitude;
            log = position.coords.longitude;
        })
    }

    return (
        <div id='home'>
            <h1 id='heading'>School Management System</h1>
            <div id='btn-section'>
                <button type='button' onClick={() => navigate(`/listSchools/${lat}/${log}`)}>List of Schools</button>
                <button type='button' onClick={() => navigate('/addSchool')}>Add School</button>
            </div>
        </div>
    )
}

export default Home