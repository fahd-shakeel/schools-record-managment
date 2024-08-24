import React from 'react'
import { useEffect } from 'react'
import axios from 'axios';
import { useState } from 'react';
import "./ListSchools.css"
import { useParams } from 'react-router-dom';

const SchoolCard = (props) => {
  return (
    <>
      <tbody>
        <tr>
          <td>{props.school_name}</td>
          <td>{props.address}</td>
          <td>{props.latitude}</td>
          <td>{props.longitude}</td>
        </tr>
      </tbody>
    </>
  )
}

const ListSchools = () => {
  const SERVER_HOST = "https://schools-record-managment.onrender.com"
  
  let {lat, log} = useParams();
  
  let [school, onChangeSchool] = useState([]);
  const setSchool = (e) => onChangeSchool(e.target.value)

  useEffect(() => {
    axios.get(`${SERVER_HOST}/listSchools/${lat}/${log}`)
      .then((response) => onChangeSchool(response.data))
      .catch((err) => console.log("Error :" + err))
  }, [])

  const ListSchoolLayout = () => {
    return school.map((ele) => {
      return <SchoolCard school_name={ele.name} address={ele.address} latitude={ele.latitude} longitude={ele.longitude} key={ele.id} />
      
    })
  }

  return (
    <>
      <div id="history">
        <h1 id='heading'>Schools List</h1>
        <a href='/'><button >Go Back</button></a>
        <p>This is a sorted list (nearest to far)</p>
      </div>

      <div id="schools-list">
        <table>
          <thead>
            <tr>
              <th>School Name</th>
              <th>Address</th>
              <th>Latitude</th>
              <th>Longitude</th>
            </tr>
          </thead>
          {ListSchoolLayout()}
        </table>
      </div>
    </>
  )
}

export default ListSchools