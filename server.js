const express = require('express');
const app = express();
const Student = require('./models/student.model')
const cors = require('cors')
const { Navigator } = require('node-navigator')
const navigator = new Navigator();
const database_name = "sql12727656";

app.use(cors())
app.use(express.json())

//*********connecting with database
Student.connect((err) => {
    if (err) {
        console.log("Error: " + err)
    }
    else {
        console.log("MySQL Database is connected!");
    }
})



app.post('/addSchool', (req, res) => {
    const name = req.body.name;
    const address = req.body.address;
    const latitude = req.body.latitude;
    const longitude = req.body.longitude;

    Student.query(`SELECT * FROM ${database_name} WHERE latitude like '${latitude}' AND longitude like '${longitude}';`, (err, result) => {
        if (err) {
            res.json({ "Error": err })
        }
        else {
            if (result.length > 0) {
                res.json({ "exist": "exist" })
            }
            else {
                var query_stat = `INSERT INTO ${database_name} (name, address, longitude, latitude) VALUES ('${name}', '${address}', '${longitude}', '${latitude}');`
                Student.query(query_stat, (err) => {
                    if (err) {
                        res.json("Error :" + err)
                    }
                    else {
                        res.status(200).json("Data inserted successfully!");
                    }
                })
            }
        }
    })

})

app.get('/listSchools/:lat/:log', (req, res) => {
    let lat = req.params.lat
    let log = req.params.log

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // const lat = position.latitude;
            // const log = position.longitude;
            // console.log(`My latitude is ${lat} and longitude ${log}`);

            Student.query(`SELECT * FROM ${database_name}`, (err, results) => {
                if (err) {
                    res.json({ "Error": err })
                }
                else {
                    function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
                        var R = 6371; // Radius of the earth in km
                        var dLat = deg2rad(lat2 - lat1);
                        var dLon = deg2rad(lon2 - lon1);
                        var a =
                            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
                            Math.sin(dLon / 2) * Math.sin(dLon / 2);
                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                        var d = R * c; // Distance in km
                        return d;
                    }
                    function deg2rad(deg) {
                        return deg * (Math.PI / 180)
                    }

                    for(let i = 0; i<results.length; i++) {
                        let distance = getDistanceFromLatLonInKm(parseFloat(lat), 
                        parseFloat(log),results[i].latitude,
                        results[i].longitude); 
                        //Adding distance in results
                        results[i].distance = distance;
                     }
                     
                     
                    results.sort(function (a, b) {
                        return a.distance - b.distance
                    });

                    res.status(200).json(results);

                }
            })
        })
    }
    else {
        res.json("Please enable your location");
    }
})


app.listen(3001, () => {
    console.log("Server is Listening on 3001...")
})
