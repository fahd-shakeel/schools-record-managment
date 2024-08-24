import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import "./AddSchool.css"
import { useNavigate } from 'react-router-dom';

const AddSchool = () => {
    const navigate = useNavigate();
     
    const [name, onChangeName] = useState("");
    const [address, onChangeAddress] = useState("");
    const [latitude, onChangeLatitude] = useState("")
    const [longitude, onChangeLongitude] = useState("")

    const submit = (e) => {
        const SERVER_HOST = "https://schools-record-managment.onrender.com"

        const data = {
            name, address, latitude, longitude
        }
        if (name === "" || address === "" || latitude === "" || longitude === "") {
            alert("Please Fill all the Details!")
        }
        else {
            axios.post(`${SERVER_HOST}/addSchool`, data)
                .then((response) => {
                    // console.log(response.data)
                    if (response.data.exist=="exist") {
                        alert("Already Registered")
                    }
                    else {
                        alert("Data is successfully Inserted")
                    }
                })
                .catch((err) => console.log("Error :" + err))
        }
        
    }
    return (
        <div id='add-school'>
            <h1 id='heading'>Enter School Details</h1>
            <div id='form-layout'>
                <div>
                    <label>Name of School</label>
                    <input required type='text' placeholder='Name of School' onChange={(e) => onChangeName(e.target.value)}></input>
                </div>

                <div>
                    <label>Address</label>
                    <input required type='text' placeholder='Address' onChange={(e) => onChangeAddress(e.target.value)}></input>
                </div>

                <div>
                    <label>Longitude</label>
                    <input required type='number' placeholder='Longitude' onChange={(e) => onChangeLongitude(e.target.value)}></input>
                </div>

                <div>
                    <label>Latitude</label>
                    <input required type='number' placeholder='Latitude' onChange={(e) => onChangeLatitude(e.target.value)}></input>
                </div>
            </div>
            <div id='btn'>
                <button type='submit' onClick={()=>navigate('/')}>Back</button>
                <button type='submit' onClick={submit}>Submit</button>
            </div>

        </div>
    )
}

export default AddSchool
